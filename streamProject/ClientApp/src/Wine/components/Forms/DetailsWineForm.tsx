import React from "react";
import {
withStyles,
makeStyles,
} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField'
import { DetailsWineFormPropsInterface } from "../../WineInterfaces";

const CssTextField = withStyles({
    root: {
        '& label': {
            color: 'black',
        },
        '& .MuiInput-underline:after': {
            borderBottomColor: 'green',
        },
        '& .MuiOutlinedInput-input': {
            color: 'black',
        },
        '&:hover fieldset': {
            borderColor: 'white',
        },
        '&.MuiFormControl-root ': {
            minWidth: '300px',
        },
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderColor: 'black',
                color: 'black'
            },


        },
    },
})(TextField);
const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    margin: {
        margin: theme.spacing(1),
    },
}));
const DetailsWineForm: React.FC<DetailsWineFormPropsInterface | null> = props => {
    const { wineDetails } = props
    const classes = useStyles();
    return (
        <>

            <div className="form-group">
                <CssTextField
                    label={"Name"}
                    className={classes.margin}
                    name="name"
                    disabled
                    placeholder={"Name"}
                    variant="filled"
                    type="text"
                    value={wineDetails.name}
                />
            </div>
            <div className="form-group">
                <CssTextField
                    label={"Description"}
                    className={classes.margin}
                    name="description"
                    placeholder={"Description"}
                    disabled
                    type="text"
                    variant="filled"
                    value={wineDetails.description}
                />
            </div>
            <div className="form-group">
                <CssTextField
                    label={"Reference"}
                    className={classes.margin}
                    name="reference"
                    placeholder={"Reference"}
                    disabled
                    type="text"
                    variant="filled"
                    value={wineDetails.reference}
                />
            </div>
            <div className="form-group">
                <CssTextField
                    label={"Brand"}
                    className={classes.margin}
                    name="brand"
                    placeholder={"Brand"}
                    disabled
                    type="text"
                    variant="filled"
                    value={wineDetails.brand}
                />
            </div>
            <div className="form-group">
                <CssTextField
                    label={"Type"}
                    className={classes.margin}
                    name="type"
                    placeholder={"Type"}
                    disabled
                    type="text"
                    variant="filled"
                    value={wineDetails.type}
                />
            </div>
            <div className="form-group">
                <CssTextField
                    label={"Region"}
                    className={classes.margin}
                    name="region"
                    placeholder={"Region"}
                    disabled
                    type="text"
                    variant="filled"
                    value={wineDetails.region}
                />
            </div>
            <div className="form-group">
                <CssTextField
                    label={"Section"}
                    className={classes.margin}
                    name="section"
                    placeholder={"Section"}
                    disabled
                    type="text"
                    variant="filled"
                    value={wineDetails.section}
                />
            </div>
            <div className="form-group">
                <CssTextField
                    label={"Division"}
                    className={classes.margin}
                    name="division"
                    placeholder={"Division"}
                    disabled
                    type="text"
                    variant="filled"
                    value={wineDetails.division}
                />
            </div>
        </>
    );
}



export default (DetailsWineForm)