import { useState } from "react";
import Input from "../../Components/Input/Input";
import "./SignUpFrom.css";
import Button from "../../Components/Button/Button";
import { CreateUser } from "../../axios/user";
import { toast } from "react-toastify";

function SignUpFrom({ setLogin }) {
  const [newUser, setNewUser] = useState({
    firstName: "",
    lastName: "",
    userName: "",
    password: "",
    role: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  async function signUp() {
    const toastId = toast("Creating account", {
      autoClose: false,
      closeButton: false,
    });
    try {
      setIsLoading(true);
      console.log(newUser)
      const data = await CreateUser(newUser);
      if (data) {
        console.log(data);
        setLogin(true);
        setIsLoading(false);
        toast.update(toastId, {
          render: "Welcome, You Can Log In Now",
          type: toast.TYPE.SUCCESS,
          autoClose: 3000,
          progressStyle: { background: "#ffc42e" },
        });
      } else {
        setIsLoading(false);
        toast.update(toastId, {
          render: "Failed to Create User",
          type: toast.TYPE.ERROR,
          autoClose: 3000,
          progressStyle: { background: "red" },
        });
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      toast.update(toastId, {
        render: "Failed to Create User",
        type: toast.TYPE.ERROR,
        autoClose: 3000,
      });
    }
  }
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
      <div className="signUpRadioContainer">
        <span className="signUpRadioWrapper">
          <label htmlFor="roleRadio">Donor</label>
          <input
            type="radio"
            name="roleRadio"
            id="roleRadio"
            value="creator"
            checked={newUser.role === "creator"}
            onChange={() => setNewUser({ ...newUser, role: "creator" })}
          />
          <span className="customRadio"></span>
        </span>
        <span className="signUpRadioWrapper">
          <label htmlFor="creatorRadio">Creator</label>
          <input
            type="radio"
            name="roleRadio"
            id="creatorRadio"
            value="donor"
            checked={newUser.role === "donor"}
            onChange={() => setNewUser({ ...newUser, role: "donor" })}
          />
          <span className="customRadio"></span>
        </span>
      </div>
      <div className="signUpBtn">
        <Button
          action="SignUp"
          onClick={() => signUp()}
          isDisabled={isLoading}
        />
      </div>
    </div>
  );
}

export default SignUpFrom;
