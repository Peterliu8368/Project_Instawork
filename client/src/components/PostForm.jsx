import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const AddResult = (props) => {
    const [open, setOpen] = React.useState(false);
    const { id } = props;
    const [postText, setPostText] = useState("");
    const [workResult, setWorkResult] = useState("");
    const history = useHistory();

    const HandleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        axios.post('http://localhost:5000/api/post/postid', {id: id})
        .then(res => {
            console.log(res.data.post);
            setPostText(res.data.post.postText);
            setWorkResult(res.data.post.workResult);
        })
        .catch(err => console.error(err));
    }, []);

    const handlePostText = (e) => {
        setPostText(e.target.value);
    }
    const handleWorkResult = (e) => {
        setWorkResult(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put('http://localhost:5000/api/post/updateById', {
            postId: id
        }, {
            postText,
            workResult,
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
                Add Result
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Add Result</DialogTitle>
                <form onSubmit={handleSubmit}>
                    <DialogContent>
                        <TextField
                            autoFocus
                            margin="dense"
                            name="postText"
                            label="Work Plan: "
                            type="text"
                            onChange={handlePostText}
                            value={postText}
                            fullWidth
                            variant="standard"
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            name="workResult"
                            id="workResult"
                            label="Work Result: "
                            type="text"
                            onChange={handleWorkResult}
                            fullWidth
                            variant="standard"
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button type="submit">Add to Post</Button>
                    </DialogActions>
                </form>
            </Dialog>
        </div>
    );
}
export default AddResult;