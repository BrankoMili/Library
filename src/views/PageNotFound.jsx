import pageNotFoundImage from "../assets/pagenotfound.jpg";
import { useNavigate } from "react-router-dom";

const PageNotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="pagenotfound_container">
      <h3>Page Not Found</h3>
      <img src={pageNotFoundImage} alt="page_not_found_image" />
      <button
        className="button_style"
        onClick={() => {
          navigate("/");
        }}
      >
        Go To Home Page
      </button>
      <a href="https://www.vecteezy.com/free-vector/404-page">
        404 Page Vectors by Vecteezy
      </a>
    </div>
  );
};

export default PageNotFound;
