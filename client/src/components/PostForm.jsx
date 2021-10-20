import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import { useState } from "react";
import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const PostForm = () => {
    const [open, setOpen] = React.useState(false);
    const [postText, setPostText] = useState("");
    const [errors, setErrors] = useState([]);
    const history = useHistory();

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = (newPost) => {
        axios
            .post("http://localhost:5000/api/department/post/add", {
                _id: "616f0d72a5b04a7c297200ab"
            })
            .then((res) => {
                setPostText(res.data);
                setOpen(false);
            })
            .catch(console.log);
    }

    return (
        <div>
            <Button variant="outlined" onClick={handleClickOpen}>
                Add a Post
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Your Work Plan</DialogTitle>
                <DialogContent>
                {/* <DialogContentText>
                    To Add your post, include 
                </DialogContentText> */}
                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Work Plan: "
                    type="text"
                    onChange={(e) => {setPostText(e.target.value)}}
                    value={postText}
                    fullWidth
                    variant="standard"
                />
                </DialogContent>
                <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleSubmit}>Post</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
export default PostForm;