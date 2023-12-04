import { useContext, useEffect, useState } from "react";
import "./LoginForm.css";
import Input from "../../Components/Input/Input";
import Button from "../../Components/Button/Button";
import axios from "axios";
import { Navigate, redirect, useNavigate } from "react-router-dom";
import UserContext from "../../useContext/userContext";
function LoginForm() {
  const navigate = useNavigate()
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [isDisabled, setIsDisabled] = useState(false)
  const { user, setUser } = useContext(UserContext);
  async function signIn() {
    setIsDisabled(true)
    try {
      const data = await axios.get("http://localhost:4000/login", {
        params: credentials,
      });
      if (data) {
        console.log(data);
        setUser(data.data);
        setIsDisabled(false)
        return navigate('/', {replace: true});
      }
    } catch (error) {
      console.log(error);
      setIsDisabled(false)
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
        isDisabled={isDisabled}
      />
      <Input
        value={credentials}
        setValue={setCredentials}
        label="Password"
        control="password"
        isDisabled={isDisabled}
      />
      <Button action="Login" onClick={signIn} isDisabled={isDisabled} />
    </div>
  );
}

export default LoginForm;
