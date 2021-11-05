import { combineReducers } from "redux";
import { Login, userIsLoading, LoginError } from './Login/LoginReducer';
import { WinesError, winesIsLoading, Wines, AddWineError, Wine, WineError } from "./Wines/WinesReducer";


const rootReducer = combineReducers({
    Login,
    userIsLoading,
    LoginError,
    WinesError,
    winesIsLoading,
    Wines,
    AddWineError,
    Wine,
    WineError
});

export default rootReducer;