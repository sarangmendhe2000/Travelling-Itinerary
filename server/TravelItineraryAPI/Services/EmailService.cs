using System.Net;
using System.Net.Mail;

namespace TravelItineraryAPI.Services
{
    public class EmailService
    {
        private readonly IConfiguration _configuration;

        public EmailService(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public void SendEmail(string toEmail, string subject, string body)
        {
            var smtpClient = new SmtpClient
            {
                Host = _configuration["EmailSettings:SmtpServer"],
                Port = int.Parse(_configuration["EmailSettings:Port"]),
                EnableSsl = true,
                Credentials = new NetworkCredential(
                    _configuration["EmailSettings:Username"],
                    _configuration["EmailSettings:Password"]
                )
            };

            var message = new MailMessage(
                _configuration["EmailSettings:SenderEmail"],
                toEmail,
                subject,
                body
            );

            smtpClient.Send(message);
        }
    }
}
