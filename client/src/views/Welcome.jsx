
import { useState } from 'react';
import { useHistory } from 'react-router-dom'
import { Container, Grid, Card, Paper, Typography } from '@mui/material';
import axios from 'axios';
import {UserContext} from '../App';
import React, {useContext} from 'react';

const Welcome = () => {

    const {state, dispatch} = useContext(UserContext);

    return (
        <>
            <Paper style={{margin: "20px auto", width: "80vw", height: "80vh", padding: "20px"}}  elevation={3}>
                    <Typography style={{textAlign: 'center', marginTop: '20px'}} variant='h3'>Welcome {state.firstName}</Typography>

            </Paper>
        </>
    )
}

export default Welcome;