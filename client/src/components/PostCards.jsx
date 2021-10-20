import { useState, useEffect, useContext } from "react";
import axios from "axios";
import * as React from 'react';
import { Link, useHistory } from "react-router-dom";
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import { spacing } from '@mui/system';
import Typography from '@mui/material/Typography';
import AddResult from './AddResult';
import AddPlan from './AddPlan';
import { UserContext } from '../App';
// import Cookies from 'js-cookie';

const bull = (
    <Box
        component="span"
        sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
    >
    •
    </Box>
);

const PostCards = (props) => {
    const [post, setPost]= useState([]);
    const [loaded, setLoaded] = useState(false);
    const {state, dispatch} = useContext(UserContext);
    // const {isLoggedIn} = state;
    const history = useHistory();

    useEffect(() => {
        axios
            .post("http://localhost:5000/api/post/department", {
                _id: "616f0d72a5b04a7c297200ab"
            })
            .then((res) => {
                setPost(res.data);
                setLoaded(true);
                console.log(res.data);
            })
            .catch(console.log);
    }, []);

    if (loaded === false) {
        return "Page is Loading...";
    }
    return (
        <div>
            <div>
                <AddPlan /> 
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
                                    <AddResult id={post._id}/> :
                                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                    {post.workResult}
                                    </Typography>
                                }
                            </CardContent>
                            <hr/>
                            <CardActions>
                                <Button size="small">Review Post</Button>
                                <Typography variant="body2">
                                {post.reviewMessage}
                                </Typography>
                            </CardActions>
                        </Card>
                    </div>
                })
            }
        </div>
    );
};

export default PostCards;