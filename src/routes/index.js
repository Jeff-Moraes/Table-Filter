import React, { useState } from "react";

import { Switch, Route, Redirect } from "react-router-dom";

import Login from "../pages/Login";
import Table from "../pages/Table";

const Routes = (props) => {
  const [user, setUser] = useState(props.user);
  return (
    <Switch>
      <Route
        path="/"
        render={(props) => <Login {...props} setUser={setUser} />}
      />
      <Route
        path="/table"
        render={(props) => {
          if (user) {
            return <Table {...props} user={user} setUser={setUser} />;
          } else {
            return <Redirect to="/" />;
          }
        }}
      />
    </Switch>
  );
};

export default Routes;