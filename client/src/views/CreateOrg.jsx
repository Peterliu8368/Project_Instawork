import { useState, useEffect } from 'react';
import { useHistory, Redirect, Link } from 'react-router-dom'
import { Container, TextField, Grid, Card, Paper, Typography, Button} from '@mui/material';
import axios from 'axios';
import {UserContext} from '../App';
import React, {useContext} from 'react';
import {ReactSession} from 'react-client-session';

const CreateOrg = () => {
    const {state, dispatch} = useContext(UserContext);
    const history = useHistory();
    const [orgName, setOrgName] = useState("");
    const [orgDescription, setOrgDescription] = useState("");
    // const [orgDept, setOrgDept] = useState([]);
    // const [admin, setAdmin] = useState([]);
    const user = JSON.parse(ReactSession.get("user"));
    const [error, setError] = useState({
        orgName: { message: '' },
        orgDescription: { message: '' },
    });

    useEffect(() => {
        console.log("this is from session!"+ user.userId)
        if (user) {
            dispatch({type: "USER", payload: user});
        } else {
            history.push("/logReg")
        }
    }, [])
    
    const handleOrgName = (e) => {
        e.preventDefault();
        setOrgName(e.target.value);
    }

    const handleOrgDescription = (e) => {
        e.preventDefault();
        setOrgDescription(e.target.value);
    }


    const handleSubmit = (e) => {
        axios.post("http://localhost:5000/api/organization/create", {
            newOrg: {name: orgName, description: orgDescription}, 
            userId: user.userId
        })
        .then(res => {
            console.log(res);
            history.push('/welcome');
        })
        .catch(err => {
            console.log(err.res);
        });
        console.log(orgName);
        console.log(orgDescription);
    }

    return (
        <div>
            <form>
                <Card container spacing={5}>
                    <Grid item xs={6}>
                        <Typography variant='h3'>Create Organization</Typography>
                    </Grid>
                    <Grid item xs={6}>
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
                    <Grid item xs={6}>
                        <TextField 
                            id='orgDescription'
                            label='Description'
                            value={orgDescription}
                            onChange={handleOrgDescription}
                            type='text'
                            fullWidth
                            variant='filled'
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Link to="/welcome" style={{cursor: 'pointer'}}>Welcome Page</Link>
                    </Grid>
                    <Grid item xs={12}>
                        <Button onClick={e => handleSubmit(e)} variant='contained'>Create</Button>
                    </Grid>
                </Card>
            </form>
        </div>
    )
}
export default CreateOrg;