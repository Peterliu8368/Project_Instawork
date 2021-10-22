
import { useState, useEffect } from 'react';
import { useHistory, Redirect } from 'react-router-dom'
import { Container, Grid, Box, Card, Paper, Typography, Button, gridClasses} from '@mui/material';
import axios from 'axios';
import {UserContext} from '../App';
import React, {useContext} from 'react';
import {ReactSession} from 'react-client-session';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import { Link } from '@mui/material';

const Welcome = (props) => {
    const {state, dispatch} = useContext(UserContext);
    const history = useHistory();
    const [userOrgs, setUserOrgs] = useState([]);
    
    useEffect(() => {
        const user = JSON.parse(ReactSession.get("user"))
        if (user) {
            dispatch({type: "USER", payload: user});
        } else {
            history.push("/logReg")
        }
        axios.post('http://localhost:5000/api/user/', { userId: user.userId })
            .then(res => setUserOrgs(res.data.organizations))
            .catch(err => console.log(err));
    }, [])

    const handleCreateOrg = (e) => {
        e.preventDefault();
        history.push('/organization/create');
    }

    const handleApplyOrg = (e) => {
        e.preventDefault();
        history.push('/organization/apply');
    }

    const goToOrg = (e, id) => {
        e.preventDefault();
        history.push(`/dashboard/${id}`);
    }

    return (
        <>
            <Paper style={{margin: "20px auto", width: "80vw", padding: "20px", height: '70vh'}}  elevation={3}>
                    <Typography style={{textAlign: 'center', marginTop: '20px'}} variant='h3'>Welcome {state.firstName}</Typography>
                    {userOrgs.length == 0 ? 
                    (
                        <>
                            <p style={{textAlign: 'center'}}>You don't have any organization. Please create or apply to one.</p>
                        </>
                    ) 
                    : 
                    (<Grid >
                    <List>
                        <ListItem disablePadding>
                            <ListItemText primary="Here is the list of your organizations:" />
                        </ListItem>
                    </List>
                    <Divider />
                    <List style={{overflow: 'auto', maxHeight: "50vh", height: '50vh', marginBottom: 'auto'}}>
                        {userOrgs.map((org) => {
                            return <ListItem disablePadding key={org.orgId}>
                            <ListItemButton>
                                <Link onClick={e => goToOrg(e, org.orgId._id)} style={{textDecoration: 'none', fontSize: '35px'}} color="inherit">{org.orgId.name}</Link>
                            </ListItemButton>
                        </ListItem>
                        })}
                    </List>
                    </Grid>)}
                    <Grid sx={{display: 'flex',  justifyContent: 'space-around'}}>
                        <Button variant='contained'><Link style={{cursor: 'pointer', marginLeft: 'auto', textDecoration: 'none'}} variant='h6' onClick={handleCreateOrg} color='inherit'>Create Organization</Link></Button>
                        <Button variant='outlined'><Link style={{cursor: 'pointer', marginLeft: 'auto', textDecoration: 'none'}} variant='h6' onClick={handleApplyOrg} color='inherit'>Apply to an Organization</Link></Button>
                    </Grid>
            </Paper>
        </>
    )
}

export default Welcome;