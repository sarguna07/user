import React from "react";
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import UserTable from "./views/user";

function App() {
  return (
    <Router>
      <Switch>
        <Route
          path="/users"
          render={(props) => {
            return <UserTable {...props} />;
          }}
          exact
        />
        <Route to="*">
          <Redirect to="/users" />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
