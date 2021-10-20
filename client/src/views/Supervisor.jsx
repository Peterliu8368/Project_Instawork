import React from 'react';
import SideSearch from '../components/SideSearch';
import { Container, Grid } from '@mui/material';
import Navbar from '../components/Navbar';
import PostCards from '../components/PostCards';

const Supervisor = () => {
    return (
        <>
            <Navbar page='Admin' />
            <Grid container padding={2}>
                <Grid item sm={4} xs={6} md={3}>
                    <SideSearch />
                </Grid>
                <Grid item sm={4} xs={6} md={3} mx={4}>
                    <PostCards />
                </Grid>
                
            </Grid>
        </>
    )
}

export default Supervisor;