import React from 'react';

import axios from 'axios';

import { Button, Link, TextField, Grid, Typography } from '@mui/material';
import { useState } from 'react';
import { useHistory } from 'react-router-dom'


const Register = (props) => {

    const [registerInfo, setRegisterInfo] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const [error, setError] = useState({
        firstName: { message: '' },
        lastName: { message: '' },
        email: { message: '' },
        password: { message: '' },
        confirmPassword: { message: '' },
    });


    const handleChange = (event) => {
        var tempInfo = {...registerInfo};
        tempInfo[event.target.id] = event.target.value;
        setRegisterInfo(tempInfo);

        var temp = { };
        temp[event.target.id] = { message: '' };
        var newError = {...error, ...temp}
        setError(newError);
        console.log(error);

    }

    const switchView = (e) => {
        e.preventDefault();
        props.setIsReg(false);
    }


    const handleReg = (e) => {
        e.preventDefault();
        axios.post('http://localhost:5000/api/user/register', registerInfo)
            .then(res => {
                props.setIsReg(false);
                console.log(res);
            })
            .catch(err => {
                console.log(err.response.data.error.errors);
                const newError = {...error, ...err.response.data.error.errors};
                setError(newError);
            });
        
    }


    return (
        <Grid 
        container 
        spacing={2}
        >
            <Grid item xs={12}>
                <Typography variant='h3'>Register</Typography>
            </Grid>
            <Grid item xs={6}>
                <TextField 
                    id='firstName'
                    label='First Name'
                    value={registerInfo.firstName}
                    onChange={handleChange}
                    fullWidth
                    variant='filled'

                    error={error.firstName.message !== '' ? true : false}
                    helperText={error.firstName.message}

                />
            </Grid>
            <Grid item xs={6}>
                <TextField 
                    id='lastName'
                    label='Last Name'
                    value={registerInfo.lastName}
                    onChange={handleChange}
                    fullWidth
                    variant='filled'

                    error={error.lastName.message !== '' ? true : false}
                    helperText={error.lastName.message}

                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    id='email'
                    label='Email'
                    value={registerInfo.email}
                    onChange={handleChange}

                    fullWidth
                    variant='filled'
                    error={error.email.message !== '' ? true : false}
                    helperText={error.email.message}

                />
            </Grid>
            <Grid item xs={6}>
                <TextField 
                    id='password'
                    label='Password'
                    value={registerInfo.password}
                    onChange={handleChange}
                    type='password'
                    fullWidth
                    variant='filled'

                    error={error.password.message !== '' ? true : false}
                    helperText={error.password.message}

                />
            </Grid>
            <Grid item xs={6}>
                <TextField 
                    id='confirmPassword'
                    label='Confirm Password'
                    value={registerInfo.confirmPassword}
                    onChange={handleChange}
                    type='password'
                    fullWidth
                    variant='filled'

                    error={error.confirmPassword.message !== '' || error.password.message !== '' ? true : false}
                    helperText={error.confirmPassword.message}

                />
            </Grid>
            <Grid item xs={12}>
                <Link onClick={switchView} style={{cursor: 'pointer'}}>Have an account?</Link>
            </Grid>
            <Grid item xs={12}>

                <Button onClick={e => handleReg(e)} variant='contained'>Sign Up</Button>

            </Grid>
        </Grid>
    )
}

export default Register;