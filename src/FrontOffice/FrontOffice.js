import React, { useState } from 'react';
import ReactDOM from 'react-dom';
//import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
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
import Loader from 'react-loader-spinner'
import './FrontOffice.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const axios = require('axios').default;

function FrontOffice (props) {
  
   const {Auth} = props;
    

      return (
        <div className="App">
          <ToastContainer />
          <header className="App-header FrontOffice">
            <div className="row">
          {Auth.token}
          </div>
          </header>
        </div>
      );
    
  
  
  }
  export default FrontOffice;