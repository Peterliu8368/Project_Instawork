import React from 'react';
import { useState } from 'react';
import { useHistory } from 'react-router-dom'
import { Container, Grid, Card, Paper, Typography } from '@mui/material';
import axios from 'axios';

const Welcome = () => {

    return (
        <>
            <Paper style={{margin: "20px auto", width: "80vw", height: "80vh", padding: "20px"}}  elevation={3}>
                    <Typography style={{textAlign: 'center', marginTop: '20px'}} variant='h3'>Welcome (Add username)</Typography>

            </Paper>
        </>
    )
}

export default Welcome;