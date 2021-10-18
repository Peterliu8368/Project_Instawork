import React from 'react';
import { Button, Link, TextField, Grid, Typography } from '@mui/material';
import { useState } from 'react';
import axios from 'axios';

const Login = (props) => {

    const [loginInfo, setloginInfo] = useState({
        email: '',
        password: '',
    });
    const [error, setError] = useState('');

    const handleChange = (event) => {
        var tempInfo = {...loginInfo};
        tempInfo[event.target.id] = event.target.value;
        setloginInfo(tempInfo);
    }

    const switchView = (e) => {
        e.preventDefault();
        props.setIsReg(true);
    }

    const handleLogin = (e) => {
        e.preventDefault();
        axios.post('http://localhost:5000/api/user/login', loginInfo)
            .then(res => {
                console.log(res);
            })
            .catch(err => {
                setError(err);
                console.log(err);
            })
    }

    return (
        <Grid 
        container 
        spacing={2}
        >
            <Grid item xs={12}>
                <Typography variant='h3'>Login</Typography>
            </Grid>
            <Grid item xs={12}>
                <TextField
                    id='email'
                    label='Email'
                    value={loginInfo.email}
                    onChange={handleChange}
                    type='email'
                    fullWidth
                    variant='filled'
                />
            </Grid>
            <Grid item xs={12}>
                <TextField 
                    id='password'
                    label='Password'
                    value={loginInfo.password}
                    onChange={handleChange}
                    type='password'
                    fullWidth
                    variant='filled'
                />
            </Grid>
            <Grid item xs={12}>
                <Link onClick={switchView} style={{cursor: 'pointer'}}>Need an account?</Link>
            </Grid>
            <Grid item xs={12}>
                <Button onClick={e => handleLogin(e)} variant='contained'>Login</Button>
            </Grid>
        </Grid>
    )
}

export default Login;