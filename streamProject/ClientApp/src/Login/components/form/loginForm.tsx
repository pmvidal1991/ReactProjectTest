import React from "react";
import ClipLoader from "react-spinners/ClipLoader";
import { loginFormPropsInterface, loginFormInitialValuesInterface } from "../../LoginInterfaces";
import TextField from '@material-ui/core/TextField'
import
{
    Formik, Form, Field, ErrorMessage,
} from 'formik';
import * as Yup from 'yup';
import
{
    fade,
    ThemeProvider,
    withStyles,
    makeStyles,
    createMuiTheme,
} from '@material-ui/core/styles';

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

const LoginForm: React.FC<loginFormPropsInterface> = (props) =>
{
    const { onSubmit, loading } = props;
    const classes = useStyles();
    return (
        <Formik
            initialValues={{ username: '', password: '' } as loginFormInitialValuesInterface}
            onSubmit={onSubmit}

            validationSchema={Yup.object().shape({
                username: Yup.string()
                    .required('Required'),
                password: Yup.string()
                    .required('Required')
            })}
        >
            {(props) =>
            {
                const {
                    values,
                    touched,
                    errors,
                    dirty,
                    isSubmitting,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    handleReset,
                } = props;
                return (
                    <form onSubmit={handleSubmit} style={{ marginTop: '5%' }}>

                        <div className="form-group">
                            <CssTextField
                                label={"Username"}
                                className={classes.margin}
                                name="username"
                                placeholder={"Username"}
                                variant="outlined"
                                type="text"
                                value={values.username}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={((errors.username && touched.username) && errors.username) as boolean}
                                helperText={(errors.username && touched.username) && errors.username}
                            />
                        </div>
                        <div className="form-group">
                            <CssTextField
                                label={"Password"}
                                className={classes.margin}
                                name="password"
                                placeholder={"Password"}
                                type="password"
                                variant="outlined"
                                value={values.password}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={((errors.password && touched.password) && errors.password) as boolean}
                                helperText={(errors.password && touched.password) && errors.password}
                            />
                        </div>
                        <div className="form-group">
                            <button type="submit" id="LogginButton" className='btn btn-primary' disabled={isSubmitting}>
                                Sign in
                </button>
                        </div>
                        <div className="form-group" style={{ marginTop: "5%" }}>
                            <ClipLoader color={"#9F1D41"} loading={loading} size={100} />
                        </div>
                    </form>
                );
            }}
        </Formik>
    );
}

export default (LoginForm)