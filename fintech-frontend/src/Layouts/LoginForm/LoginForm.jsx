import { useContext, useEffect, useState } from "react";
import "./LoginForm.css";
import Input from "../../Components/Input/Input";
import Button from "../../Components/Button/Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import UserContext from "../../useContext/userContext";
import { toast } from "react-toastify";
function LoginForm() {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [isDisabled, setIsDisabled] = useState(false);
  useEffect(() => {
    if (user) {
      return navigate("/", { replace: true });
    }
  }, []);

  async function signIn() {
    if (credentials.username === "" || credentials.password === "") {
      return toast.error("All fields are required");
    }
    setIsDisabled(true);
    const toastId = toast("Loging In", {
      autoClose: false,
      closeOnClick: false,
    });
    try {
      const data = await axios.get("http://localhost:4000/login", {
        params: credentials,
      });
      if (data) {
        setUser(data.data);
        setIsDisabled(false);
        localStorage.setItem("userData", JSON.stringify(true));
        toast.update(toastId, {
          render: "Welcome! 😸",
          type: toast.TYPE.SUCCESS,
          autoClose: 3000,
          progressStyle: { background: "#ffc42e" },
        });
        return navigate("/", { replace: true });
      }
    } catch (error) {
      setIsDisabled(false);
      toast.dismiss(toastId);
      toast.error(error.response.data.message);
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
        isDisabled={isDisabled}
      />
      <Input
        value={credentials}
        setValue={setCredentials}
        label="Password"
        control="password"
        isDisabled={isDisabled}
        type="password"
      />
      <Button action="Login" onClick={signIn} isDisabled={isDisabled} />
    </div>
  );
}

export default LoginForm;
