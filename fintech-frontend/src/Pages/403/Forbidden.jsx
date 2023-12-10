import { useNavigate } from "react-router-dom";
import Button from "../../Components/Button/Button";
import "./Forbidden.css";

function Forbidden() {
  const navigate = useNavigate();
  return (
    <div className="forbiddenContainer">
      <h1>403</h1>
      <h2>Access Denied!</h2>
      <p>Sorry, You don't have permission to acces this page!</p>
      <Button
        action="Take me back"
        onClick={() => navigate("/", { replace: true })}
      />
    </div>
  );
}

export default Forbidden;
