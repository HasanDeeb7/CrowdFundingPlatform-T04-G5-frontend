import { useState } from "react";
import Input from "../../Components/Input/Input";
import "./SignUpFrom.css";
import Button from "../../Components/Button/Button";

function SignUpFrom() {
  const [newUser, setNewUser] = useState({
    firstName: "",
    lastName: "",
    userName: "",
    password: "",
  });
  return (
    <div className="signupContainer">
      <h3>Create an Account</h3>
      <div className="inputRow">
        <Input
          value={newUser}
          setValue={setNewUser}
          control="firstName"
          label="First Name"
        />
        <Input
          value={newUser}
          setValue={setNewUser}
          control="lastName"
          label="Last Name"
        />
      </div>
      <div className="inputRow">
        <Input
          value={newUser}
          setValue={setNewUser}
          control="userName"
          label="Username"
        />
        <Input
          value={newUser}
          setValue={setNewUser}
          control="password"
          label="Password"
        />
      </div>
      <div className="signUpBtn">
        <Button action="SignUp" />
      </div>
    </div>
  );
}

export default SignUpFrom;
