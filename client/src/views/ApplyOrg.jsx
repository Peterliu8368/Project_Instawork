import { useState, useEffect } from 'react';
import { useHistory, Redirect, Link } from 'react-router-dom'
import { Container, TextField, Grid, Card, Paper, Typography, Button} from '@mui/material';
import axios from 'axios';
import {UserContext} from '../App';
import React, {useContext} from 'react';
import {ReactSession} from 'react-client-session';

const ApplyOrg = () => {
    const {state, dispatch} = useContext(UserContext);
    const history = useHistory();
    const [orgId, setOrgId] = useState("");
    const [orgName, setOrgName] = useState("");
    const user = JSON.parse(ReactSession.get("user"));

    useEffect(() => {
        console.log("this is from session!"+ user.userId)
        if (user) {
            dispatch({type: "USER", payload: user});
        } else {
            history.push("/logReg")
        }
    }, [])

    const handleOrgId = (e) => {
        e.preventDefault();
        setOrgId(e.target.value);
    }

    const handleOrgName = (e) => {
        e.preventDefault();
        setOrgName(e.target.value);
    }

    const handleSubmit = (e) => {
        history.push("/welcome");
    }

    return (
        <div>
            <Paper sx={{flexGrow: 1, width: '50ch', marginX: 'auto', marginTop: '20ch', padding: '30px'}} elevation={3}>
                <form>
                    <Card container spacing={5}>
                        <Grid item xs={12}>
                            <Typography variant='h3'>Apply to An Organization</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField 
                                id='orgId'
                                label='Id'
                                value={orgId}
                                onChange={handleOrgId}
                                type='text'
                                fullWidth
                                variant='filled'
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                id='orgName'
                                label='Organization Name: '
                                value={orgName}
                                onChange={handleOrgName}
                                type='text'
                                fullWidth
                                variant='filled'
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Link to="/welcome" style={{cursor: 'pointer'}}>Welcome Page</Link>
                        </Grid>
                        <Grid item xs={12}>
                            <Button onClick={e => handleSubmit(e)} variant='contained'>Apply</Button>
                        </Grid>
                    </Card>
                </form>
            </Paper>
        </div>
    )
}

export default ApplyOrg;