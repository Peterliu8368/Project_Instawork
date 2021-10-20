import { Grid, Paper, Typography, Select, MenuItem, Button, Divider } from '@mui/material';
import { Box } from '@mui/system';
import React, { useState } from 'react';
import ColorAvatar from './ColorAvatar';


const AddCard = (props) => {

    const [userInfo, setUserInfo] = useState({
        firstName: props.firstName,
        lastName: props.lastName,
        privilege: 0,
        department: ''
    })
    const [dept, setDept] = useState('General');
    const [priv, setPriv] = useState(1);

    const handleDeptChange = (e) => {
        setDept(e.target.value);
        
    }

    const handlePrivChange = (e) => {
        setPriv(e.target.value);
        
    }

    const handleSubmit = (e) => {
        // TODO add user to dep w/ privilege.
    }

    return (
        <Box component={Paper} padding={2}>
            <Grid container spacing={2} columnSpacing={2} alignContent='center'>
                <Grid item xs={12}>
                    <Typography variant='h3' textAlign='center' sx={{marginBottom: '20px'}}>{userInfo.firstName} {userInfo.lastName}</Typography>
                    <Divider sx={{marginBottom: '20px'}} />
                </Grid>
                <Grid container item xs={12} spacing={2} justifyContent='center'>
                    <Grid item xs={4}>
                        <Typography variant='h4'>Privilege</Typography>
                    </Grid>
                    <Grid item xs='auto'>
                        <Select
                            value={priv}
                            onChange={handlePrivChange}
                            id='privilege'
                        >
                            <MenuItem value={1} defaultValue>1</MenuItem>
                            <MenuItem value={2}>2</MenuItem>
                            <MenuItem value={3}>3</MenuItem>
                        </Select>
                    </Grid>
                </Grid>
                <Grid container item xs={12} spacing={2} justifyContent='center'>
                    <Grid item xs={4}>
                        <Typography variant='h4'>Department</Typography>
                    </Grid>
                    <Grid item xs='auto'>
                        <Select
                            value={dept}
                            onChange={handleDeptChange}
                            id='department'
                        >
                            <MenuItem value={'General'} defaultValue>General</MenuItem>
                            <MenuItem value={'Marketing'}>Marketing</MenuItem>
                            <MenuItem value={'Finance'}>Finance</MenuItem>
                            <MenuItem value={'Software Engineering'}>Software Engineering</MenuItem>
                            <MenuItem value={'Sales'}>Sales</MenuItem>
                        </Select>
                    </Grid>
                </Grid>
                <Grid item xs={12} textAlign='center'>
                    <Button variant='contained' size='large' onClick={handleSubmit} sx={{minWidth: '250px'}}>Admit</Button>
                </Grid>
            </Grid>
        </Box>
    )
}

export default AddCard;