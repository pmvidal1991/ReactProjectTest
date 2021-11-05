import * as types from "./actionTypes"
import * as WineApi from "../../api/WineApi"
import { wineFilters, wineModel } from "../../Wine/WineInterfaces";
import { AxiosError, AxiosResponse } from "axios";
import { ThunkDispatch } from "redux-thunk";
import { initialStateModel } from "../initialState";
import { Action } from "redux";
const GetWinesErrorMessage = 'An error has occured while trying geting the list: ';
const GetWineErrorMessage = "An error has occured while trying geting the wine: ";
const AddWineErrorMessage = "An error has occured while trying to add the wine: ";

export function getWinesSuccess(Wines: wineModel[]) {
    return { type: types.GET_WINES_SUCCESS, Wines }
}
export function getWinesError(Error: AxiosError | null) {
    return { type: types.GET_WINES_ERROR, WinesError: { isError: Error && Error.isAxiosError !== undefined ? Error.isAxiosError : false, errorMessage: Error && Error.message !== undefined ? GetWinesErrorMessage + Error.message : '' } }
}
export function getWineByIdError(Error: AxiosError | null) {
    return { type: types.GET_WINE_BY_ID_ERROR, WineError: { isError: Error && Error.isAxiosError !== undefined ? Error.isAxiosError : false, errorMessage: Error && Error.message !== undefined ? GetWineErrorMessage + Error.message : '' } }
}
export function AddWineError(Error: AxiosError | null) {
    return { type: types.ADD_WINE_ERROR, AddWineError: { isError: Error && Error.isAxiosError !== undefined ? Error.isAxiosError : false, errorMessage: Error && Error.message !== undefined ? AddWineErrorMessage + Error.message : '' } }
}
export function setWines(filters: wineFilters) {

    return async function (dispatch: ThunkDispatch<initialStateModel, void, Action>) {
        try {
            const WinesResp = await WineApi.GetWines(filters);
            return dispatch(getWinesSuccess((WinesResp as AxiosResponse).data as wineModel[]));
        }
        catch (error) {
            return dispatch(getWinesError(error as AxiosError));
        }
    }

}
export function getWineByIdSuccess(Wine: wineModel) {
    return { type: types.GET_WINE_BY_ID_SUCCESS, Wine }
}

export function winesisLoading(loading: boolean) {
    return { type: types.WINES_IS_LOADING, iswinesLoading: loading }
}
export function getWineById(id: string) {

    return async function (dispatch: ThunkDispatch<initialStateModel, void, Action>) {
        try {
            const WinesResp = await WineApi.GetWineById(id);
            return dispatch(getWineByIdSuccess((WinesResp as AxiosResponse).data as wineModel));
        }
        catch (error) {
            return dispatch(getWineByIdError(error as AxiosError));
        }
    }

}