import { AppBar, Toolbar, Typography, Link } from '@mui/material';
import React, { useEffect, useState } from 'react';
import {ReactSession} from 'react-client-session';
import { useHistory } from 'react-router-dom'
import axios from 'axios';
import { useParams } from 'react-router';

const Navbar = (props) => {

    const [date, setDate] = useState(new Date().toLocaleDateString('en-US'));
    const history = useHistory();
    const { orgId } = useParams();

    const handleLogout = (e) => {
        e.preventDefault();
        ReactSession.remove('user');
        axios.get('http://localhost:5000/api/user/logout')  
            .then(history.push('/logreg'))
            .catch(err => console.log(err));
    }

    const adminLink = (e) => {
        e.preventDefault();
        history.push(`/dashboard/admin/${props.orgId}`);
    }

    const toWelcome = (e) => {
        e.preventDefault();
        history.push('/welcome');
    }

    const goBack = (e) => {
        e.preventDefault();
        history.push(`/dashboard/${orgId}`);
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
                        <Link variant='h6' onClick={toWelcome} style={{marginLeft: 'auto', marginRight: '20px', cursor: 'pointer'}} color='inherit'>{props.orgName}</Link>
                        <Typography variant='h6' style={{marginRight: '20px'}}>{date}</Typography>
                        <Typography variant='h6' style={{marginRight: 'auto'}}>{props.deptName}</Typography>
                        {props.isAdmin ? <Link variant='h6' onClick={adminLink} style={{marginRight: '20px', cursor: 'pointer'}} color='inherit'>Admin</Link> : ''}
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
                        <Link style={{cursor: 'pointer', marginLeft: 'auto'}} variant='h6' onClick={goBack} color='inherit'>Go Back</Link>
                        <Link style={{cursor: 'pointer', marginLeft: '20px'}} variant='h6' onClick={handleLogout} color='inherit'>Logout</Link>
                    </Toolbar>
                </AppBar>
            )
        default:
            return (<></>)
    }

}

export default Navbar;