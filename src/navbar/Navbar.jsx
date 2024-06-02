import { Link } from "react-router-dom";
import NavbarItem from "./NavbarItem";
import { ReactComponent as Logo } from "../assets/library_logo.svg";
import { ReactComponent as Search_icon } from "../assets/search_icon.svg";
import "./navbar.css";
import { useState } from "react";

const Navbar = () => {
  const [collectionsWindow, setCollectionWindow] = useState(false);
  const [searchInput, setSearchInput] = useState("");

  const handleSearch = () => {
    setSearchInput("");
  };

  return (
    <nav
      onClick={e => {
        if (e.target.className === "collections_button") {
          setCollectionWindow(!collectionsWindow);
        } else {
          setCollectionWindow(false);
        }
      }}
    >
      <div className="navbar_container">
        <div className="logo_buttons_container">
          <div>
            <Link to={"/"}>
              <Logo className="logo" />
            </Link>
          </div>

          <div className="navbar_buttons">
            <div className="collections_menu_container">
              <span className="collections_button">Collections</span>
              <i className="arrow_down"></i>
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

        <div className="search_singin_container">
          <div className="searchbox_container">
            <input
              type="search"
              className="search_box"
              value={searchInput}
              onChange={e => {
                setSearchInput(e.target.value);
              }}
              placeholder="Book/Author name..."
            />
            <Search_icon
              className="search_icon"
              onClick={() => {
                handleSearch();
              }}
            />
          </div>
          <NavbarItem value="Sign In" path="/login" />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
