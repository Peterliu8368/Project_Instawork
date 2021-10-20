import React from 'react';
import SideSearch from '../components/SideSearch';
import { Container, Grid } from '@mui/material';
import Navbar from '../components/Navbar';

const Supervisor = () => {
    return (
        <>
            <Navbar page='Admin' />
            <Grid container padding={2}>
                <Grid item sm={4} xs={6} md={3}>
                    <SideSearch />
                </Grid>
            </Grid>
        </>
    )
}

export default Supervisor;