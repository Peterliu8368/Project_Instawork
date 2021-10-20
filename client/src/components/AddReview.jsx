import axios from "axios";
import { Link, useHistory } from "react-router-dom";
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

const AddReview = (props) => {
    const [open, setOpen] = React.useState(false);
    const { id } = props;
    const {state, dispatch} = useContext(UserContext);
    const [postText, setPostText] = useState("");
    const [workResult, setWorkResult] = useState("");
    const [reviewMessage, setReviewMessage] = useState("");

    const HandleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        if (setOpen) {
            axios.post('http://localhost:5000/api/post/postid', {id: id})
            .then(res => {
                console.log(res.data);
                setPostText(res.data.post.postText);
                setWorkResult(res.data.post.workResult);
                setReviewMessage(res.data.post.reviewMessage);
            })
            .catch(err => console.error(err));
        }
    }, []);

    const handleReview = (e) => {
        setReviewMessage(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put('http://localhost:5000/api/post/updateById', {
            postId: id, reviewMessage: reviewMessage 
        })
        .then(res => {
            console.log(res.data);
            setOpen(false);
        })
        .catch(err => console.error(err));
    }

    return (
        <div>
            <Button size="small" onClick={HandleClickOpen}>
                Review
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Add Review</DialogTitle>
                <form onSubmit={handleSubmit}>
                    <DialogContent>
                        <TextField
                            autoFocus
                            margin="dense"
                            name="reviewMessage"
                            id="reviewMessage"
                            label="Review Message: "
                            type="text"
                            onChange={e => handleReview(e)}
                            value={reviewMessage}
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
export default AddReview;
