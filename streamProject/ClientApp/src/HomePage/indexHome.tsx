import React, { useState } from "react";
import * as LoginActions from "../redux/actions/LoginActions";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import "./HomePage.css";
import { useHistory, useLocation } from "react-router";
import LoadingOverlay from "react-loading-overlay";
import "react-toastify/dist/ReactToastify.css";
import Button from "@material-ui/core/Button";
import MenuComponent from "../HomePage/components/MenuComponent";
import { makeStyles } from "@material-ui/core/styles";
import { HomePagePropsInterface } from "./HomePageInterfaces";
import { initialStateModel } from "../redux/initialState";
import { Action } from "redux";
import { ThunkDispatch } from "redux-thunk";

const useStyles2 = makeStyles(theme => ({
    root: {
        backgroundColor: "rgb(159, 29, 65)",
        borderColor: "rgb(159, 29, 65)",
        "&:hover": {
            backgroundColor: "rgb(159, 29, 65)",
            borderColor: "rgb(159, 29, 65)"
        },
        color: "white",
        width: "80%",
        marginLeft: "10%",
        height: 100,
        fontSize: 16
    }
}));

const HomePage: React.FC<HomePagePropsInterface | null> = props =>
{
    const {
        user,
        login,
    } = props;
    const buttonClasses = useStyles2();
    const [loader, setLoader] = useState(false);
    const history = useHistory();
    const showLoader = () =>
    {
        setLoader(true);
    };
    const closeLoader = () =>
    {
        setLoader(false);
    };
    return (
        <div className="container" style={{ textAlign: "center", marginTop: "5%", maxWidth: '1513px' }}>
            <LoadingOverlay active={loader} spinner text={"Loading..."}>
                <div className="wrapper">
                    <div id="formContent2">
                        <MenuComponent
                            user={user}
                            login={login}

                        />
                        <div className="row" style={{ marginTop: "3%" }}>
                            <div className="col-md-2" />
                            <div className="col-md-8">
                                <div className="row">

                                    <div className="col-md-6">
                                        <div className="row noMargin">
                                            <Button className={buttonClasses.root} onClick={() =>
                                            {
                                                history.push("/Wine");
                                            }}>
                                                Wine
                      </Button>
                                        </div>
                                    </div>
                      {/*              <div className="col-md-6">*/}
                      {/*                  <div className="row noMargin">*/}
                      {/*                      <Button className={buttonClasses.root} onClick={() =>*/}
                      {/*                      {*/}
                      {/*                          history.push("/Beer");*/}
                      {/*                      }}>*/}
                      {/*                          Beer*/}
                      {/*</Button>*/}
                      {/*                  </div>*/}
                      {/*              </div>*/}
                                </div>
                            </div>
                            <div className="col-md-2" />
                        </div>
                    </div>
                </div>
            </LoadingOverlay>
        </div>
    );
}
function mapStateToProps(state: initialStateModel)
{
    return {
        user: state.Login,
    };
}
function mapDispatchToProps(dispatch: ThunkDispatch<initialStateModel, void, Action>)
{
    return {
        login: (arg: FormData | null) => dispatch(LoginActions.login(arg)),
    };
}
export default connect(mapStateToProps, mapDispatchToProps as any)(HomePage);