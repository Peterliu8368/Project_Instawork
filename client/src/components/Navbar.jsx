import { AppBar, Toolbar, Typography, Link } from '@mui/material';
import React from 'react';

const Navbar = (props) => {
    return (
        <AppBar position='static'>
            <Toolbar>
                <Typography variant='h4'>Instawork</Typography>
                {props.page !== 'LoginReg' ? <Link variant='h6' style={{marginLeft: 'auto', color: 'white', cursor: 'pointer'}}>Logout</Link> : null }
            </Toolbar>
        </AppBar>
    )
}

export default Navbar;