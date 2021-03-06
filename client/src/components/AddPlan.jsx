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

const AddPlan = (props) => {
    const [open, setOpen] = React.useState(false);
    const {state, dispatch} = useContext(UserContext);
    const { orgId, deptId } = useParams();
    const [postText, setPostText] = useState("");
    const [workResult, setWorkResult] = useState("");
    const [reviewMessage, setReviewMessage] = useState("");
    const history = useHistory();
    const { count, setCount, posts, setPosts } = props;
    const user = JSON.parse(ReactSession.get("user"))
    
    
    const HandleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handlePostText = (e) => {
        setPostText(e.target.value);
    }

    useEffect(() => {
        if (user) {
            dispatch({type: "USER", payload: user});
        } else {
            history.push("/logReg")
        }
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put('http://localhost:5000/api/department/post/add', {
            newPost: {postText: postText, userId: user.userId}, deptId: deptId
        })
        .then(res => {
            console.log(res.data);
            setPosts([...posts, res.data])
            setOpen(false);
        })
        .then( res => {
            setCount(count + 1);
        })
        .catch(err => console.error(err));
    }

    return (
        <div>
            <Button variant="contained" onClick={HandleClickOpen}>
                Add Plan
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Add Plan</DialogTitle>
                <form onSubmit={handleSubmit}>
                    <DialogContent>
                        <TextField
                            autoFocus
                            margin="dense"
                            name="postText"
                            id="postText"
                            label="Work Plan: "
                            type="text"
                            onChange={e => handlePostText(e)}
                            value={postText}
                            fullWidth
                            variant="standard"
                            multiline
                        />
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button type="submit">Add to Post</Button>
                    </DialogContent>
                    <DialogActions>
                    </DialogActions>
                </form>
            </Dialog>
        </div>
    );
}
export default AddPlan;