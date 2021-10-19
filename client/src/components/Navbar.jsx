import { AppBar, Toolbar, Typography, Link } from '@mui/material';
import React, { useEffect, useState } from 'react';

const Navbar = (props) => {

    const [date, setDate] = useState(new Date().toLocaleDateString('en-US'));

    const handleLogout = (e) => {
        e.preventDefault();
        // TODO add logout functionality.
    }

    const addWorkplan = (e) => {
        e.preventDefault();
        // TODO add workplan functionality.
    }

    switch (props.page) {
        case ('LoginReg'):
            return (
                <AppBar position='static'>
                    <Toolbar>
                        <Typography variant='h4'>Instawork</Typography>
                    </Toolbar>
                </AppBar>
            )
        case ('Supervisor'):
            return (
                <AppBar position='static'>
                    <Toolbar>
                        <Typography variant='h4'>Instawork</Typography>
                        <Typography variant='h6' style={{marginLeft: 'auto', marginRight: '20px'}}>{date}</Typography>
                        <Typography variant='h6'>Orgname Placeholder</Typography>
                        <Link variant='h6' style={{marginLeft: 'auto', marginRight: '20px', cursor: 'pointer'}} color='inherit' onClick={addWorkplan}>Add Workplan</Link>
                        <Link style={{cursor: 'pointer'}} variant='h6' onClick={handleLogout} color='inherit'>Logout</Link>
                    </Toolbar>
                </AppBar>
            )
        case ('Admin'):
            return (
                <AppBar position='static'>
                    <Toolbar>
                        <Typography variant='h4' style={{marginRight: '170px'}}>Instawork</Typography>
                        <Typography variant='h6' marginX={'auto'}>Admin</Typography>
                        <Link style={{cursor: 'pointer', marginLeft: 'auto'}} variant='h6' onClick={handleLogout} color='inherit'>Logout</Link>
                    </Toolbar>
                </AppBar>
            )
        default:
            return (<></>)
    }

}

export default Navbar;