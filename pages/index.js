import React, {useEffect, useState} from 'react';
import Head from "next/head";
import { makeStyles } from '@material-ui/core/styles';
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { connect } from 'react-redux';
import { loginScreen, success, error } from '../redux/actions/buttonActions';
import { register } from "../redux/actions/registerActons";
import { login } from "../redux/actions/loginActions";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import Router from 'next/router';
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import {Visibility, VisibilityOff} from "@material-ui/icons";

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        marginTop: 80
    },
    secondary: {
        color: theme.palette.secondary.main
    },
    primary: {
        color: theme.palette.primary.main,
        fontWeight: 'bold'
    },
    inputLine: {
        marginTop: 30
    },
    icons: {
        color: theme.palette.primary.main,
        fontSize: 50,
    },
    text: {
        color: theme.palette.text.main,
        marginTop: 50
    },
    button: {
        marginBottom: 120,
        color: theme.palette.primary.main,
        textDecoration: "underline",
        fontWeight: 'bold'
    },
    submitButton: {
        marginTop: 30,
        color: theme.palette.secondary.main,
        fontWeight: 'bold'
    },
    textField: {
        flexBasis: 200,
        width: '100%'
    },
}));

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function Index(props) {
    const classes = useStyles();

    let new_username;
    let new_password;
    let log_username;
    let log_password;

    const [showPassword, setShowPassword] = React.useState(false);

    useEffect( () => {
        if (props.state.registered.registered.status === 200){
            props.success();
            props.loginScreen();
        }
        else if (props.state.registered.registered.status === 400){
            props.error();
        }
    }, [props.state.registered.registered.status])

    useEffect( () => {
        if (props.state.logged.logged.status === 200){
            props.success();
            Router.push('/Contacts');
        }
        else if (props.state.logged.logged.status === 400){
            props.error();
        }
    }, [props.state.logged.logged.status])

    const handleRegister = e => {
        e.preventDefault();
        let username = new_username.value;
        let password = new_password.value;

        const new_user = { username, password };
        props.register(new_user);
    };

    const handleLogin = e => {
        e.preventDefault();
        let username = log_username.value;
        let password = log_password.value;

        const user = { username, password };
        props.login(user);
    };

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <React.Fragment>
            <Head>
                <title>Contacts App</title>
                <meta
                    name="description"
                    content="Contacts Management application developed with React, Next.js & Material-UI"
                />
            </Head>
            <Container
                maxWidth="md"
                className={ classes.root }
            >
                <Box
                    display="flex"
                    flexDirection="row"
                    p={1}
                    style={{ justifyContent: 'center' }}
                >
                    {
                        props.button &&
                        <Grid item>
                            <Typography className={classes.secondary}>
                                Don't have an Account?
                            </Typography>
                            <Typography
                                variant={'h4'}
                                className={classes.primary}
                            >
                                Register Now:
                            </Typography>
                            <Grid className={classes.inputLine}>
                                <AccountCircleIcon className={classes.icons}/>
                                <TextField
                                    id="username"
                                    label="username"
                                    variant="outlined"
                                    type={"username"}
                                    style={{width: '100%'}}
                                    inputRef={ref => {
                                        new_username = ref;
                                    }}
                                />
                            </Grid>
                            <Grid className={classes.inputLine}>
                                <VpnKeyIcon className={classes.icons}/>
                                <TextField
                                    id="adornment-password"
                                    className={classes.textField}
                                    variant="outlined"
                                    type={showPassword ? 'text' : 'password'}
                                    label="Password"
                                    inputRef={ref => {
                                        new_password = ref;
                                    }}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="Toggle password visibility"
                                                    onClick={handleClickShowPassword}
                                                >
                                                    {!showPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </Grid>
                            <Button
                                disableRipple
                                className={ classes.submitButton }
                                variant={ "outlined" }
                                onClick={handleRegister}
                            >
                                Register
                            </Button>
                            <Typography className={classes.text}>
                                Already own an Account?
                            </Typography>
                            <Button
                                disableRipple
                                className={ classes.button }
                                onClick={ props.loginScreen }
                            >
                                LogIn
                            </Button>
                        </Grid>
                    }
                    {
                        !props.button &&
                        <Grid item>
                            <Typography className={classes.secondary}>
                                Already own an Account?
                            </Typography>
                            <Typography
                                variant={'h4'}
                                className={classes.primary}
                            >
                                LogIn Now:
                            </Typography>
                            <Grid className={classes.inputLine}>
                                <AccountCircleIcon className={classes.icons}/>
                                <TextField
                                    id="username"
                                    label="username"
                                    variant="outlined"
                                    type={"username"}
                                    style={{width: '100%'}}
                                    inputRef={ref => {
                                        log_username = ref;
                                    }}
                                />
                            </Grid>
                            <Grid className={classes.inputLine}>
                                <VpnKeyIcon className={classes.icons}/>
                                <TextField
                                    id="adornment-password"
                                    className={classes.textField}
                                    variant="outlined"
                                    type={showPassword ? 'text' : 'password'}
                                    label="password"
                                    inputRef={ref => {
                                        log_password = ref;
                                    }}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="Toggle password visibility"
                                                    onClick={handleClickShowPassword}
                                                >
                                                    {!showPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </Grid>
                            <Button
                                disableRipple
                                className={ classes.submitButton }
                                variant={ "outlined" }
                                onClick={handleLogin}
                            >
                                LogIn
                            </Button>
                            <Typography className={classes.text}>
                                Don't have an Account?
                            </Typography>
                            <Button
                                disableRipple
                                className={ classes.button }
                                onClick={ props.loginScreen }
                            >
                                Register
                            </Button>
                        </Grid>
                    }
                    <Snackbar open={props.stats} autoHideDuration={2000} onClose={props.success}>
                        <Alert onClose={props.success} severity="success">
                            SUCCESSFUL
                        </Alert>
                    </Snackbar>
                    <Snackbar open={props.err} autoHideDuration={2000} onClose={props.error}>
                        <Alert onClose={props.error} severity="error">
                            ERROR: INCOMPLETE OR ERRONEOUS DATA
                        </Alert>
                    </Snackbar>
                </Box>
            </Container>
        </React.Fragment>
    );
}

const mapStateToProps = state => ({
    button: state.button.value,
    stats: state.button.stats,
    err: state.button.err,
    state
});

const mapDispatchToProps = {
    loginScreen: loginScreen,
    success: success,
    error: error,
    register: register,
    login: login
};

Index.getInitialProps = async ({ store }) => {
    await store.dispatch(register());
    await store.dispatch(login());
    return { custom: 'custom' };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
    )(Index);