
import { useState, useEffect } from 'react';
import { useHistory, Redirect, Link } from 'react-router-dom'
import { Container, Grid, Card, Paper, Typography, Button} from '@mui/material';
import axios from 'axios';
import {UserContext} from '../App';
import React, {useContext} from 'react';
import {ReactSession} from 'react-client-session';

const Welcome = () => {
    const {state, dispatch} = useContext(UserContext);
    const history = useHistory();
    const [userOrgs, setUserOrgs] = useState([]);
    
    useEffect(() => {
        const user = JSON.parse(ReactSession.get("user"))
        if (user) {
            dispatch({type: "USER", payload: user});
            console.log(state);
        } else {
            history.push("/logReg")
        }
        axios.post('http://localhost:5000/api/user/', { userId: user.userId })
            .then(res => setUserOrgs(res.data.organizations))
            .catch(err => console.log(err));
    }, [])

    return (
        <>
            <Paper style={{margin: "20px auto", width: "80vw", height: "80vh", padding: "20px"}}  elevation={3}>
                    <Typography style={{textAlign: 'center', marginTop: '20px'}} variant='h3'>Welcome {state.firstName}</Typography>
                    {state.organizations.length == 0 ? 
                    (
                        <>
                            <p style={{textAlign: 'center'}}>You don't have any organization. Please create or apply to one.</p>
                        </>
                    ) 
                    : 
                    (<ul>
                        <p>Here is the list of your organizations: </p>

                        {userOrgs.map((org) => {
                            return <li key={org.orgId}><Link to={`/dashboard/${org.orgId._id}`}>{org.orgId.name}</Link></li>
                        })}
                    </ul>)}
                    <Link to="/organization/create">Create org</Link>
                    <Link to="/organization/apply">Apply to an Organization</Link>
            </Paper>
        </>
    )
}

export default Welcome;