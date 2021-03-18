import { createHttpLink, from } from "@apollo/client";
import { TokenRefreshLink } from "apollo-link-token-refresh";
import { getAccessToken, setAccessToken, accessTokenContent } from "../pages/accessToken";
import {setContext} from "@apollo/client/link/context";
import jwt_decode from "jwt-decode";

export const CompoundLink = () => {
const authLink = setContext((_, { headers }) => {
    const accessToken = getAccessToken();
    return {
      headers: {
        ...headers,
        authorization: accessToken ? `bearer ${accessToken}` : "",
      }
    }
  });
  
  const httpLink = createHttpLink({
    uri: 'http://localhost:4000/graphql',
    credentials: "include"
  });
  
  let tokenLink = new TokenRefreshLink({
    accessTokenField: "accessToken",
    isTokenValidOrUndefined: () => {
      const token = getAccessToken();
    
      if(!token){
        return true;
      }
      try {
        const {exp} = jwt_decode<accessTokenContent>(token);
        if(Date.now() >= exp * 1000){
          return false;
        } else {
          return true;
        }
      } catch{
        return false;
      }
    },
    fetchAccessToken: () => {
      return fetch("http://localhost:4000/refresh_token", {
        credentials: "include",
        method: "POST",
      });
    },
    handleFetch: accessToken => {
      setAccessToken(accessToken);
    },
    handleError: err => {
      console.warn("Your refresh token is invalid, please retry logging in!");
      console.error(err);
    }
  });
  
  return from([
    authLink,
    tokenLink,
    httpLink,
  ]);
}
