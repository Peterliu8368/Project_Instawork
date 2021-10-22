
import { useState, useEffect } from 'react';
import { useHistory, Redirect, Link } from 'react-router-dom'
import { Container, Grid, Card, Paper, Typography, Button} from '@mui/material';
import axios from 'axios';
import {UserContext} from '../App';
import React, {useContext} from 'react';
import {ReactSession} from 'react-client-session';

const Welcome = (props) => {
    const {state, dispatch} = useContext(UserContext);
    const history = useHistory();
    const user = JSON.parse(ReactSession.get("user"));

    
    useEffect(() => {
        console.log("this is from session!"+ user.userId)
        if (user) {
            dispatch({type: "USER", payload: user});
        } else {
            history.push("/logReg")
        }
    }, [])

    return (
        <>
            <Paper style={{margin: "20px auto", width: "80vw", height: "80vh", padding: "20px"}}  elevation={3}>
                <Typography style={{textAlign: 'center', marginTop: '20px'}} variant='h3'>Welcome {state.firstName}</Typography>
                        {state.organizations.length == 0 ? 
                        (
                            <>
                                <p style={{textAlign: 'center'}}>You don't have any organization. Please create or apply to one.</p>
                                <Link to="/organization/create">Create org</Link>
                                <Link to="/organization/apply">Apply to an Organization</Link>
                            </>
                        ) 
                        : 
                        (<ul>
                            <p>Here is the list of your organizations: </p>
                            {state.organizations.map((org) => {
                                return <li key={org.orgId}><Link to={`/dashboard/${org.orgId._id}`}>{org.orgId.name}</Link></li>
                            })}
                            <Link to="/organization/create">Create org</Link>
                            <Link to="/organization/apply">Apply to an Organization</Link>
                        </ul>)}
            </Paper>
        </>
    )
}

export default Welcome;