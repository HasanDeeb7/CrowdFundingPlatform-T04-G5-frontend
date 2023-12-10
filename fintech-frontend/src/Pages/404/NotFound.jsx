import { useNavigate } from "react-router-dom";
import Button from "../../Components/Button/Button";
import "./NotFound.css";

function NotFound() {
  const navigate = useNavigate();
  return (
    <div className="notFoundContainer">
      <h1>404</h1>
      <h2>Not Found!</h2>
      <p>Sorry, the page you are looking for is not found!</p>
      <Button
        action="Take me back"
        onClick={() => navigate("/", { replace: true })}
      />
    </div>
  );
}

export default NotFound;
