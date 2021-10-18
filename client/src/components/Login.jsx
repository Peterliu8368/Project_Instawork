import React from 'react';
import { Button, Link, TextField, Grid, Typography } from '@mui/material';
import { useState } from 'react';
import e from 'express';

const Login = (props) => {

    const [LoginInfo, setLoginInfo] = useState({
        email: '',
        password: '',
    });

    const handleChange = (event) => {
        var tempInfo = {...LoginInfo};
        tempInfo[event.target.id] = event.target.value;
        setLoginInfo(tempInfo);
    }

    const switchView = (e) => {
        e.preventDefault();
        props.setIsReg(true);
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
                    value={LoginInfo.email}
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
                    value={LoginInfo.password}
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
                <Button variant='contained'>Login</Button>
            </Grid>
        </Grid>
    )
}

export default Login;