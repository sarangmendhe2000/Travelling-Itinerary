using Microsoft.AspNetCore.Identity.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using TravelItineraryAPI.Models;
using TravelItineraryAPI.Services;


namespace TravelItineraryAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly TravelItineraryDbContext _context;
        private readonly IConfiguration _configuration;
        private readonly EmailService _emailService;

        public AuthController(TravelItineraryDbContext context, IConfiguration configuration, EmailService emailService)
        {
            _context = context;
            _configuration = configuration;
            _emailService = emailService;
        }

        // REGISTER
        [HttpPost("register")]
        public IActionResult Register([FromBody] User user)
        {
            Console.WriteLine("REGISTER HIT");
            Console.WriteLine(user.FullName);
            Console.WriteLine(user.Email);

            try
            {
                var existingUser = _context.Users
                    .FirstOrDefault(u => u.Email == user.Email);

                if (existingUser != null)
                {
                    return BadRequest("Email already exists");
                }

                _context.Users.Add(user);
                _context.SaveChanges();

                return Ok("User registered successfully");
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("verify-otp")]
        public IActionResult VerifyOtp([FromBody] VerifyOtpRequest request)
        {
            var user = _context.Users
                .FirstOrDefault(u => u.Email == request.Email);

            if (user == null)
                return BadRequest("User not found");

            if (user.ResetOtp != request.Otp)
                return BadRequest("Invalid OTP");

            if (user.ResetOtpExpiry < DateTime.Now)
                return BadRequest("OTP expired");

            return Ok("OTP verified successfully");
        }


        [HttpPost("forgot-password")]
        public IActionResult ForgotPassword([FromBody] ForgotPasswordRequest request)
        {
            var user = _context.Users
                .FirstOrDefault(u => u.Email == request.Email);

            if (user == null)
            {
                return BadRequest("Email not found");
            }

            // Generate 6 digit OTP
            var otp = new Random().Next(100000, 999999).ToString();

            user.ResetOtp = otp;
            user.ResetOtpExpiry = DateTime.Now.AddMinutes(10);

            _context.SaveChanges();

            // ✅ SEND OTP TO EMAIL
            _emailService.SendEmail(
                user.Email,
                "Your Password Reset OTP",
                $"Your OTP for password reset is: {otp}. It is valid for 10 minutes."
            );

            return Ok("OTP sent to your email");
        }


        [HttpPost("reset-password")]
        public IActionResult ResetPassword([FromBody] ResetPasswordRequest request)
        {
            var user = _context.Users
                .FirstOrDefault(u => u.Email == request.Email);

            if (user == null)
                return BadRequest("User not found");

            user.PasswordHash = request.NewPassword;

            user.ResetOtp = null;
            user.ResetOtpExpiry = null;

            _context.SaveChanges();

            return Ok("Password reset successfully");
        }




        // LOGIN
        [HttpPost("login")]
        public IActionResult Login(LoginRequest request)
        {
            var user = _context.Users
                .FirstOrDefault(u => u.Email == request.Email
                                  && u.PasswordHash == request.Password);

            if (user == null)
            {
                return Unauthorized("Invalid email or password");
            }

            var token = GenerateToken(user);

            return Ok(new
            {
                token = token,
                userId = user.UserId,
                fullName = user.FullName
            });
        }

        // TOKEN GENERATION
        private string GenerateToken(User user)
        {
            var claims = new[]
            {
                new Claim(ClaimTypes.NameIdentifier, user.UserId.ToString()),
                new Claim(ClaimTypes.Email, user.Email)
            };

            var key = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(_configuration["JwtSettings:Key"])
            );

            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                issuer: _configuration["JwtSettings:Issuer"],
                audience: _configuration["JwtSettings:Audience"],
                claims: claims,
                expires: DateTime.Now.AddMinutes(
                    Convert.ToDouble(_configuration["JwtSettings:DurationInMinutes"])
                ),
                signingCredentials: creds
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }

    // DTO
    public class LoginRequest
    {
        public string Email { get; set; }
        public string Password { get; set; }
    }
    public class ForgotPasswordRequest
    {
        public string Email { get; set; }
    }
    public class VerifyOtpRequest
    {
        public string Email { get; set; }
        public string Otp { get; set; }
    }

    public class ResetPasswordRequest
    {
        public string Email { get; set; }
        public string NewPassword { get; set; }
    }

}
