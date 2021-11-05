import React, { useContext, createContext, useState } from "react";
import { connect } from "react-redux";
import LoginForm from "./components/form/loginForm";
import LocalBarIcon from '@material-ui/icons/LocalBar';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as LoginActions from "../redux/actions/LoginActions";
import * as WinesActions from "../redux/actions/WinesActions";
import { Action } from "redux";
import { loginPropsInterface, loginFormInitialValuesInterface, loginFormPropsInterface, LoginResponse } from "./LoginInterfaces";
import "./LoginPage.css";
import
{
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect,
    useHistory,
    useLocation
} from "react-router-dom";
import { useEffect } from "react";
import { initialStateModel, initialState } from "../redux/initialState";
import { ThunkDispatch } from "redux-thunk";
import ErrorBoundary from "./components/ErrorBoundary";
import { AxiosError } from "axios";
import { wineFilters } from "../Wine/WineInterfaces";

const Login: React.FC<loginPropsInterface | null> = props =>
{
    const { isLoading, login, userisLoading, Error, loginError, setWines } = props;
    let history = useHistory();
    let { from } = { from: { pathname: "/Homepage" } };

    const setAppValues = async () =>
    {
        //await setBeers({ brand: '', type: '', region: '', section: '', division: '' });
        await setWines({ brand: '', type: '', region: '', section: '', division: '' });
    };
    const login1 = async (values: loginFormInitialValuesInterface, { setSubmitting }: any) =>
    {
        //setLoading(true);
        userisLoading(true);
        setSubmitting(true);
        const headers = {
            ContentType: "application/json"
        };
        var data = new FormData();
        data.append("Username", values.username);
        data.append("Password", values.password);
        data.append("Login", 'true');
        try
        {
            await login(data).then((resp: LoginResponse) =>
            {
                if (resp.user)
                {
                    const { user } = resp;
                    if (user !== null && user.success == true)
                    {
                        // actions.login(user);
                        userisLoading(false);
                        setAppValues();

                        const ToastMsg = () => (
                            <div style={{ fontSize: "20px" }}>Welcome: {user.Username}</div>
                        );
                        // sessionStorage.setItem("isAuthenticated", true);
                        toast.success(<ToastMsg />, {
                            position: toast.POSITION.TOP_CENTER
                        });
                        history.push(from);
                        userisLoading(false);
                        setSubmitting(false);

                    } else
                    {
                        const ToastMsg = () => (
                            <div style={{ fontSize: "20px" }}>
                                Password or Username are Incorret!
                            </div>
                        );
                        toast.error(<ToastMsg />, {
                            position: toast.POSITION.TOP_CENTER
                        });
                    }
                }
                setSubmitting(false);
                userisLoading(false);
            });
        }
        catch (ex)
        {
            userisLoading(false);
            toast.error("An error has occured while trying trying to Login", {
                position: toast.POSITION.TOP_CENTER,
                toastId: "logout-exit-message"
            });
        }

    };
    useEffect(() =>
    {
        login(null);
    }, [])
    return (
        <>
            <div
                className="container"
                style={{ textAlign: "center", marginBottom: "10%", maxWidth: '1513px' }}
            >
                <ErrorBoundary Error={Error} loginError={loginError}>
                    <div className="wrapper fadeInDown">
                        <div id="formContent">
                            <div className="fadeIn first">
                                <label style={{ width: '100%', marginTop: '5%', fontSize: '45px', color: 'rgb(159, 29, 65)' }}>CellarManager<LocalBarIcon style={{ marginLeft: '1%', marginBottom: '1%', fontSize: '45px', color: 'rgb(159, 29, 65)' }} /></label>
                            </div>
                            <LoginForm onSubmit={login1} loading={isLoading} />

                            <div id="formFooter" />
                        </div>
                    </div>
                </ErrorBoundary>
            </div>
        </>
    );
}
function mapStateToProps(state: initialStateModel)
{
    return {
        isLoading: state.userIsLoading,
        Error: state.LoginError,
    };
}
function mapDispatchToProps(dispatch: ThunkDispatch<initialStateModel, void, Action>)
{
    return {
        login: (arg: FormData | null) => dispatch(LoginActions.login(arg)),
        userisLoading: (arg: boolean) => dispatch(LoginActions.userisLoading(arg)),
        loginError: (arg: AxiosError | null) => dispatch(LoginActions.loginError(arg)),
        setWines: (arg: wineFilters) => dispatch(WinesActions.setWines(arg)),
    };
}
export default connect(mapStateToProps, mapDispatchToProps as any)(Login)