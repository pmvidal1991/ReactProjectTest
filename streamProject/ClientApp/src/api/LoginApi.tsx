import { handleResponse, handleError } from "./apiUtils";
import axios from "axios";
const ApiEndPoint: string = process.env.REACT_APP_API_KEY_URI as string;

export function LoginUser(LoginBody: FormData)
{
    return axios.post(ApiEndPoint + `Login`, LoginBody)
        .then(handleResponse)
        .catch(handleError);
}