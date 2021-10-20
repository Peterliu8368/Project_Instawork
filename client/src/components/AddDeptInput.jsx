import React, { useState } from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import { Icon, IconButton } from '@mui/material';
import axios from 'axios';

const AddDeptInput = (props) => {

    const [deptName, setDeptName] = useState('');

    const handleChange = (e) => {
        setDeptName(e.target.value);
    }

    const addDepartment = (e) => {

        // TODO still need a way to properly retrieve orgId from this page.
        var payload = { orgId: props.orgId, newDept: { name: deptName } };
        axios.post('http://localhost:5000/api/department/create', payload)
            .then(res => console.log(res))
            .catch(err => console.log(err));
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