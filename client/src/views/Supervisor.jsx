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
import axios from 'axios';

const Supervisor = () => {
    const {state, dispatch} = useContext(UserContext);
    const history = useHistory();
    const [count, setCount] = useState(0);
    const user = JSON.parse(ReactSession.get("user"))
    const { orgId, deptId } = useParams();
    const [orgName, setOrgName] = useState('');
    const [deptName, setDeptName] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);
    const [empList, setEmpList] = useState({ emp: [], man: [] })
    const [showOne, setShowOne] = useState('');
    
    useEffect(() => {
        if (user) {
            dispatch({type: "USER", payload: user});
            axios.get(`http://localhost:5000/api/organization/${orgId}`)
                .then(name => {
                    if (name.data.admins.includes(user.userId)) {
                        setIsAdmin(true);
                    }
                    setOrgName(name.data.name)
                })
                .catch(err => console.log(err.response));

            axios.get(`http://localhost:5000/api/department/${deptId}`)
                .then(name => setDeptName(name.data.name))
                .catch(err => console.log(err.response));
        } else {
            history.push("/logReg")
        }
    }, [count]);
    
    return (
        <>
            <Navbar page='Supervisor' orgName={orgName} deptName={deptName} isAdmin={isAdmin} orgId={orgId} />
            <Grid container padding={2} spacing={4}>
                <Grid item xs={3}>
                    <SideSearch empList={empList} setEmpList={setEmpList} showOne={showOne} setShowOne={setShowOne} />
                </Grid>
                <Grid item xs={6}>
                    <PostCards count={count} setCount={setCount} empList={empList} setEmpList={setEmpList} showOne={showOne} setShowOne={setShowOne} />
                </Grid>
                <Grid item xs={3}>
                    <AllDepartments count={count} setCount={setCount} />
                </Grid>
            </Grid>
        </>
    )
}

export default Supervisor;