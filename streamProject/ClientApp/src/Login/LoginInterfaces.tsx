import { AxiosError } from "axios";
export interface loginPropsInterface
{
    isLoading: boolean;
    login: (arg: FormData | null) => Promise<any>;
    userisLoading: (arg: boolean) => { type: string; isLoading: boolean };
    Error: ErrorBoundaryInterface;
    loginError: (arg: AxiosError | null) => Promise<any>;

}
export interface loginFormPropsInterface
{
    onSubmit: any;
    loading: boolean;
}
export interface loginFormInitialValuesInterface
{
    username: string;
    password: string;
}
export interface loginFormTouchedInitialValuesInterface
{
    username: boolean;
    password: boolean;
}
export interface LoginReduxModel
{
    id?: number;
    Nome?: string;
    Email?: string;
    Username?: string;
    Password?: string;
    isAdmin?: boolean;
    success?: boolean;
}
export interface ErrorBoundaryPropsInterface
{
    Error: ErrorBoundaryInterface;
    loginError: (arg: AxiosError | null) => Promise<any>;
}
export interface ErrorBoundaryInterface
{
    isError: boolean;
    errorMessage: string;
}
export interface LoginResponse
{
    type: string;
    user: LoginReduxModel;
}
export interface LoginResponseError
{
    type: string;
    LoginError: ErrorBoundaryInterface;
}
