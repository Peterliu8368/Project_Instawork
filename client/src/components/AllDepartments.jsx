import axios from "axios";
import { Link, useHistory, useParams } from "react-router-dom";
import * as React from 'react';
import { useEffect, useState, useContext } from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { UserContext } from '../App';
import {ReactSession} from 'react-client-session';


const AllDepartments = (props) => {
    const {state, dispatch} = useContext(UserContext);
    const { orgId } = useParams();
    const [allDept, setAllDept] = useState([]);
    const history = useHistory();

    useEffect(() => {
        axios
            .get("http://localhost:5000/api/organization/depts/" + orgId)
            .then(res => {
                setAllDept(res.data);
            })
            .catch((err) => console.log(err));
    }, []);

    return(
        <div>
            <ul>
                {allDept.map((dept, index) => {
                    return <il key={index}>
                        <p><Link to={`/dashboard/${orgId}/${dept._id}`}>{dept.name}</Link></p>
                    </il>
                })}
            </ul>
        </div>
    )
}
export default AllDepartments;