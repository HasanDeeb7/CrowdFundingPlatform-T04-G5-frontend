import { useEffect, useState } from "react";
import "./LoginForm.css";
import Input from "../../Components/Input/Input";
import Button from "../../Components/Button/Button";
import axios from "axios";
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";
function LoginForm() {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  async function signIn() {
    try {
      const data = await axios.get("http://localhost:4000/login", {params: credentials});
      if (data) {
        console.log(data);
        return console.log(Cookies.get("access_token"));
        return <Navigate to="/" replace />;
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="loginFormContainer">
      <h3>SignIn</h3>
      <Input
        value={credentials}
        setValue={setCredentials}
        label="Username"
        control="username"
      />
      <Input
        value={credentials}
        setValue={setCredentials}
        label="Password"
        control="password"
      />
      <Button action="Login" onClick={signIn} />
    </div>
  );
}

export default LoginForm;
