import React, { useState, useEffect } from 'react';
import { Box, Paper, Stack, TextField, Chip, Avatar } from '@mui/material';
import axios from 'axios';

const SideSearch = () => {

    const [userList, setUserList] = useState([]);
    const [search, setSearch] = useState('');

    const handleSearchChange = async (e) => {
        setSearch(e.target.value);
        e.target.value = search;
    }

    useEffect(() => {
        axios.post('http://localhost:5000/api/department/employee/search', { deptId: '616f0d72a5b04a7c297200ab', search: search })
            .then(res => setUserList([...res.data]))
            .catch(err => console.log(err));
    }, [search])

    return (
        <Box component={Paper} padding={2} style={{minHeight: '85vh'}}>
            <Stack spacing={2}>
                <TextField
                    id='search'
                    variant='outlined'
                    label='Search Employees'
                    value={search}
                    onChange={handleSearchChange}
                />
                {userList.map(user => {
                    return (
                        <Chip
                        avatar={<Avatar style={{fontSize: '20px', height: '40px', width: '40px', marginRight: '20px'}}>{user.firstName[0]}</Avatar>}
                        label={user.firstName + ' ' + user.lastName}
                        variant='outline'
                        style={{height: '50px', fontSize: '20px'}}
                        clickable
                        component='a'
                        href='#'
                    />
                    )
                })}

            </Stack>
        </Box>
    )
}

export default SideSearch;