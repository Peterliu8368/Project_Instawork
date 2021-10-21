import { Grid, Paper, Typography, Select, MenuItem, Button, Divider, Alert, Snackbar } from '@mui/material';
import { Box } from '@mui/system';
import React, { useState, useEffect } from 'react';
import AddDeptInput from './AddDeptInput';
import axios from 'axios';

const AddCard = (props) => {
    
    const tempOrgId = '6171ae7c85aaeaf66907a37f';
    const [userInfo, setUserInfo] = useState({
        userId: '',
        firstName: '',
        lastName: '',
    });
    const [dept, setDept] = useState('');
    const [priv, setPriv] = useState(1);
    const [addOpen, setAddOpen] = useState(false);
    const [errOpen, setErrOpen] = useState(false);
    const [allDepts, setAllDepts] = useState([]);

    const handleDeptChange = (e) => {
        setDept(e.target.value);
    }

    const handlePrivChange = (e) => {
        setPriv(e.target.value);
    }

    const handleSubmit = (e) => {
        if (priv === 1) {
            axios.put('http://localhost:5000/api/department/employee/add', { deptId: dept, userId: userInfo._id, orgId: tempOrgId, privilege: 1 })
                .then(res => {
                    console.log('here');
                    setAddOpen(true)
                })
                .catch(err => {
                    console.log('err');
                    setErrOpen(true);
                });
        } else if (priv === 2) {
            axios.put('http://localhost:5000/api/department/manager/add', { deptId: dept, userId: userInfo._id, orgId: tempOrgId, privilege: 2 })
                .then(res => {
                    console.log('here');
                    setAddOpen(true)
                })
                .catch(err => {
                    console.log('err');
                    setErrOpen(true);
                });
        }
    }

    const handleClose = (e) => {
        setAddOpen(false);
        setErrOpen(false);
    }

    useEffect(() => {
        axios.get('http://localhost:5000/api/organization/depts/' + tempOrgId)
            .then(depts => setAllDepts(depts.data))
            .catch(err => console.log(err.response));
        console.log(props.selectedUserId);
        axios.get('http://localhost:5000/api/user/' + props.selectedUserId)
            .then(user => {
                console.log(user.data);
                setUserInfo(user.data)})
            .catch(err => console.log(err));
        
    }, [props.selectedUserId, props.count])

    return (
        <>
            <Box component={Paper} padding={2}>
                <Grid container spacing={2} columnSpacing={2} alignContent='center'>
                    <Grid item xs={12}>
                        {!userInfo.firstName || !userInfo.lastName ? (<p></p>) : (
                            <Typography variant='h3' textAlign='center' sx={{marginBottom: '20px'}}>{userInfo.firstName} {userInfo.lastName}</Typography>
                        )}
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
                                        return <MenuItem key={dept._id} value={dept._id} defaultValue>{dept.name}</MenuItem>
                                    } else {
                                        return <MenuItem key={dept._id} value={dept._id}>{dept.name}</MenuItem>
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
            <Snackbar open={addOpen} autoHideDuration={4000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                    Added user to department.
                </Alert>
            </Snackbar>
            <Snackbar open={errOpen} autoHideDuration={4000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                    User already in department.
                </Alert>
            </Snackbar>
        </>
    )
}

export default AddCard;