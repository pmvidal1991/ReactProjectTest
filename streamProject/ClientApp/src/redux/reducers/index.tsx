import { combineReducers } from "redux";
import { Login, userIsLoading, LoginError } from './Login/LoginReducer';


const rootReducer = combineReducers({
    Login,
    userIsLoading,
    LoginError,
});

export default rootReducer;