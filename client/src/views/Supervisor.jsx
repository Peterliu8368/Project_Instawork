import React from 'react';
import { Link, useHistory, useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import SideSearch from '../components/SideSearch';
import { Container, Grid } from '@mui/material';
import Navbar from '../components/Navbar';
import PostCards from '../components/PostCards';
import AllDepartments from '../components/AllDepartments';
import { UserContext } from '../App';
import {ReactSession} from 'react-client-session';

const Supervisor = () => {
    const {state, dispatch} = useContext(UserContext);
    const history = useHistory();
    const [count, setCount] = useState(0);
    const user = JSON.parse(ReactSession.get("user"))
    
    useEffect(() => {
        if (user) {
            dispatch({type: "USER", payload: user});
        } else {
            history.push("/logReg")
        }
    }, []);
    
    return (
        <>
            <Navbar page='Admin' />
            <Grid container padding={2}>
                <Grid item sm={4} xs={6} md={3}>
                    <SideSearch />
                </Grid>
                <Grid item sm={4} xs={6} md={3} mx={4}>
                    <PostCards count={count} setCount={setCount} />
                </Grid>
                <Grid item sm={4} xs={6} md={3} mx={4}>
                    <AllDepartments count={count} setCount={setCount} />
                </Grid>
            </Grid>
        </>
    )
}

export default Supervisor;