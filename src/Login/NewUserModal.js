import React, { useState } from 'react';
import ReactDOM from 'react-dom';
//import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import './LoginPage.css';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import Loader from 'react-loader-spinner'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faCheck, faInfo } from '@fortawesome/free-solid-svg-icons';
import Modal from 'react-bootstrap/Modal'
import LoadingOverlay from 'react-loading-overlay';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { withTranslation } from 'react-i18next';
import axios from 'axios';

function NewUserModal (props){

    const [Email,setEmail] = useState("");
    const [Pass, setPass]  = useState("");
    const [ConfirmPassword,setConfirmPassword]  = useState("");
    const [CompanyName,setCompanyName]  = useState("");
    const [CompanyEmail, setCompanyEmail]   = useState("");
    const [Address, setAddress]  = useState("");
    const [City,setCity] = useState("");
    const [Country,setCountry] = useState("");
    const [Postcode, setPostcode]  = useState("");
    const [PhoneNumber,setPhoneNumber]  = useState("");
    const [VatNumber,setVatNumber]  = useState("");
    const [invalid, setinvalid]   = useState("none");
    const [valid, setvalid]  = useState("none");
    const [info,setinfo] = useState("none");
    const [loader,setloader] = useState("none");
    const [showspinner, setshowspinner]  = useState(false);
    const [Loadermessage,setLoadermessage]  = useState("");
    const [color,setcolor]  = useState("");
    const [RegisterButtonClass, setRegisterButtonClass]   = useState("btn btn-primary loginbutton gradient-button gradient-button-4");
    const [RegisterwrapperClass, setRegisterwrapperClass]  = useState("form-group");
    var newUser= {company: true,
      name: CompanyName,
      nif: VatNumber,
      adminuser: {
        email: Email,
        password: Pass
      }, 
      address: {
        addressname: Address,
        zipcode: Postcode,
        city: City,
        country: Country
      },
      phone: PhoneNumber,
      email: CompanyEmail,        
      validdate: null};
      const {openloader,closeloader,showmodal,showloader,closemodal} = props;
  
  
 const handleChangeEmail= ({target:e}) => {
  setEmail(e.value);
  
  }
  const handleChangePass= ({target:e}) =>{
    setPass(e.value);   
  }
  const handleChangeConfirmPassword = ({target:e}) => {
    setConfirmPassword(e.value);
  }
  const handleChangeCompanyName= ({target:e}) =>{
    setCompanyName(e.value);
  }
  const handleChangeCompanyEmail= ({target:e}) => {
    setCompanyEmail(e.value);
  }
  const handleChangeAddress= ({target:e}) => {
    setAddress(e.value);
  }
  const handleChangeCity= ({target:e}) =>{
    setCity(e.value);
  }
  const handleChangeCountry= ({target:e}) => {
    setCountry(e.value);
  }
  const handleChangePostcode= ({target:e}) => {
    setPostcode(e.value);
  }
  const handleChangePhoneNumber= ({target:e}) => {
    setPhoneNumber(e.value);
  }
  const handleChangeVatNumber= ({target:e}) => {
    setVatNumber(e.value);
  }
  const handleCloseNewAccountModal = () => { 
    closemodal();
    setshowspinner(false);
    setloader("none");
    setinvalid("none");
    setvalid("none");
    setinfo("none");
    setRegisterButtonClass("btn btn-primary loginbutton gradient-button gradient-button-4");
    setRegisterwrapperClass("form-group");
    
  }
  const handleCheckVatNumber= async ({target:e}) => {

    var message = "";
    var code = "";
    var myData = null;
    setshowspinner(false);
    setloader("none");
    setinvalid("none");
    setvalid("none");
    setinfo("none");
    setRegisterButtonClass("btn btn-primary loginbutton gradient-button gradient-button-4 registerbtn");
    setRegisterwrapperClass("form-group registerbtnwrapper");
    if (e.value !== "") {
      setshowspinner(true);
      setloader("block");
      setLoadermessage("Validating VATnumber...");
      setvalid("none");
      setinfo("none");
      setinvalid("none");
      await axios.get(`http://pmvidal-001-site5.etempurl.com/api/v1/entity/nif/${e.value}`).then(res => {
        message = res.data.message;
        code = res.data.code;
        myData = res.data.data;
        console.log(res.data);
        if (code == "200") {
          switch (myData) {
            case null: {
              setshowspinner(false);
              setloader("none");
              setLoadermessage(message);
              setcolor("green");
              setvalid("block");
              setRegisterButtonClass("btn btn-primary loginbutton gradient-button gradient-button-4");
              setRegisterwrapperClass("form-group");
              return
              
            };
            case 1: {
              setshowspinner(false);
              setloader("none");
              setLoadermessage(message);
              setcolor("Red");
              setinvalid("block");
              return
              
            };
            case 0: {
              setshowspinner(false);
              setloader("none");
              setLoadermessage(message);
              setcolor("#e6930b");
              setinfo("block");           
              return
              
            };
            case -1: {
              setshowspinner(false);
              setloader("none");
              setLoadermessage(message);
              setcolor("Red");
              setinvalid("block");
             return
            }
          }
        }
        if (code == "400") {
          setshowspinner(false);
          setloader("none");
          setLoadermessage(message);
          setcolor("Red");
          setinvalid("block");
         
        }
      }
      ).catch((erro) => {
        setshowspinner(false);
        setloader("none");
        setLoadermessage(message);
        setcolor("Red");
        setinvalid("block");       

        /*toast.error("" + erro, {
          position: toast.POSITION.TOP_CENTER,
        });*/
      }

      );
    }
  }
  const UserRegister = async e => {
    e.preventDefault();
    const headers = {
      'Content-Type': 'application/json',
    }

    newUser={company: true,
      name: CompanyName,
      nif: VatNumber,
      adminuser: {
        email: Email,
        password: Pass
      }, 
      address: {
        addressname: Address,
        zipcode: Postcode,
        city: City,
        country: Country
      },
      phone: PhoneNumber,
      email: CompanyEmail,        
      validdate: null};
  
    openloader();
    if (ConfirmPassword != "" && Pass != ConfirmPassword) {
      closeloader();
      const ToastMsg = ({ closeToast }) => (
        <div>
          As passwords não correspondem!<br />
        </div>
      )

      toast.error(<ToastMsg />, {
        position: toast.POSITION.TOP_CENTER,
      });
    } else {
     console.log(newUser);
      await axios.post(`http://pmvidal-001-site5.etempurl.com/api/v1/entity/register`, newUser, { headers: headers }).then(res => {
        console.log(res.data);
        if (res.data.code == 200) {
          closeloader();
          const ToastMsg = ({ closeToast }) => (
            <div>
              Codigo: {res.data.code} <br />
              Mensagem: {res.data.message}<br />
            </div>
          )

          toast.success(<ToastMsg />, {
            position: toast.POSITION.TOP_CENTER,
          });
        } else {
          closeloader();
          const ToastMsg = ({ closeToast }) => (
            <div>
              Codigo: {res.data.code} <br />
              Mensagem: {res.data.message}
            </div>
          )

          toast.error(<ToastMsg />, {
            position: toast.POSITION.TOP_CENTER,
          });

        }


      }
      ).catch((erro) => {
        closeloader();
        toast.error("" + erro, {
          position: toast.POSITION.TOP_CENTER,
        });
      }

      );
    }
  }
  const checkPasswords= () => {
    if (ConfirmPassword != "" && Pass != ConfirmPassword) {
      const ToastMsg = ({ closeToast }) => (
        <div>
          As passwords não correspondem!<br />
        </div>
      )

      toast.error(<ToastMsg />, {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  }
 const CheckNif= () => {
  
    setRegisterButtonClass("btn btn-primary loginbutton gradient-button gradient-button-4 registerbtn")
  }
  const {} = props;
   
    return (

      <Modal
        show={showmodal}
        onHide={handleCloseNewAccountModal}
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
                <h1 className="greeting">New account</h1>
                <label style={{ color: '#3a7bd5' }}>* Required field</label>
              </div>
            </div>

          </Modal.Header>
          <form onSubmit={UserRegister}>
            <Modal.Body>

              <div className="row" style={{ marginLeft: '1%' }}>
                <div className="form-group">
                  <h4 className="titleStyle">1. Login Info</h4>
                  <input type="email" className="form-control newAccountinputs" id="EmailInput" aria-describedby="emailHelp" onChange={handleChangeEmail} placeholder="* Enter email" style={{ marginLeft: '5%' }} required />
                </div>
              </div>
              <div className="row" style={{ marginLeft: '1%' }}>
                <div className="col-md-6">
                  <input type="password" className="form-control newAccountinputs" id="PasswordInput" onChange={handleChangePass} placeholder="* Password" style={{ width: '200px' }} required />
                </div>
                <div className="col-md-6">
                  <input type="password" className="form-control newAccountinputs" id="ConfirmPasswordInput" onChange={handleChangeConfirmPassword} onBlur={checkPasswords} placeholder="* Confirm Password" style={{ width: '200px' }} required />
                </div>
              </div>
              <div className="row" style={{ marginLeft: '1%' }}>
                <div className="form-group">
                  <h4 className="titleStyle">2. Company Details</h4>
                  <input type="text" className="form-control  newAccountinputs" id="CompanyName" onChange={handleChangeCompanyName} placeholder="* Company Name" style={{ marginLeft: '5%' }} required />
                </div>
              </div>
              <div className="row" style={{ marginLeft: '1%' }}>
                <div className="form-group">
                  <input type="email" className="form-control  newAccountinputs" id="CompanyEmail" onChange={handleChangeCompanyEmail} placeholder="* Company Email" style={{ marginLeft: '5%' }} required />
                </div>
              </div>
              <div className="row" style={{ marginLeft: '1%' }}>
                <div className="form-group">
                  <div className="col-md-6">
                    <input type="text" className="form-control newAccountinputs" id="Address" onChange={handleChangeAddress} placeholder="* Address" style={{ width: '320px' }} required />
                  </div>
                </div>
              </div>
              <div className="row" style={{ marginLeft: '1%' }}>
                <div className="form-group">
                  <div className="col-md-4">
                    <input type="text" className="form-control newAccountinputs" id="CityInput" onChange={handleChangeCity} placeholder="* City" style={{ width: '200px' }} required />
                  </div>
                </div>
                <div className="form-group">
                  <div className="col-md-4">
                    <input type="text" className="form-control newAccountinputs" id="CountryInput" onChange={handleChangeCountry} placeholder="* Country" style={{ width: '200px' }} required />
                  </div>
                </div>
                <div className="form-group">
                  <div className="col-md-4">
                    <input type="text" className="form-control newAccountinputs" id="PostCodeInput" onChange={handleChangePostcode} placeholder="* Postcode" style={{ width: '200px' }} required />
                  </div>
                </div>
              </div>
              <div className="row" style={{ marginLeft: '1%' }}>
                <div className="form-group">
                  <input type="text" className="form-control newAccountinputs" id="PhoneNumber" onChange={handleChangePhoneNumber} placeholder="* Phone number" style={{ width: '200px', marginLeft: '8%' }} required />
                </div>
              </div>
              <div className="row" style={{ marginLeft: '1%' }}>
                <div className="form-group">
                  <input type="number" className="form-control newAccountinputs" id="VatNumber" onChange={handleChangeVatNumber} onBlur={handleCheckVatNumber} onFocus={CheckNif} placeholder="* VAT Number" style={{ width: '200px', marginLeft: '8%' }} required />
                </div>
              </div>
              <div className="row" style={{ marginLeft: '4%' }}>


                <Loader
                  type="Puff"
                  color="#00BFFF"
                  height={25}
                  width={25}
                  visible={showspinner}
                />


                <label style={{ display: loader }}>{Loadermessage}</label>
                <label style={{ display: valid, color: color }}><FontAwesomeIcon icon={faCheck} />  {Loadermessage}</label>
                <label style={{ display: invalid, color: color }}><FontAwesomeIcon icon={faTimes} />  {Loadermessage}</label>
                <label style={{ display: info, color: color }}><FontAwesomeIcon icon={faInfo} />  {Loadermessage}</label>
              </div>

            </Modal.Body>
            <Modal.Footer>



              <div className="row" style={{ width: '100%' }}>
                <input type="checkbox" className="form-check-input" id="exampleCheck1" style={{ marginLeft: '1%' }} />
                <label className="form-check-label" style={{ color: "#3a7bd5", fontSize: '16px', marginLeft: '5%' }}>Concordo que li e aceito os Termos e Condições</label>
                <div className={RegisterwrapperClass} style={{ marginLeft: '75%' }}>
                  <div className="col-md-1">
                    <input type="submit" value="Register" className={RegisterButtonClass} style={{ marginLeft: '2%' }} /><br />
                  </div>
                </div>
              </div>

            </Modal.Footer>
          </form>
        </LoadingOverlay>
      </Modal>

    );
    
    

}

export default withTranslation()(NewUserModal);