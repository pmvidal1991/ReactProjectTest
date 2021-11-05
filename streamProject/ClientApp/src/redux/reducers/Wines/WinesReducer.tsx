import { WineErrorBoundaryInterface, wineModel } from "../../../Wine/WineInterfaces";
import * as types from "../../actions/actionTypes"

export function Wines(state = [], action: any) {
    switch (action.type) {
        case types.GET_WINES_SUCCESS: {

            return action.Wines as wineModel[]
        }
        default: {
            return state;
        }
    }
}
export function WinesError(state = [], action: any) {
    switch (action.type) {
        case types.GET_WINES_ERROR: {

            return action.WinesError as WineErrorBoundaryInterface
        }
        default: {
            return state;
        }
    }
}
export function winesIsLoading(state = false, action: any) {
    switch (action.type) {
        case types.WINES_IS_LOADING:
            return action.iswinesLoading as boolean;
        default: {
            return state;
        }
    }
}
export function AddWineError(state = false, action: any) {
    switch (action.type) {
        case types.ADD_WINE_ERROR: {
            return action.AddWineError as WineErrorBoundaryInterface
        }
        default: {
            return state;
        }
    }
}
export function WineError(state = [], action: any) {
    switch (action.type) {
        case types.GET_WINE_BY_ID_ERROR: {

            return action.WineError as WineErrorBoundaryInterface
        }
        default: {
            return state;
        }
    }
}
export function Wine(state = [], action: any) {
    switch (action.type) {
        case types.GET_WINE_BY_ID_SUCCESS: {

            return action.Wine as wineModel
        }
        default: {
            return state;
        }
    }
}