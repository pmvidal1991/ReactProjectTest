import React, { useState } from "react";
import IconButton from '@material-ui/core/IconButton';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import TextField from '@material-ui/core/TextField'
import Select from '@material-ui/core/Select'
import { styled } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel'
import { wineBrands, wineTypes, wineRegions, wineSections, wineDivision } from '../../../utils/ComboValues'
import MenuItem from '@material-ui/core/MenuItem';
import {
Formik
} from 'formik';
import * as Yup from 'yup';
import {
withStyles,
makeStyles,
} from '@material-ui/core/styles';
import { AddWineFormInitialValues, AddWineFormPropsInterface } from "../../WineInterfaces";
const CssSelect = withStyles({
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
            minWidth: '600px',
        },
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderColor: 'black',
                color: 'black'
            },


        },
    },
})(Select);
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
    input: {
        display: 'block'
    }
}));

const Input = styled('input')({
    display: 'none',
});
const AddWineForm: React.FC<AddWineFormPropsInterface> = (props) => {
    const { onSubmit, handleSetMyFile } = props;
    const classes = useStyles();
    const [imgName, setImgName] = useState('');
    return (
        <Formik
            initialValues={{ name: '', description: '', brand: '', type: '', region: '', section: '', division: '' } as AddWineFormInitialValues}
            onSubmit={onSubmit}

            validationSchema={Yup.object().shape({
                name: Yup.string()
                    .required('Required'),
                description: Yup.string()
                    .required('Required'),
                brand: Yup.string()
                    .required('Required'),
                type: Yup.string()
                    .required('Required'),
                region: Yup.string()
                    .required('Required'),
                section: Yup.string()
                    .required('Required'),
                division: Yup.string()
                    .required('Required'),
            })}
        >
            {(props) => {
                const {
                    values,
                    touched,
                    errors,
                    isSubmitting,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                } = props;
                const myFileOnchange = (e: any) => {
                    var file = e.target.files[0];
                    handleSetMyFile(file);
                    setImgName(file.name);
                }
                return (
                    <form onSubmit={handleSubmit}>

                        <div className="form-group formInput">
                            <CssTextField
                                label={"Name"}
                                className={classes.margin}
                                name="name"
                                placeholder={"Name"}
                                variant="outlined"
                                type="text"
                                value={values.name}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={((errors.name && touched.name) && errors.name) as boolean}
                                helperText={(errors.name && touched.name) && errors.name}
                            />
                        </div>
                        <div className="form-group formInput">
                            <CssTextField
                                label={"Description"}
                                className={classes.margin}
                                name="description"
                                placeholder={"Description"}
                                type="text"
                                variant="outlined"
                                value={values.description}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={((errors.description && touched.description) && errors.description) as boolean}
                                helperText={(errors.description && touched.description) && errors.description}
                            />
                        </div>
                        <div style={{ marginLeft: '2%' }}>
                            <div className="form-group">
                                <InputLabel htmlFor="color-native-simple" style={{ marginLeft: '30%' }}>Select Brand</InputLabel>
                            </div>
                            <div className="form-group formInput">
                                <CssSelect
                                    value={values.brand}
                                    onChange={handleChange}
                                    style={{ width: 300 }}
                                    name="brand"
                                    placeholder={"Brand"}
                                    onBlur={handleBlur}
                                    inputProps={{ style: { width: 300 } }}
                                    error={((errors.brand && touched.brand) && errors.brand) as boolean}
                                >
                                    <MenuItem value=""> </MenuItem>
                                    {wineBrands.map((item, index) => { return <MenuItem value={item} key={index}> {item} </MenuItem> })}
                                </CssSelect>
                            </div>
                            <div className="form-group">
                                <InputLabel htmlFor="color-native-simple" style={{ marginLeft: '30%' }}>Select Type</InputLabel>
                            </div>
                            <div className="form-group formInput">
                                <CssSelect
                                    value={values.type}
                                    onChange={handleChange}
                                    name="type"
                                    style={{ width: 300 }}
                                    placeholder={"Type"}
                                    inputProps={{ style: { width: 300 } }}
                                    onBlur={handleBlur}
                                    error={((errors.type && touched.type) && errors.type) as boolean}
                                >
                                    <MenuItem value=""> </MenuItem>
                                    {wineTypes.map((item, index) => { return <MenuItem value={item} key={index}> {item} </MenuItem> })}
                                </CssSelect>
                            </div>
                            <div className="form-group">
                                <InputLabel htmlFor="color-native-simple" style={{ marginLeft: '30%' }}>Select Region</InputLabel>
                            </div>
                            <div className="form-group formInput">
                                <CssSelect
                                    value={values.region}
                                    onChange={handleChange}
                                    name="region"
                                    placeholder={"Region"}
                                    style={{ width: 300 }}
                                    inputProps={{ style: { width: 300 } }}
                                    onBlur={handleBlur}
                                    error={((errors.region && touched.region) && errors.region) as boolean}
                                >
                                    <MenuItem value=""> </MenuItem>
                                    {wineRegions.map((item, index) => { return <MenuItem value={item} key={index}> {item} </MenuItem> })}
                                </CssSelect>
                            </div>
                            <div className="form-group">
                                <InputLabel htmlFor="color-native-simple" style={{ marginLeft: '30%' }}>Select Section</InputLabel>
                            </div>
                            <div className="form-group formInput">
                                <CssSelect
                                    value={values.section}
                                    onChange={handleChange}
                                    inputProps={{ style: { width: 300 } }}
                                    name="section"
                                    style={{ width: 300 }}
                                    placeholder={"Section"}
                                    onBlur={handleBlur}
                                    error={((errors.section && touched.section) && errors.section) as boolean}
                                >
                                    <MenuItem value=""> </MenuItem>
                                    {wineSections.map((item, index) => { return <MenuItem value={item} key={index}> {item} </MenuItem> })}
                                </CssSelect>
                            </div>
                            <div className="form-group">
                                <InputLabel htmlFor="color-native-simple" style={{ marginLeft: '30%' }}>Select Division</InputLabel>
                            </div>
                            <div className="form-group formInput">
                                <CssSelect
                                    value={values.division}
                                    inputProps={{ style: { width: 300 } }}
                                    onChange={handleChange}
                                    name="division"
                                    placeholder={"Division"}
                                    style={{ width: 300 }}
                                    onBlur={handleBlur}
                                    error={((errors.division && touched.division) && errors.division) as boolean}
                                >
                                    <MenuItem value=""> </MenuItem>
                                    {wineDivision.map((item, index) => { return <MenuItem value={item} key={index}> {item} </MenuItem> })}
                                </CssSelect>
                            </div>

                            <div className="form-group formInput">
                                <Input accept="image/*" required className={classes.input} id="icon-button-file" name="img"
                                    type="file" onChange={myFileOnchange} />

                                <label htmlFor="icon-button-file">
                                    <IconButton color="primary" aria-label="upload picture" component="span">
                                        <PhotoCamera />
                                    </IconButton>
                                </label>
                                <label style={{ color: 'black' }}>*Required Field</label>
                            </div>
                            <div className="form-group formInput">
                                {imgName !== null && <label style={{ color: 'black', marginTop: '-5%', marginLeft: '4%' }}>{imgName}</label>}
                            </div>
                            <div className="form-group formInput">

                                <button type="submit" id="AddWineButton" className='btn btn-primary' style={{ backgroundColor: 'rgb(159, 29, 65)', width: 100 }} disabled={isSubmitting}>
                                    Add  <AddCircleIcon />
                                </button>

                            </div>
                        </div>
                    </form>
                );
            }}
        </Formik>
    );
}


export default (AddWineForm)