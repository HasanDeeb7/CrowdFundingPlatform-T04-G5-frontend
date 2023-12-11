import { useNavigate } from "react-router-dom";
import Button from "../../Components/Button/Button";
import "./NetworkError.css";

function NetworkError({ setError }) {
  return (
    <div className="networkErrorContainer">
      <h1>Network Error</h1>
      <p>Check your internet connection and try again</p>
    </div>
  );
}

export default NetworkError;
