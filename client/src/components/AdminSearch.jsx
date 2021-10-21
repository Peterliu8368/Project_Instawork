import React, { useState, useEffect } from 'react';
import { Box, Paper, Stack, TextField, Chip, Avatar } from '@mui/material';
import axios from 'axios';

const AdminSearch = (props) => {
    const tempOrgId = '61708cdf072478f458768195';
    const [userList, setUserList] = useState([]);
    const [searchList, setSearchList] = useState([]);
    const [search, setSearch] = useState('');
    const [firstRender, setFirstRender] = useState(true);

    const handleSearchChange = async (e) => {
        setSearch(e.target.value);
        e.target.value = search;
    }

    const handleUserSelect = (e) => {
        e.preventDefault();
        props.setSelectedUserId(e.target.key);
    }

    useEffect(() => {
        if (firstRender) {
            setFirstRender(false);
            axios.get('http://localhost:5000/api/user/organization/all', { orgId: tempOrgId })
                .then(res => {
                    setUserList(res);
                    setSearchList(res);
                })
                .catch(err => console.log(err.response));
        } else {
            var newSearchList = [];
            setSearchList(userList.forEach(emp => {
                var fullName = emp.firstName + ' ' + emp.lastName;
                if (fullName.toLowerCase().includes(search.toLowerCase())) {
                    newSearchList.push(emp);
                }
            }));
            setSearchList(newSearchList);
        }
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
                {searchList.map(user => {
                    return (
                        <Chip
                        key={user._id}
                        avatar={<Avatar style={{fontSize: '20px', height: '40px', width: '40px', marginRight: '20px'}}>{user.firstName[0]}</Avatar>}
                        label={user.firstName + ' ' + user.lastName}
                        variant='outline'
                        style={{height: '50px', fontSize: '20px'}}
                        clickable
                        component='a'
                        href='#'
                        onClick={handleUserSelect}
                    />
                    )
                })}

            </Stack>
        </Box>
    )
}

export default AdminSearch;