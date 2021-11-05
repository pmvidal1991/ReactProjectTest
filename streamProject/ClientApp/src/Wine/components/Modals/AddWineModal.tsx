import React, { useState } from "react";
//import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as WineApi from "../../../api/WineApi"
import Modal from 'react-bootstrap/Modal'
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import LoadingOverlay from "react-loading-overlay";
import { AddWineFormInitialValues, AddWineModalPropsInterface } from "../../WineInterfaces";
import { AxiosError, AxiosResponse } from "axios";
import AddWineForm from "../Forms/AddWineForm";
import ErrorBoundary from "../ErrorBoundary";


const AddWineModal: React.FC<AddWineModalPropsInterface | null> = props => {
    const { showmodal, closeModal, getList, winesisLoading, iswinesLoading, getWinesError, getWineByIdError, AddWineError, addWineError } = props;
    let [myFile, setMyFile] = useState<string | Blob>();
    const handleSetMyFile = (file: File) => {
        setMyFile(file)
    }
    const AddWine = (values: AddWineFormInitialValues, { setSubmitting }: any) => {
        winesisLoading(true);
        setSubmitting(true);
        const headers = {
            ContentType: "application/json"
        };
        var data = new FormData();
        data.append("name", values.name);
        data.append("section", values.section);
        data.append("division", values.division);
        data.append("type", values.type);
        data.append("description", values.description);
        data.append("region", values.region);
        data.append("brand", values.brand);
        data.append("img", myFile as string | Blob);
        try {
            WineApi.AddWine(data).then((resp: AxiosResponse | AxiosError) => {
                if ((resp as AxiosResponse).data !== undefined) {
                    var response = (resp as AxiosResponse).data;
                    if (response.success == true) {

                        getList();
                        const ToastMsg = () => (
                            <div style={{ fontSize: "20px" }}>
                                {response.message}
                            </div>);


                        toast.success(<ToastMsg />, {
                            position: toast.POSITION.TOP_CENTER,
                        });

                        winesisLoading(false);
                        setSubmitting(false);
                        closeModal();

                    } else {
                        closeModal();
                        winesisLoading(false);
                        setSubmitting(false);
                        const ToastMsg = () => <div style={{ fontSize: "20px" }}>{response.message}</div>;
                        toast.error(<ToastMsg />, {
                            position: toast.POSITION.TOP_CENTER,

                        });
                    }
                } else {
                    if ((resp as AxiosError).isAxiosError === true) {

                        winesisLoading(false);
                        AddWineError(resp as AxiosError);
                        setSubmitting(false);
                    }

                }
            });
        } catch (error) {
            winesisLoading(false);
            AddWineError(error as AxiosError);
            setSubmitting(false);
            //const ToastMsg = () => <div style={{ fontSize: "20px" }}>{error.message}</div>;
            //toast.error(<ToastMsg />, {
            //    position: toast.POSITION.TOP_CENTER,

            //});
        }
    };






    return (

        <Modal
            show={showmodal}
            onHide={closeModal}
            size={'lg'}

        >
            <ErrorBoundary Error={addWineError} getWinesError={getWinesError} getWineByIdError={getWineByIdError} AddWineError={AddWineError} type='add' closeModal={closeModal}>
                <LoadingOverlay active={iswinesLoading} spinner text={"Loading..."}>
                    <Modal.Header closeButton>
                        <h3 style={{ float: "left", marginLeft: '1%' }}>Add Wine</h3>
                    </Modal.Header>
                    <Modal.Body>
                        <div style={{ width: '100%' }}>
                            <AddWineForm onSubmit={AddWine} loading={iswinesLoading} handleSetMyFile={handleSetMyFile} />
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                    </Modal.Footer>
                </LoadingOverlay>
            </ErrorBoundary >
        </Modal>

    );



}
export default (AddWineModal);