import { AxiosError } from "axios";
import { LoginReduxModel } from "../Login/LoginInterfaces";

export interface wineFilters {
    brand: string;
    type: string;
    region: string;
    section: string;
    division: string;
}
export interface WineErrorBoundaryInterface {
    isError: boolean;
    errorMessage: string;
}
export interface ErrorBoundaryPropsInterface {
    Error: WineErrorBoundaryInterface;
    type: string;
    closeModal: () => void;
    getWinesError: (arg: AxiosError | null) => Promise<any>;
    getWineByIdError: (arg: AxiosError | null) => Promise<any>;
    AddWineError: (arg: AxiosError | null) => Promise<any>;
}
export interface WinePagePropsInterface {
    User: LoginReduxModel;
    login: (arg: FormData | null) => Promise<any>;
    WinesError: WineErrorBoundaryInterface,
    getWinesError: (arg: AxiosError | null) => Promise<any>;
    getWineByIdError: (arg: AxiosError | null) => Promise<any>;
    AddWineError: (arg: AxiosError | null) => Promise<any>;
    iswinesLoading: boolean;
    setWines: (arg: wineFilters) => Promise<any>;
    winesisLoading: (arg: boolean) => { type: string; iswinesLoading: boolean };
    Wines: wineModel[];
    getWineById: (arg: string) => Promise<any>;
    addWineError: WineErrorBoundaryInterface,
    WineError: WineErrorBoundaryInterface,
    Wine: wineModel,
}
export interface wineModel {
    id: string;
    name: string;
    reference: string;
    section: string;
    division: string;
    type: string;
    description: string;
    region: string;
    brand: string;
    img: string;
}
export interface WinesResponse {
    type: string;
    Wines: wineModel[];
}
export interface WineResponse {
    type: string;
    Wine: wineModel;
}
export interface WineTablePropsInterface {
    list: wineModel[];
    showLoader: () => void;
    showEditModal: () => void;
    closeLoader: () => void;
    getWineById: (arg: string) => Promise<any>;


}
export interface AddWineModalPropsInterface {
    showmodal: boolean;
    closeModal: () => void;
    getList: () => Promise<any>;
    iswinesLoading: boolean;
    addWineError: WineErrorBoundaryInterface,
    getWinesError: (arg: AxiosError | null) => Promise<any>;
    getWineByIdError: (arg: AxiosError | null) => Promise<any>;
    AddWineError: (arg: AxiosError | null) => Promise<any>;
    winesisLoading: (arg: boolean) => { type: string; iswinesLoading: boolean };

}
export interface AddWineFormInitialValues {
    name: string;
    description: string;
    brand: string;
    type: string;
    section: string;
    division: string;
    region: string;
}
export interface AddWineFormPropsInterface {
    loading: boolean;
    handleSetMyFile: (file: File) => void;
    onSubmit: (values: AddWineFormInitialValues, { setSubmitting }: { setSubmitting: any }) => void

}
export interface WineDetailsModalPropsInterface {
    showmodal: boolean;
    closeModal: () => void;
    wine: wineModel;
    WineError: WineErrorBoundaryInterface,
    getWinesError: (arg: AxiosError | null) => Promise<any>;
    getWineByIdError: (arg: AxiosError | null) => Promise<any>;
    AddWineError: (arg: AxiosError | null) => Promise<any>;

}
export interface DetailsWineFormPropsInterface {
    wineDetails: wineModel
}