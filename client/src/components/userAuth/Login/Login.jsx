import React, { useState } from 'react';
import { Avatar, Button, CssBaseline, TextField, FormControlLabel, Paper, Checkbox, Link, Grid, Box, Typography, Container } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { Link as RouterLink } from 'react-router-dom';
import useStyles from './styles';
import Copyright from '../../Copyright/Copyright';
import Axios from 'axios';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';


const Login = ({ setFireEmail, setFirePassword, handleLogin, emailError,passwordError }) => {
    
    const  classes = useStyles();

    const [loginStatus, setLoginStatus] = useState('');

    const initialValues = {
        email: '',
        password: '',
        remember: false 
    }

    const validationSchema = Yup.object().shape({
        email: Yup.string().email('Please enter a valid email').required('Required'),
        password: Yup.string().required('Required')
    })

    const handleSubmit = (values, props) => {
        console.log(values)
        setTimeout(() => {
            props.resetForm()
            props.setSubmitting(false)
        },2000)

        
        Axios.post("http://localhost:3001/login", {
            email: values.email,
            password: values.password
        }).then((response) => {
            if (response.data.message){
                setLoginStatus(response.data.message)
            } else {
                setLoginStatus(response.data[0].firstName)
            }
        })

        setFireEmail(values.email);
        setFirePassword(values.password); 

    }

    return (
        <>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Paper className={classes.paper} elevation={10}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h4">
                        Sign in
                    </Typography>
                    
                    <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={validationSchema}>
                        {(props) => (
                            <Form autoComplete="off">
                                <Field 
                                    as={TextField}
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    placeholder="Enter Email"
                                    name="email"
                                    autoComplete="email"
                                    autoFocus
                                    helperText={<ErrorMessage name="email" />}
                                />
                                <p className="errorMsg">{emailError}</p>
                                <Field
                                    as={TextField}
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    placeholder="Enter Password"
                                    type="password"
                                    id="password"
                                    autoComplete="current-password"
                                    helperText={<ErrorMessage name="password" />}
                                />
                                <p className="errorMsg">{passwordError}</p>
                                <Field
                                    as={FormControlLabel} 
                                    name="remember"
                                    label="Remember me"
                                    control={<Checkbox value="remember" color="primary" />}
                                />
                                
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    className={classes.submit}
                                    disabled={props.isSubmitting}
                                    onClick={handleLogin}
                                >
                                    {props.isSubmitting? "Loading" : "Sign In" }  
                                </Button>
                                        
                                <Grid container>
                                    <Grid item>
                                        <Link href="#" variant="body2">
                                            {`Forgot password ? `}
                                        </Link>
                                    </Grid>
                                    <Grid item xs>
                                        <Link component={RouterLink} to="/signup" variant="body2">
                                            {"Don't have an account? Sign Up"}
                                        </Link>
                                    </Grid>                        
                                </Grid>
                            </Form>
                        )}
                    </Formik>
                </Paper>
                <Box mt={8}>
                    <Copyright />
                </Box>
            </Container>

            <h1>{loginStatus}</h1>
        </>
    )
}

export default Login

