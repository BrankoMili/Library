import { Link } from "react-router-dom";
import NavbarItem from "./NavbarItem";
import { ReactComponent as Logo } from "../assets/library-logo.svg";
import "./navbar.css";

const Navbar = () => {
  return (
    <div className="navbar_container">
      <div className="logo_container">
        <Link to={"/"}>
          <Logo className="logo" />
        </Link>
      </div>

      <div className="navbar_buttons">
        <NavbarItem value="Collections" path="/collections" />
        <NavbarItem value="Kids" path="/kids" />
        <NavbarItem value="Teens" path="/teens" />
        <NavbarItem value="Contact Us" path="/contactus" />
      </div>
    </div>
  );
};

export default Navbar;
