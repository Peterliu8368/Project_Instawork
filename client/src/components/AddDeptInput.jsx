import React, { useState } from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import { Icon, IconButton } from '@mui/material';

const AddDeptInput = (props) => {

    const [deptName, setDeptName] = useState('');

    const handleChange = (e) => {
        setDeptName(e.target.value);
    }

    const addDepartment = (e) => {

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
            <IconButton><Icon>add_circle</Icon></IconButton>
        </Paper>
    )
}

export default AddDeptInput;