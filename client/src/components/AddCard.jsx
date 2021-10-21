import { Grid, Paper, Typography, Select, MenuItem, Button, Divider } from '@mui/material';
import { Box } from '@mui/system';
import React, { useState, useEffect } from 'react';
import AddDeptInput from './AddDeptInput';
import axios from 'axios';

const AddCard = (props) => {
    
    const tempOrgId = '61708cdf072478f458768195';
    const [userInfo, setUserInfo] = useState({
        userId: '',
        firstName: '',
        lastName: '',
    });
    const [dept, setDept] = useState('');
    const [priv, setPriv] = useState(1);
    const [allDepts, setAllDepts] = useState([]);

    const handleDeptChange = (e) => {
        setDept(e.target.value);
    }

    const handlePrivChange = (e) => {
        setPriv(e.target.value);
    }

    const handleSubmit = (e) => {
        var payload;
        if (priv === 1) {
            // payload = { deptId: dept, employeeId: userInfo.userId };
            // ROUTE TO ADD EMPLOYEE
        } else if (priv === 2) {
            // payload = { deptId: dept, managerId: userInfo.userId };
            // ROUTE TO ADD MANAGER
        }
    }

    useEffect(() => {
        axios.get('http://localhost:5000/api/organization/depts/' + tempOrgId)
            .then(depts => setAllDepts(depts.data))
            .catch(err => console.log(err.response));
        
        axios.get('http://localhost:5000/api/user/getById', { userId: props.selectedUserId })
            .then(user => setUserInfo(user))
            .catch(err => console.log(err));
        
    }, [props.selectedUserId, props.count])

    return (
        <Box component={Paper} padding={2}>
            <Grid container spacing={2} columnSpacing={2} alignContent='center'>
                <Grid item xs={12}>
                    <Typography variant='h3' textAlign='center' sx={{marginBottom: '20px'}}>{userInfo.firstName} {userInfo.lastName}</Typography>
                    <Divider sx={{marginBottom: '20px'}} />
                </Grid>
                <Grid container item xs={12} spacing={2} justifyContent='center' marginY='20px'>
                    <Grid item xs={4}>
                        <Typography variant='h4'>Privilege</Typography>
                    </Grid>
                    <Grid item xs='auto'>
                        <Select
                            value={priv}
                            onChange={handlePrivChange}
                            id='privilege'
                            sx={{width: '250px'}}
                        >
                            <MenuItem value={1} defaultValue>Member</MenuItem>
                            <MenuItem value={2}>Manager</MenuItem>
                            <MenuItem value={3}>Admin</MenuItem>
                        </Select>
                    </Grid>
                </Grid>
                <Grid container item xs={12} spacing={2} justifyContent='center' marginY='20px'>
                    <Grid item xs={4}>
                        <Typography variant='h4'>Department</Typography>
                    </Grid>
                    <Grid item xs='auto'>
                        <Select
                            value={dept}
                            onChange={handleDeptChange}
                            id='department'
                            sx={{width: '250px'}}
                        >
                            {allDepts.map((dept, idx) => {
                                if (idx === 0) {
                                    return <MenuItem key={dept._id} value={dept.name} defaultValue>{dept.name}</MenuItem>
                                } else {
                                    return <MenuItem key={dept._id} value={dept.name}>{dept.name}</MenuItem>
                                }
                            })}         
                        </Select>
                        <AddDeptInput count={props.count} setCount={props.setCount} allDepts={allDepts} setAllDepts={setAllDepts} />
                    </Grid>
                </Grid>
                <Grid item xs={12} textAlign='center' marginY='20px'>
                    <Button variant='contained' size='large' onClick={handleSubmit} sx={{minWidth: '250px'}}>Admit</Button>
                </Grid>
            </Grid>
        </Box>
    )
}

export default AddCard;