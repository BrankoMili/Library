import "./error.css";
import { ReactComponent as Refresh } from "../assets/refresh.svg";
import { useNavigate } from "react-router-dom";

const Error = ({ error }) => {
  const navigate = useNavigate();
  return (
    <div className="error_container">
      <p>Something went wrong. Please try again.</p>
      <p>{error.message}</p>

      <div onClick={() => navigate(0)}>
        <Refresh className="refresh_icon" />
      </div>
    </div>
  );
};

export default Error;
