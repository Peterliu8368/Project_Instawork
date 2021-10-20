import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import * as React from 'react';
import { useEffect, useState } from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const AddPlan = () => {
    const [open, setOpen] = React.useState(false);
    // const { id } = props;
    const [postText, setPostText] = useState("");
    const [workResult, setWorkResult] = useState("");
    const [reviewMessage, setReviewMessage] = useState("");
    
    const HandleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handlePostText = (e) => {
        setPostText(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put('http://localhost:5000/api/department/post/add', {
            newPost: {postText: postText, userId: "616f3499c2248fbc553d4365"}, deptId: "616f0d72a5b04a7c297200ab"
        })
        .then(res => {
            console.log(res.data);
            setOpen(false);
        })
        .catch(err => console.error(err));
    }

    return (
        <div>
            <Button variant="outlined" size="small" onClick={HandleClickOpen}>
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