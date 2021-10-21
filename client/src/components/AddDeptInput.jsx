import React, { useState } from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import { Icon, IconButton } from '@mui/material';
import axios from 'axios';
import {ReactSession} from 'react-client-session'

const AddDeptInput = (props) => {
    const tempOrgId = '6171ae7c85aaeaf66907a37f';
    const [deptName, setDeptName] = useState('');

    const handleChange = (e) => {
        setDeptName(e.target.value);
    }

    const addDepartment = (e) => {

        // TODO still need a way to properly retrieve orgId from this page.
        var payload = { orgId: tempOrgId, newDept: { name: deptName, orgId: tempOrgId }, userId: JSON.parse(ReactSession.get("user")).userId, privilege: 3 };
        axios.post('http://localhost:5000/api/department/create', payload)
            .then(res => {
                console.log(res);
                props.setAllDepts([...props.allDepts, res]);
                props.setCount(props.count + 1);
            })
            .catch(err => console.log(err.response));
        setDeptName('');
        
    }

    return (
        <Paper component='form' sx={{marginTop: '20px'}}>
            <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder="Add Department"
                inputProps={{ 'aria-label': 'add department' }}
                value={deptName}
                onChange={handleChange}
            />
            <IconButton onClick={addDepartment}><Icon>add_circle</Icon></IconButton>
        </Paper>
    )
}

export default AddDeptInput;