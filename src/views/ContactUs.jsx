const ContactUs = () => {
  return (
    <div className="contactus_container">
      <h2>Contact Us</h2>
      <p>
        We're here to help you explore the vast world of knowledge available in
        our digital library. Feel free to reach out if you have any questions,
        comments, or suggestions.
      </p>
      <b>Here are some ways to get in touch:</b>
      <div className="contact_details">
        <i className="uil uil-phone-times"></i>
        <span>+381655545656</span>
        <div></div>
        <i className="uil uil-envelope"></i>
        <span>libraryexample@gmail.com</span>
      </div>
      <div className="form_container">
        <form action="https://formspree.io/f/mleypkvj" method="POST">
          <input
            type="text"
            name="first_name"
            placeholder="First name"
            required
            maxLength="30"
          />

          <input
            type="text"
            name="last_name"
            placeholder="Last name"
            required
            maxLength="30"
          />

          <input
            type="email"
            name="email"
            placeholder="email address"
            required
            maxLength="100"
          />

          <textarea
            name="message"
            placeholder="your message"
            required
            maxLength="400"
          ></textarea>

          <button type="submit" className="button_style">
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactUs;
