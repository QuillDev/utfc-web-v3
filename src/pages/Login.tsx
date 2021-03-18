import React, { FormEvent, useState } from "react";
import { RouteComponentProps } from "react-router";
import { Link } from "react-router-dom";
import { MeDocument, MeQuery, useLoginMutation } from "../generated/graphql";
import { setAccessToken } from "./accessToken";
import "./Form.css";
export const Login: React.FC<RouteComponentProps> = ({ history }) => {
  //graphql state variables
  const [login, {client}] = useLoginMutation();
  //Form State variables
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const submitRegister = async (event: FormEvent) => {
    event.preventDefault();
    const response = await login({
      variables: {
        email,
        password,
      },
      update: (store, { data }) => {
        if (!data) {
          return null;
        }
        //Updates local cache of the user when we log in
        store.writeQuery<MeQuery>({
          query: MeDocument,
          data: {
            me: data.login.user,
          },
        });
      },
    }).catch((err) => setError(err.toString()));

    //if the response was good, log it
    if (response && response.data) {
      setAccessToken(response.data.login.accessToken);
      return window.location.href = "/";
    }
    //if we failed to log in, tell em how it is
    setError("Failed to log in.");
  };

  return (
    <>
      <div className="flex">
        <div className="formContainer">
          <p className="text-2xl font-bold">LOG IN</p>
          <p className="text-red-500">{error}</p>
          <form onSubmit={(event) => submitRegister(event)}>
            <div className="pixelInputContainer">
              <p className={"inputLabel"}>EMAIL</p>
              <input
                className={"inputField"}
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></input>
            </div>
            <div className="pixelInputContainer">
              <p className={"inputLabel"}>PASSWORD</p>
              <input
                className={"inputField"}
                type="password"
                value={password}
                onChange={(p) => setPassword(p.target.value)}
              ></input>
            </div>
            <button className="submitButton mt-2 mb-1" type={"submit"}>
              Log in
            </button>
            <Link to="/register">
              <p>
                Don't have an account?
                <p className="text-blue-300 inline-block pl-1">Register</p>
              </p>
            </Link>
          </form>
        </div>
      </div>
    </>
  );
};
