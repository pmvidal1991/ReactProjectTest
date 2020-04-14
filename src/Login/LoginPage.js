import React, { useState} from 'react';
import ReactDOM from 'react-dom';
//import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import './LoginPage.css';
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
import NewUserModal from './NewUserModal'
import BackofficeModal from './BackofficeModal'
import FrontOffice from '../FrontOffice/FrontOffice'
import Loader from 'react-loader-spinner'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faToolbox } from '@fortawesome/free-solid-svg-icons';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import i18n from "../i18n";
import { withTranslation } from 'react-i18next';
import axios from 'axios';
const translation=i18n;

function LoginPage (props) {

  let history = useHistory();
  let location = useLocation();
    const [email,setemail] = useState("");
    const [pass, setpass]  = useState("");
    const [showUserModal,setshowUserModal]  = useState(false);
    const [showBackofficeModal,setshowBackofficeModal]  = useState(false);
    const [showloader, setshowloader]   = useState(false);
    const [showspinner, setshowspinner]  = useState(false);
    const [lang,setlang] = useState("en");
    const {Auth} = props;
    
    const handleChangeLang = e => {    
    console.log("selected val is ", e.target.value);
    let newlang = e.target.value;
    setlang(newlang);
    translation.changeLanguage(newlang);
    console.log("state value is"+ newlang);
   
  };

  const handleChangeEmail= ({target:e}) => {
   setemail(e.value);
  }
  const handleChangePass= ({target:e}) => {
    setpass(e.value);
  }
  const timer = () => {
     setshowloader(false);
  }
  const handleOpenNewAccountModal = () => {
    setshowUserModal(true);
     setshowloader(true);
    setInterval(timer, 3000)

  }
  function handleOpenNewAccountLoader (){
    setshowloader(true);  
  }
  function handleCloseNewAccountLoader(){
   
    setshowloader(false); 
  }
  const handleOpenBackofficeModal = () => {
  
    setshowBackofficeModal(true);
     setshowloader(true);
     setInterval(timer, 3000)

  }
  function handleCloseNewAccountModal(){
    setshowUserModal(false);
    setshowloader(false);

  }
  function handleCloseBackofficeModal (){
    setshowBackofficeModal(false);
    setshowloader(false);

  }
  const greeting = () => {
    toast.success("Bem-Vindo: " + email, {
      position: toast.POSITION.TOP_CENTER,
    });
}
 const login = async () =>{
    
    const headers = {
      'Content-Type': 'application/json',
    }
    
    const element=<FrontOffice />;
     setshowspinner(true);

      await axios.post(`http://pmvidal-001-site5.etempurl.com/api/v1/Login`, {
      Email: email,
      Password: pass
    }, { headers: headers }).then(res => {

      console.log(res.data)
      if (res.data.data == null) {
        const ToastMsg = () => (
          <div>
            Codigo: {res.data.code} <br />
            Mensagem: {res.data.message}
          </div>
        )
        setshowspinner(false);
        toast.error(<ToastMsg />, {
          position: toast.POSITION.TOP_CENTER,
        });

      } else {

      
      
        let { from } = location.state || { from: { pathname: "/" } };
        Auth.token=res.data.data.token;
        Auth.authenticate(() => {
          history.replace(from);
        

          const ToastMsg = () => (
            <div>
              Bem-Vindo: {email} <br />            
            </div>
          )
          
          toast.error(<ToastMsg />, {
            position: toast.POSITION.TOP_CENTER,
          });


        });
     
      }


    }
    ).catch((erro) => {
      setshowspinner(false);
      toast.error("" + erro, {
        position: toast.POSITION.TOP_CENTER,
      });
    }

    );


  };


    
    
    return (


     
        <div className="container" style={{ width: '100%', alignItems: 'center', minHeight: '100vh' }}>
          <div className="row" style={{ minHeight: '100vh', marginLeft: 'unset!important' }}>

            <div className="col-md-6 login">
              <ToastContainer />

              <div style={{ marginTop: '20%', marginLeft: '10%' }}>
                <div className="form-group">
                  <h4 className="titleStyle"><strong>F-REGO</strong></h4>

                  <h1 className="greeting">{translation.t("Welcome")}</h1>

                </div>
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
                <div className="form-check">
                  <div className="row">
                    <div className="col-sm-4">
                      <button className="btn btn-primary loginbutton gradient-button gradient-button-4" onClick={login} >Login</button><br />
                    </div>
                    <div className="col-sm-4" style={{ marginLeft: '15%' }}>
                      <Loader
                        type="Puff"
                        color="#00BFFF"
                        height={75}
                        width={75}
                        visible={showspinner}
                      />
                    </div>
                  </div>

                  <label className="form-check-label" style={{ color: 'grey', fontSize: '16px', marginTop: '3%' }}>Don't have an account?</label><label onClick={handleOpenNewAccountModal} className="form-check-label" style={{ color: '#0078d4', fontSize: '16px', marginLeft: '1%' }}>Create a new account</label>

               
                  <NewUserModal showmodal={showUserModal} showloader={showloader} closemodal={handleCloseNewAccountModal} openloader={handleOpenNewAccountLoader} closeloader={handleCloseNewAccountLoader} />
               
                </div>
              </div>

            </div>
            <div className="col-md-6 backgroundCol">
              <button type="button" className="btn btn-primary Langbutton" onClick={handleChangeLang} value="pt">PT</button>
              <button type="button" style={{ right: '10%' }} className="btn btn-primary Langbutton" onClick={handleChangeLang} value="en">EN</button>
              <button type="button" className="btn btn-primary BObutton" onClick={handleOpenBackofficeModal}><FontAwesomeIcon icon={faToolbox} /> F-Rego Access</button>
              <BackofficeModal showmodal={showBackofficeModal} showloader={showloader} closemodal={handleCloseBackofficeModal} />
            </div>
          </div>
        </div>

    
    );
  


}







export default withTranslation()(LoginPage);
