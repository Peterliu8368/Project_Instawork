import React, { useContext } from 'react';
import { Button, Link, TextField, Grid, Typography } from '@mui/material';
import { useState } from 'react';
import { useHistory } from 'react-router-dom'
import {UserContext} from '../App'
import {ReactSession} from 'react-client-session'

import axios from 'axios';

const Login = (props) => {
    const {state, dispatch} = useContext(UserContext);
    const history = useHistory();

    const [loginInfo, setloginInfo] = useState({
        email: '',
        password: '',
    });
    const [error, setError] = useState('');

    const handleChange = (event) => {
        var tempInfo = {...loginInfo};
        tempInfo[event.target.id] = event.target.value;
        setloginInfo(tempInfo);
        setError('');
    }

    const switchView = (e) => {
        e.preventDefault();
        props.setIsReg(true);
    }


    const handleLogin = (e) => {
        e.preventDefault();
        axios.post('http://localhost:5000/api/user/login', loginInfo)
            .then(res => {
                ReactSession.set("user", JSON.stringify(res.data))
                // localStorage.setItem("user", JSON.stringify(res.data))
                dispatch({type: "USER", payload: res.data});
                console.log(res.data);
                history.push('/welcome');
            })
            .catch(err => {
                setError(err.response.data);
                console.log(err.response.data);
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

                    error={error !== '' ? true : false}

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

                    error={error !== '' ? true : false}
                    helperText={error !== '' ? error : ''}

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