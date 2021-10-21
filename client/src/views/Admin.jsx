import { Grid } from '@mui/material';
import React, { useState } from 'react';
import AddCard from '../components/AddCard';
import Navbar from '../components/Navbar';
import AdminSearch from '../components/AdminSearch';

const Admin = () => {

    const [selectedUserId, setSelectedUserId] = useState('');
    const [count, setCount] = useState(0);

    return (
        <>
            <Navbar page='Admin' />
            <Grid container spacing={4} padding={2}>
                <Grid item xs={6} sm={4} md={3}>
                    <AdminSearch selectedUserId={selectedUserId} setSelectedUserId={setSelectedUserId} />
                </Grid>
                <Grid item xs={6} sm={8} md={9}>
                    <AddCard selectedUserId={selectedUserId} setSelectedUserId={setSelectedUserId} count={count} setCount={setCount} />
                </Grid>
            </Grid>
        </>
    )
}

export default Admin;