import React, { useState, useEffect } from 'react';
import { Box, Paper, Stack, TextField, Chip, Avatar } from '@mui/material';
import axios from 'axios';
import ColorAvatar from './ColorAvatar';

const AdminSearch = (props) => {
    const tempOrgId = '6171ae7c85aaeaf66907a37f';
    const [userList, setUserList] = useState([]);
    const [searchList, setSearchList] = useState([]);
    const [search, setSearch] = useState('');
    const [firstRender, setFirstRender] = useState(true);

    const handleSearchChange = async (e) => {
        setSearch(e.target.value);
        e.target.value = search;
    }

    const handleUserSelect = (e, id) => {
        e.preventDefault();
        props.setSelectedUserId(id);
        console.log(id);
    }

    useEffect(() => {
        if (firstRender) {
            setFirstRender(false);
            axios.get('http://localhost:5000/api/user/organization/all/' + tempOrgId)
                .then(res => {
                    console.log(res);
                    setUserList(res.data);
                    setSearchList(res.data);
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
        console.log(userList);
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
                            textAlign='left'
                            avatar={<ColorAvatar name={user.firstName + ' ' + user.lastName} />}
                            label={user.firstName + ' ' + user.lastName}
                            variant='outline'
                            style={{height: '50px', fontSize: '20px'}}
                            clickable
                            component='a'
                            href='#'
                            onClick={e => handleUserSelect(e, user._id)}
                        />
                    )
                })}

            </Stack>
        </Box>
    )
}

export default AdminSearch;