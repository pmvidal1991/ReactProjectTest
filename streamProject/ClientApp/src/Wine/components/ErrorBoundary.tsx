import React, { useContext, createContext, useState } from "react";
import Accordion from '@material-ui/core/Accordion'
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { ErrorBoundaryPropsInterface } from "../WineInterfaces";

const ErrorBoundary: React.FC<ErrorBoundaryPropsInterface> = props => {
    const { Error, type, closeModal, getWinesError, getWineByIdError, AddWineError } = props;

    return (<>
        {Error !== undefined && Error !== null && Error.isError === true ?
            <div style={{ width: '100%', height: '100%' }}>
                <Accordion style={{ marginTop: '10%', width: '50%', marginLeft: '25%', marginBottom: '10%' }}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography>Something went wrong, see Details:</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            {Error.errorMessage}
                        </Typography>

                    </AccordionDetails>
                    <button type="button" id="LogginButton" className='btn btn-primary' style={{ float: "left", marginLeft: '1%', marginBottom: '1%' }} onClick={() => {
                        switch (type) {
                            case 'list': { getWinesError(null); break; }
                            case 'wine': {
                                getWineByIdError(null);
                                closeModal(); break;
                            }
                            case 'add': { AddWineError(null); break; }
                        }
                    }}>
                        Close
                    </button>
                </Accordion>
            </div>
            : props.children}

    </>);

}
export default (ErrorBoundary);