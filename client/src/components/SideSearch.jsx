import React, { useState, useEffect } from 'react';
import { Box, Paper, Stack, TextField, Chip, Avatar } from '@mui/material';
import axios from 'axios';
import { useParams } from 'react-router';
import ColorAvatar from './ColorAvatar';

const SideSearch = (props) => {

    const [userList, setUserList] = useState([]);
    const [search, setSearch] = useState('');
    const { deptId } = useParams();
    const [firstRender, setFirstRender] = useState(true);
    const [searchList, setSearchList] = useState([]);
    const { showOne, setShowOne } = props;

    const handleSearchChange = async (e) => {
        setSearch(e.target.value);
        e.target.value = search;
    }

    const userSelect = (e, id) => {
        e.preventDefault();
        setShowOne(id);
    }

    useEffect(() => {
        let mounted = true;
            axios.post("http://localhost:5000/api/post/department", {
                deptId: deptId
            })
                .then(res => {
                    var dupeList = [...res.data.managers, ...res.data.employees];
                    var tempList = [];
                    for (var i=0; i<dupeList.length; i++) {
                        var found = false;
                        for (var j=0; j<tempList.length; j++) {
                            if (dupeList[i]._id === tempList[j]._id) {
                                found = true;
                                break;
                            }
                        }
                        if (!found) {
                            tempList.push(dupeList[i]);
                        }
                    }
                    setUserList(tempList);
                    if (search === '') setSearchList(tempList);
                })
                .catch(err => console.log(err.response));
            var newSearchList = [];
            userList.forEach(emp => {
                var fullName = emp.firstName + ' ' + emp.lastName;
                if (fullName.toLowerCase().includes(search.toLowerCase())) {
                    newSearchList.push(emp);
                }
            });
            setSearchList(newSearchList);
        return function cleanup() {
            mounted = false;
        }
    }, [search, deptId])

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
                        avatar={<ColorAvatar name={user.firstName + ' ' + user.lastName} />}
                        label={user.firstName + ' ' + user.lastName}
                        variant='outline'
                        style={{height: '50px', fontSize: '20px', justifyContent: 'start', paddingLeft: '10px'}}
                        clickable
                        component='a'
                        href='#'
                        onClick={e => userSelect(e, user._id)}
                    />
                    )
                })}

            </Stack>
        </Box>
    )
}

export default SideSearch;