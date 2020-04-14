import React, { useState } from 'react';
//import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useHistory,
  useLocation
} from "react-router-dom";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import LoginPage from './Login/LoginPage'
import FrontOffice from './FrontOffice/FrontOffice'



function App(props) {



  return (

    <Router>
      <div className="App" >
        <Switch>
          <PrivateRoute path="/FO">
            <FrontOffice Auth={Auth}/>
          </PrivateRoute>
          <Route path="/">
            <LoginPage Auth={Auth}/>
          </Route>
        </Switch>
      </div>
    </Router>
  );



}
const Auth = {
  isAuthenticated: false,
  token: "",
  authenticate(cb) {
    Auth.isAuthenticated = true;
    setTimeout(cb, 100); // fake async
  },
  signout(cb) {
    Auth.token="";
    Auth.isAuthenticated = false;
    setTimeout(cb, 100);
  }
};
function PrivateRoute({ children, ...rest }) {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        Auth.isAuthenticated ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
}





export default App;
