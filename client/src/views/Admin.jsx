import { Grid } from '@mui/material';
import React from 'react';
import AddCard from '../components/AddCard';
import Navbar from '../components/Navbar';
import SideSearch from '../components/SideSearch';

const Admin = () => {
    return (
        <>
            <Navbar page='Admin' />
            <Grid container spacing={4} padding={2}>
                <Grid item xs={6} sm={4} md={3}>
                    <SideSearch />
                </Grid>
                <Grid item xs={6} sm={8} md={9}>
                    <AddCard firstName='Trevor' lastName='Engen' />
                </Grid>
            </Grid>
        </>
    )
}

export default Admin;