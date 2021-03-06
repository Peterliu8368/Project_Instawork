import React from 'react';
import { Paper } from '@mui/material';
import Register from '../components/Register';
import { useState, useEffect } from 'react';
import Login from '../components/Login';
import Navbar from '../components/Navbar';

const LoginReg = () => {

    const [isReg, setIsReg] = useState(false);

    return (
        <>
            <Navbar page='LoginReg' />
            <Paper sx={{flexGrow: 1, width: '50ch', marginX: 'auto', marginTop: '20ch', padding: '30px'}} elevation={3}>
                {isReg ? <Register setIsReg={setIsReg} /> : <Login setIsReg={setIsReg} />}
            </Paper>
        </>
    )
}

export default LoginReg;