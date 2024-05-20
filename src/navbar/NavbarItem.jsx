import { Link } from "react-router-dom";

const NavbarItem = ({ value, path }) => {
  return (
    <div>
      <Link to={path}>{value}</Link>
    </div>
  );
};

export default NavbarItem;
