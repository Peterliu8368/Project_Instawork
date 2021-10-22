import { useState, useEffect, useContext } from "react";
import axios from "axios";
import * as React from 'react';
import { Link, useHistory, useParams } from "react-router-dom";
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import { spacing } from '@mui/system';
import Typography from '@mui/material/Typography';
import AddResult from './AddResult';
import AddPlan from './AddPlan';
import AddReview from './AddReview';
import { UserContext } from '../App';
import {ReactSession} from 'react-client-session';


const bull = (
    <Box
        component="span"
        sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
    >
    •
    </Box>
);

const PostCards = (props) => {
    const {state, dispatch} = useContext(UserContext);
    const { orgId, deptId } = useParams();
    const [post, setPost]= useState([]);
    const [loaded, setLoaded] = useState(false);
    const user = JSON.parse(ReactSession.get("user"));
    const history = useHistory();
    const [count, setCount] = useState(0);

    useEffect(() => {
        console.log("this is from session!"+ user.userId)
        if (user) {
            dispatch({type: "USER", payload: user});
        } else {
            history.push("/logReg")
        }
        if (deptId) {
            axios
                .post("http://localhost:5000/api/post/department", {
                    deptId: deptId //get dept id from user
                })
                .then((res) => {
                    console.log(res.data);
                    setPost(res.data);
                    setLoaded(true);
                })
                .catch(err => console.error(err));
        }
    }, [count]);
    if (!deptId) {
        return "Please select a Department"
    }
    console.log(post);
    // if (deptId && post.length == 0) {
    //     setLoaded(false);
    //     console.log("Changing state");
    // }

    return (
        <div>
            <div>
                <AddPlan count={count} setCount={setCount}/> 
            </div>
            {post.map((post, index) => {
                return <div key={index}>
                        <Card sx={{ minWidth: 275 }} sx={{ my: 2 }}>
                            <CardContent>
                                <Typography variant="h5" component="div" mb={1}>
                                {post.userId.firstName} {post.userId.lastName}
                                </Typography>
                                <Typography variant="body2">
                                Work Plan:
                                </Typography>
                                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                {post.postText}
                                </Typography>
                                <Typography variant="body2">
                                Work Result:
                                </Typography>
                                { 
                                    post.workResult == null ?
                                    <AddResult id={post._id} count={count} setCount={setCount}/> :
                                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                    {post.workResult}
                                    </Typography>
                                }
                            </CardContent>
                            <hr/>
                            <CardActions>
                                { 
                                    post.reviewMessage == null ?
                                    <AddReview id={post._id} count={count} setCount={setCount}/> :
                                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                    {post.reviewMessage}
                                    </Typography>
                                }
                            </CardActions>
                        </Card>
                    </div>
                })
            }
            
        </div>
    );
};

export default PostCards;