import { Link } from "react-router-dom";
import NavbarItem from "./NavbarItem";
import { ReactComponent as Logo } from "../assets/library_logo.svg";
import { ReactComponent as Search_icon } from "../assets/search_icon.svg";
import "./navbar.css";
import { useState, useContext, useRef } from "react";
import { SearchContext } from "../context/SearchContext";

const Navbar = () => {
  const [collectionsWindow, setCollectionWindow] = useState(false);
  const { setSearchValue } = useContext(SearchContext);
  const inputRef = useRef(null);

  // Handle search - set search value to the state
  const handleSubmit = e => {
    e.preventDefault();
    setSearchValue(inputRef.current.value);
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
          <form className="searchbox_container" onSubmit={handleSubmit}>
            <input
              type="search"
              className="search_box"
              ref={inputRef}
              placeholder="Book title..."
            />
            <button type="submit" className="search_button">
              <Search_icon className="search_icon" />
            </button>
          </form>
          <NavbarItem value="Sign In" path="/login" />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
