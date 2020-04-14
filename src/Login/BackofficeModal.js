import React, { useState} from 'react';
import ReactDOM from 'react-dom';
//import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import './LoginPage.css';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import Modal from 'react-bootstrap/Modal'
import LoadingOverlay from 'react-loading-overlay';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { withTranslation } from 'react-i18next';
import axios from 'axios';

function BackofficeModal (props)  {
  
    const [Email,setEmail] = useState("");
    const [Pass, setPass]  = useState("");
    const {showmodal,showloader,closemodal} = props;
   const handleChangeEmail= ({target:e}) => {
       setEmail(e.value);
    }
    const handleChangePass=({target:e}) => {
      setPass(e.value);
    }
  
    const handleCloseCloseBackOfficeModal= () => {
      closemodal();
  
    }
    const notify = () => toast.error("Email :" + Email +
      "\npassword :" + Pass, {
      position: toast.POSITION.TOP_CENTER,
    });
   
     
      return (
  
        <Modal
          show={showmodal}
          onHide={handleCloseCloseBackOfficeModal}
          size={'lg'}
        >
          <LoadingOverlay
            active={showloader}
            spinner
            text='Loading your content...'
          >
            <Modal.Header closeButton>
  
              <div className="row" style={{ marginLeft: '1%' }}>
                <div className="form-group">
                  <h4 className="titleStyle"><strong>F-REGO</strong></h4>
                  <h1 className="greeting">BackOffice Access</h1>
                </div>
              </div>
  
            </Modal.Header>
            <Modal.Body>
              <div className="form-group">
                <input type="email" className="form-control logininputs" id="EmailInput" aria-describedby="emailHelp" placeholder="Enter email" onChange={handleChangeEmail} />
              </div>
              <div className="form-group">
                <input type="password" className="form-control logininputs" id="PasswordInput" placeholder="Password" onChange={handleChangePass} />
              </div>
              <div className="form-check">
                <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                <label className="form-check-label" style={{ color: "grey", fontSize: '16px' }}>Remember me</label>
                <a href="#" style={{ color: '#0078d4', fontSize: '16px', marginLeft: '27%' }}>   Forget Password?</a>
              </div>
            </Modal.Body>
            <Modal.Footer>
  
              <div className="row">
                <div className="form-group">
                  <div className="col-md-1">
                    <button className="btn btn-primary loginbutton gradient-button gradient-button-4" onClick={notify} >Login</button><br />
                  </div>
                </div>
              </div>
  
            </Modal.Footer>
          </LoadingOverlay>
        </Modal>
  
      );
  
    
  }


export default withTranslation()(BackofficeModal);