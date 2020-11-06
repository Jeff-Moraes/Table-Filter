import React, { useState } from "react";

import { Switch, Route, Redirect } from "react-router-dom";

import Login from "../pages/Login";
import Table from "../pages/Table";

const Routes = () => {
  const [user, setUser] = useState(window.localStorage.getItem("username"));

  return (
    <Switch>
      <Route
        exact
        path="/"
        render={(props) => <Login {...props} setUser={setUser} />}
      />
      <Route
        exact
        path="/table"
        render={(props) => {
          if (user) {
            return <Table {...props} setUser={setUser} />;
          } else {
            return <Redirect to="/" />;
          }
        }}
      />
    </Switch>
  );
};

export default Routes;