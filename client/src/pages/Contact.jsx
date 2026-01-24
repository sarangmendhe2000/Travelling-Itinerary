import "./Contact.css";

function Contact() {
  return (
    <div className="contact-wrapper">

      {/* TOP HALF - IMAGE */}
      <section className="contact-hero">
        <h1>Contact</h1>
        <p>We would love to hear from you</p>
      </section>

      {/* BOTTOM HALF - FORM */}
      <section className="contact-section">
        <h2>Send a message to us!</h2>

        <form className="contact-form">
          <input type="text" placeholder="Name" />
          <input type="email" placeholder="Email" />
          <input type="text" placeholder="Subject" />
          <textarea rows="3" placeholder="Message"></textarea>
          <button type="submit">Send Message</button>
        </form>
      </section>

    </div>
  );
}

export default Contact;
