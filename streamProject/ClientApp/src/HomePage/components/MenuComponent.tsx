import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { toast, ToastContainer } from "react-toastify";
import * as LoginApi from "../../api/LoginApi"
import '../../HomePage/HomePage.css';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import LocalBarIcon from '@material-ui/icons/LocalBar';
import { useHistory } from 'react-router'
import { MenuComponentPropsInterface } from '../HomePageInterfaces';


const MenuComponent: React.FC<MenuComponentPropsInterface> = props =>
{
    const { user, login } = props;
    let history = useHistory();
    const showMenu = () =>
    {
        let menu = document.getElementById('navbarSupportedContent');
        if (menu?.style.display === 'none')
        {
            menu.style.display = 'block';
        } else
        {
            (menu as HTMLElement).style.display = 'none';
        }

    }

    const logout = async () =>
    {
        sessionStorage.clear();
        var data = new FormData();
        data.append("Username", user.Username as string);
        data.append("Password", user.Password as string);
        data.append("Login", "false");
        try
        {
            await login(data).then(resp =>
            {

                login(null);
                toast.success("Adeus", {
                    position: toast.POSITION.TOP_CENTER,
                    toastId: "logout-exit-message"
                });
                history.push("/");
                //window.location.href="/";


            })


        } catch (error)
        {
            login(null);
            toast.success("Adeus", {
                position: toast.POSITION.TOP_CENTER,
                toastId: "logout-exit-message"
            });
            history.push("/");
        }

    };
      return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light">
                <a className="navbar-brand" href="#" style={{ pointerEvents: 'none' }}></a>
                <button className="navbar-toggler" onClick={showMenu} type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <button type="submit" onClick={logout} id="LogginButton" className='btn btn-primary' style={{
                        float: 'right', marginRight: '2%'
                    }}>
                        <ExitToAppIcon /> Sign Out
                                </button>
                </div>
            </nav>

            <div className="fadeIn first">
                <label style={{ width: '100%', marginTop: '5%', fontSize: '45px', color: 'rgb(159, 29, 65)' }}>CellarManager<LocalBarIcon style={{ marginLeft: '1%', marginBottom: '1%', fontSize: '45px', color: 'rgb(159, 29, 65)' }} /></label>
            </div>
        </>
    );
}

export default (MenuComponent)