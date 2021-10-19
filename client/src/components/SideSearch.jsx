import React, { useState, useEffect } from 'react';
import { Box, Paper, Stack, TextField, Chip, Avatar } from '@mui/material';
import axios from 'axios';

const SideSearch = () => {

    const [userList, setUserList] = useState([]);
    const [search, setSearch] = useState('');

    const handleSearchChange = (e) => {
        setSearch(e.target.value);
        e.target.value = search;
        // Make get request to retrieve all employees in dept that have names including search term.
    }

    useEffect(() => {

    }, [])

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
                <Chip
                    avatar={<Avatar style={{fontSize: '20px', height: '40px', width: '40px', marginRight: '20px'}}>F</Avatar>}
                    label='First Last'
                    variant='outline'
                    style={{height: '50px', fontSize: '20px'}}
                    clickable
                    component='a'
                    href='#'
                />
            </Stack>
        </Box>
    )
}

export default SideSearch;