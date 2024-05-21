import { Link } from "react-router-dom";
import NavbarItem from "./NavbarItem";
import { ReactComponent as Logo } from "../assets/library-logo.svg";
import "./navbar.css";
import { useState } from "react";

const Navbar = () => {
  const [collectionsWindow, setCollectionWindow] = useState(false);

  return (
    <div className="navbar_container">
      <div className="logo_container">
        <Link to={"/"}>
          <Logo className="logo" />
        </Link>
      </div>

      <div className="navbar_buttons">
        <div
          className="collections_menu_container"
          onClick={() => setCollectionWindow(!collectionsWindow)}
        >
          <span className="collections_button">Collections</span>
          <i class="arrow_down"></i>
          {/* Collections menu */}
          {collectionsWindow && (
            <div className="collections_menu">
              <p>Ebooks</p>
              <Link to={"/kids"}>Kids Collection</Link>
              <Link to={"/teens"}>Teens Collection</Link>
            </div>
          )}
        </div>
        <NavbarItem value="Kids" path="/kids" />
        <NavbarItem value="Teens" path="/teens" />
        <NavbarItem value="Contact Us" path="/contactus" />
      </div>
    </div>
  );
};

export default Navbar;
