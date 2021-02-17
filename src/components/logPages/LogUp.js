import React from 'react'
import { makeStyles, useTheme } from "@material-ui/core/styles";
import CardMedia from '@material-ui/core/CardMedia';
import Hidden from '@material-ui/core/Hidden';
import { Formik, Form, Field } from 'formik';
import Box from '@material-ui/core/Box';
import MuiTextField from '@material-ui/core/TextField';
import {
    fieldToTextField,
    TextFieldProps,
} from 'formik-material-ui';
import { IconButton, Typography, Button, createMuiTheme, ThemeProvider, Paper } from '@material-ui/core';
import ArrowBackIosRoundedIcon from '@material-ui/icons/ArrowBackIosRounded';
import { withRouter } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    logInCont: {
        position: 'fixed',
        zIndex: '2000',
        width: '100vw',
        height: '100vh',
        transform: 'translateY(-65px)', 
    },
    cover: {
        position: 'fixed',
        zIndex: '2000',
        width: '45%',
        height: '100%',
    },
    InputCont: {
        position: 'fixed',
        right: '0',
        width: '55%',
        height: '100%',
        zIndex: '2000',
        [theme.breakpoints.down("sm")]: {
            width: '100%',
        }
    },
    BackToHome: {
        margin: '15px 15px',
        fontSize: '1.2rem',
    },
    SignInTitle: {
        fontSize: "2.5rem",
        marginLeft: '10%',
    },
    LogInWith: {
        width: "70%",
        boxSizing: 'border-box',
        margin: '10px 100px',
        marginLeft: '10%',
        padding: "10px",
        fontSize: '1.2rem',
    },
    LogInInput: {
        width: "72%",
        margin: '5px 80px',
        marginLeft: '7.5%',
    },
    LogIn: {
        width: "70%",
        margin: '10px 100px',
        marginLeft: '8.5%',
        padding: "5px",
        fontSize: '1rem',
    },
    DontHaveAccount: {
        fontSize: "0.9rem",
        marginLeft: '10%',
        cursor: 'default',
    },
    logUpButton: {
        textTransform: 'none',
        fontSize: '0.9rem',
        marginLeft: '3px',
        color: 'blue',
        transform: 'translatey(-2px)',
    }
}))

interface Values {
    email: string;
}

function UpperCasingTextField(props: TextFieldProps) {
    const {
        form: { setFieldValue },
        field: { name },
    } = props;
    const onChange = React.useCallback(
        (event) => {
            const { value } = event.target;
            setFieldValue(name, value ? value : '');
        },
        [setFieldValue, name]
    );
    return <MuiTextField {...fieldToTextField(props)} onChange={onChange} />;
}

function LogUp(props) {
    const { history } = props
    const classes = useStyles();
    const theme = createMuiTheme({
        palette: {
            type: 'dark',
        }
    })
    return (
        <div className={classes.logInCont} >
            <Hidden only={['sm', 'xs']}>
                <CardMedia
                    className={classes.cover}
                    image="https://images.unsplash.com/photo-1478720568477-152d9b164e26?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
                    title="Live from space album cover"
                />
            </Hidden>
            <ThemeProvider theme={theme}>
                <Paper className={classes.InputCont}>
                    <IconButton className={classes.BackToHome} onClick={() => { history.push('/') }}>
                        <ArrowBackIosRoundedIcon />
                    </IconButton>
                    <Typography variant="h3" className={classes.SignInTitle}>Create new account</Typography>
                    <Formik
                        initialValues={{
                            email: '',
                            password: '',
                            userName: '',
                        }}
                        validate={(values) => {
                            const errors: Partial<Values> = {};
                            if (!values.email) {
                                errors.email = 'Required';
                            } else if (
                                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
                            ) {
                                errors.email = 'Invalid email address';
                            }
                            if (!values.password) {
                                errors.password = 'Required';
                            }
                            if (!values.userName) {
                                errors.userName = 'Required';
                            }
                            return errors;
                        }}
                        onSubmit={(values) => {
                            console.log(values)
                        }}
                        render={({ submitForm, isSubmitting, touched, errors }) => (
                            <Form>
                                <Box margin={1}>
                                    <Field
                                        component={UpperCasingTextField}
                                        variant="outlined"
                                        name="userName"
                                        type="text"
                                        label="User Name"
                                        className={classes.LogInInput}
                                    />
                                </Box>
                                <Box margin={1}>
                                    <Field
                                        component={UpperCasingTextField}
                                        variant="outlined"
                                        name="email"
                                        type="text"
                                        label="Email"
                                        className={classes.LogInInput}
                                    />
                                </Box>
                                <Box margin={1}>
                                    <Field
                                        component={UpperCasingTextField}
                                        variant="outlined"
                                        type="password"
                                        label="Password"
                                        name="password"
                                        className={classes.LogInInput}
                                    />
                                </Box>
                                <Button
                                    variant="contained"
                                    className={classes.LogIn}
                                    type='summit'>Register Now</Button>
                            </Form>
                        )}
                    />
                    <Typography variant="h3" className={classes.DontHaveAccount}>
                        <span>Have an account?</span>
                        <Button
                            onClick={() => { history.push("/logIn") }}
                            className={classes.logUpButton}>
                            Log in
                        </Button>
                    </Typography>
                </Paper>
            </ThemeProvider>
        </div>
    )
}

export default withRouter(LogUp)
