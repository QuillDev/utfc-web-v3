import React, { useEffect, useState } from "react";
import { setAccessToken } from "./pages/accessToken";
import Routes from "./Routes";

interface AppProps {}

export const App: React.FC<AppProps> = () => {
  const [loading, setLoading] = useState(true);

  const fetchRefreshToken = async () => {
    fetch("http://localhost:4000/refresh_token", {
      credentials: "include",
      method: "POST",
    }).then(async (res) => {
      const { accessToken } = await res.json();
      setAccessToken(accessToken);
      setLoading(false);
    });
  }
  
  useEffect(() => { fetchRefreshToken(); }, []);
  if (loading) {
    return <div>Loading...</div>;
  }
  return <Routes />;
};
