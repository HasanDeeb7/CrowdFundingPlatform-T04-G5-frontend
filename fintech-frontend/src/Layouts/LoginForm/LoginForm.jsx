import { useEffect, useState } from "react";
import "./LoginForm.css";
import Input from "../../Components/Input/Input";
import Button from "../../Components/Button/Button";

function LoginForm() {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  return (
    <div className="loginFormContainer">
      <h3>SignIn</h3>
      <Input value={credentials} setValue={setCredentials} label="Username" control='username' />
      <Input value={credentials} setValue={setCredentials} label="Password" control='password' />
      <Button action='Login' onClick={()=> console.log('Clicked')} />
    </div>
  );
}

export default LoginForm;
