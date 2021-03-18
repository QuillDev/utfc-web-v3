import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Navigator } from "./global-components/Navigator";
import { Account } from "./pages/Account";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
export const Routes: React.FC = () => {
  return (
    <BrowserRouter>
      <div>
        <Navigator/>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/account" component={Account} />

        </Switch>
      </div>
    </BrowserRouter>
  );
};

export default Routes;
