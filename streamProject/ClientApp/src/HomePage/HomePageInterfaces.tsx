import { LoginReduxModel } from "../Login/LoginInterfaces";
import * as LoginActions from "../redux/actions/LoginActions";

export interface HomePagePropsInterface
{
    user: LoginReduxModel;
    login: (arg: FormData | null) => Promise<any>;
}
export interface MenuComponentPropsInterface
{
    user: LoginReduxModel;
    login: (arg: FormData | null) => Promise<any>;
}