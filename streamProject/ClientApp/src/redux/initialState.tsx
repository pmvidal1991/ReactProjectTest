import { ErrorBoundaryInterface, LoginReduxModel } from "../Login/LoginInterfaces";
export interface initialStateModel
{
    Login: LoginReduxModel | null;
    userIsLoading: boolean;
    LoginError: ErrorBoundaryInterface | null;
}
export let initialState: initialStateModel = {
    Login: null,
    userIsLoading: false,
    LoginError: null,
}

