import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Modal from 'react-bootstrap/Modal'
import 'react-toastify/dist/ReactToastify.css';
import ModalImage from "react-modal-image";
import ErrorBoundary from '../ErrorBoundary'
import { WineDetailsModalPropsInterface } from "../../WineInterfaces";
import DetailsWineForm from "../Forms/DetailsWineForm";

const WineDetailsModal: React.FC<WineDetailsModalPropsInterface | null> = props => {
    const { showmodal, closeModal, wine, getWinesError, getWineByIdError, AddWineError, WineError } = props;

    return (

        <Modal
            show={showmodal}
            onHide={closeModal}
            size={'lg'}

        >
            <ErrorBoundary Error={WineError} getWinesError={getWinesError} getWineByIdError={getWineByIdError} AddWineError={AddWineError} type='wine' closeModal={closeModal}>
                <Modal.Header closeButton>
                    <h3 style={{ float: "left", marginLeft: '1%' }}>Wine Details:</h3>
                </Modal.Header>
                <Modal.Body>

                    <div className='row'>
                        <div className='col-md-6'>
                            {wine!== undefined && wine !== null && wine.img ? <ModalImage
                                small={"/img/Wine/" + wine.img}
                                large={"/img/Wine/" + wine.img}
                                alt={wine.img}
                            /> : null}</div>
                        <div className='col-md-6'> {wine !== undefined && wine !== null && wine.img !== undefined ? <DetailsWineForm wineDetails={wine} /> : null} </div>
                    </div>


                </Modal.Body>
                <Modal.Footer>
                </Modal.Footer>
            </ErrorBoundary >
        </Modal>

    );



}
export default (WineDetailsModal);