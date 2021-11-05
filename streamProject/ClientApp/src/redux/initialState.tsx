import { ErrorBoundaryInterface, LoginReduxModel } from "../Login/LoginInterfaces";
import { WineErrorBoundaryInterface, wineModel } from "../Wine/WineInterfaces";
export interface initialStateModel {
    Login: LoginReduxModel | null;
    userIsLoading: boolean;
    LoginError: ErrorBoundaryInterface | null;
    WinesError: WineErrorBoundaryInterface | null;
    winesIsLoading: boolean;
    Wines: wineModel[] | null;
    AddWineError: WineErrorBoundaryInterface | null;
    Wine: wineModel | null;
    WineError: WineErrorBoundaryInterface | null;
}
export let initialState: initialStateModel = {
    Login: null,
    userIsLoading: false,
    LoginError: null,
    WinesError: null,
    winesIsLoading: false,
    Wines: null,
    AddWineError: null,
    Wine: null,
    WineError:null
}

