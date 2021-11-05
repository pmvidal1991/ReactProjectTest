import { handleResponse, handleError } from "./apiUtils";
import axios from "axios";
import { wineFilters } from "../Wine/WineInterfaces";

const ApiEndPoint: string = process.env.REACT_APP_API_KEY_URI as string;

export function GetWines(filters: wineFilters) {
    return axios.get(ApiEndPoint + `Wine`, { headers: { filters: JSON.stringify(filters) } })
        .then(handleResponse)
        .catch(handleError);
}
export function GetWineById(id: string) {
    return axios.get(ApiEndPoint + `Wine/${id}`)
        .then(handleResponse)
        .catch(handleError);
}

export function AddWine(wineData: FormData) {
    return axios.post(ApiEndPoint + `Wine`, wineData)
        .then(handleResponse)
        .catch((error) => { return error });
}