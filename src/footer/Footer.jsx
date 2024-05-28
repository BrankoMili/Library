import { Link } from "react-router-dom";
import "./footer.css";

const Footer = () => {
  return (
    <footer className="footer_container">
      <p>© 2024 Digital Library</p>
      <Link to={"/privacypolicy"}>Privacy Policy</Link>
      <Link to={"/termsofservice"}>Terms Of Service</Link>
    </footer>
  );
};

export default Footer;
