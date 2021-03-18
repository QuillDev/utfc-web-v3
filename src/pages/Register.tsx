import React, { FormEvent, useState } from "react";
import { RouteComponentProps } from "react-router";
import { Link } from "react-router-dom";
import { useRegisterMutation } from "../generated/graphql";
import "./Form.css";

export const Register: React.FC<RouteComponentProps> = ({ history }) => {
  //graphql state variables
  const [register] = useRegisterMutation();
  //Form State variables
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const submitRegister = async (event: FormEvent) => {
    event.preventDefault();
    //if the passwords aren't the same, produce an error message
    if (!checkPasswordsIdentical()) {
      setError("Passwords are not the same!");
      return;
    }

    //TODO: Fix being able to create multiples of users with the same email... oh god.
    const response = await register({
      variables: {
        email,
        password,
      },
    });

    //if register is false, log that we failed to create the user.
    if (!response.data?.register) {
      setError("Failed to create user!");
    }

    //clear all of our fields
    setPassword("");
    setEmail("");
    setConfirmPassword("");

    history.push("/"); //redirect us to the home page
  };

  const checkPasswordsIdentical = () => {
    if (password.length === 0 || confirmPassword.length === 0) {
      return false;
    }
    return password === confirmPassword;
  };
  return (
    <>
      <div className="flex">
        <div className="formContainer">
        <p className="text-2xl font-bold">REGISTER</p>
          <form onSubmit={(event) => submitRegister(event)}>
            <div className="pixelInputContainer">
              <p className="inputLabel">EMAIL</p>
              <input
                className="inputField"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></input>
            </div>
            <div className="pixelInputContainer">
              <p className="inputLabel">PASSWORD</p>
              <input
                className="inputField"
                type="password"
                value={password}
                onChange={(p) => setPassword(p.target.value)}
              ></input>
            </div>
            <div className="pixelInputContainer">
              <p className="inputLabel">CONFIRM {checkPasswordsIdentical() ? "✔" : "X"}</p>
              <input
                type="password"
                className="inputField"
                value={confirmPassword}
                onChange={(p) => setConfirmPassword(p.target.value)}
              ></input>
            </div>
            <button className="submitButton mt-2 mb-1" type={"submit"}>REGISTER</button>
            <Link to="/login">
              <p>
                Already have an account?
                <p className="text-blue-300 inline-block pl-1">Log in</p>
              </p>
            </Link>
          </form>
        </div>
      </div>
    </>
  );
};
