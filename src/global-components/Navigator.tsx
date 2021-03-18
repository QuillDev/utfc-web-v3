import React from "react";
import { Link } from "react-router-dom";
import { useLogoutMutation, useMeQuery } from "../generated/graphql";
import { setAccessToken } from "../pages/accessToken";
import "./Navigator.css";

export const Navigator: React.FC = () => {
  const { data, loading } = useMeQuery();
  const [logOut, { client }] = useLogoutMutation();

  const logOutClient = async () => {
    await logOut();
    setAccessToken("");
    await client.resetStore();
    window.location.href = "/login";
  };
  return (
    <>
      <div className="navigationBar">
        <div className="navButton pl-1">
          <Link to="/">HOME</Link>
        </div>

        <div className="navButton">
          <Link to="/account">ACCOUNT</Link>
        </div>
        <div className="navButton navRight">
        {!loading && data && data.me ? (
            <button onClick={logOutClient}>LOG OUT</button>
        ) : (
            <Link to="/login"><p>login</p></Link>
        )}
        </div>
      </div>
    </>
  );
};
