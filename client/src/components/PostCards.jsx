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
import { Grid } from "@mui/material";
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
    const [posts, setPosts]= useState([]);
    const [deptEmp, setDeptEmp] = useState([]);
    const [deptMan, setDeptMan] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const user = JSON.parse(ReactSession.get("user"));
    const history = useHistory();
    const { count, setCount } = props;
    const [date, setDate] = useState(new Date().toLocaleDateString('en-US'));
    const { showOne, setShowOne } = props;

    useEffect(() => {
        if (user) {
            dispatch({type: "USER", payload: user});
        } else {
            history.push("/logReg")
        }
        axios.post("http://localhost:5000/api/post/department", {
                deptId: deptId
            })
            .then(res => {
                let filterPost = res.data.posts.filter( post => {
                    return new Date(post.createdAt).getDate() == new Date().getDate();
                })
                setPosts(filterPost);
                setDeptEmp(res.data.employees);
                setDeptMan(res.data.managers);
                console.log(res.data);
            })
            .catch(err => console.error(err));

    }, [count]);

    const showAll = () => {
        setShowOne('');
    }
    
            if (posts.length == 0 && !deptId) {
                return (
                    <p>Please a department to show work plans.</p>
                )
            } else {
                return ( <div>
                    <div style={{display: 'flex', flexFlow: 'row nowrap', justifyContent: 'space-between'}}>
                        <AddPlan count={count} setCount={setCount} posts={posts} setPosts={setPosts}/> 
                        {showOne === '' ? <></> : <Button onClick={showAll} variant='outlined'>Show All</Button>}
                    </div>
                    {posts.map((post, index) => {
                        if (showOne !== '' && post.userId._id === showOne){
                            return <div key={index}>
                                <Card sx={{ minWidth: 275 }} sx={{ my: 2 }}>
                                    <CardContent>
                                    <Grid container justifyContent='space-between'>
                                            <Grid item sx={6}>
                                                <Typography variant="h5">
                                                {post.userId.firstName} {post.userId.lastName}
                                                </Typography>
                                            </Grid>
                                            <Grid item sx='auto' alignItems='center'>
                                                <Grid item xs='auto'>
                                                    <Typography variant="body2" sx={{ fontSize: 14 }}>
                                                    { new Date(post.createdAt).toLocaleTimeString('en-US')}
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs='auto'>
                                                    <Typography variant="body2" sx={{ fontSize: 14}}>
                                                    { new Date(post.createdAt).toLocaleDateString('en-US')}
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                        <Typography variant="body2">
                                        Work Plan:
                                        </Typography>
                                        <div style={{display:"flex", flexWrap: "wrap", maxWidth: "40vw"}}>
                                            <Typography variant="body1" sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                            {post.postText}
                                            </Typography>
                                        </div>
                                        <Typography variant="body2">
                                        Work Result:
                                        </Typography>
                                        { 
                                            post.workResult == null && user.userId == post.userId._id ?
                                            <AddResult id={post._id} count={count} setCount={setCount}/> :
                                            <div>
                                                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                                {post.workResult}
                                                </Typography>
                                            </div>
                                        }
                                    </CardContent>
                                    <hr/>
                                    <CardActions>
                                        { 
                                            (post.reviewMessage == null && user.userId != post.userId._id && deptMan.some(manager => { return manager._id == user.userId})) &&
                                            (<><AddReview id={post._id} count={count} setCount={setCount}/> 
                                            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                                {post.reviewMessage}
                                            </Typography></>)
                                        }
                                        {
                                            user.userId == post.userId._id || deptMan.some(manager => { return manager._id == user.userId}) ?
                                            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                                {post.reviewMessage}
                                            </Typography>:
                                            ""
                                        }
                                    </CardActions>
                                </Card>
                            </div>
                        } else if (showOne === '') {
                            return <div key={index}>
                                <Card sx={{ minWidth: 275 }} sx={{ my: 2 }}>
                                    <CardContent>
                                        <Grid container justifyContent='space-between'>
                                            <Grid item sx={6}>
                                                <Typography variant="h5">
                                                {post.userId.firstName} {post.userId.lastName}
                                                </Typography>
                                            </Grid>
                                            <Grid item sx='auto' alignItems='center'>
                                                <Grid item xs='auto'>
                                                    <Typography variant="body2" sx={{ fontSize: 14 }}>
                                                    { new Date(post.createdAt).toLocaleTimeString('en-US')}
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs='auto'>
                                                    <Typography variant="body2" sx={{ fontSize: 14}}>
                                                    { new Date(post.createdAt).toLocaleDateString('en-US')}
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                        </Grid>
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
                                            post.workResult == null && user.userId == post.userId._id ?
                                            <AddResult id={post._id} count={count} setCount={setCount}/> :
                                            <div>
                                                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                                {post.workResult}
                                                </Typography>
                                            </div>
                                        }
                                    </CardContent>
                                    <hr/>
                                    <CardActions>
                                        { 
                                            (post.reviewMessage == null && user.userId != post.userId._id && deptMan.some(manager => { return manager._id == user.userId})) &&
                                            (<><AddReview id={post._id} count={count} setCount={setCount}/> 
                                            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                                {post.reviewMessage}
                                            </Typography></>)
                                        }
                                        {
                                            user.userId == post.userId._id || deptMan.some(manager => { return manager._id == user.userId}) ?
                                            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                                {post.reviewMessage}
                                            </Typography>:
                                            ""
                                        }
                                    </CardActions>
                                </Card>
                            </div>
                        }
                        })
                    }
                    
                </div>);
            }
            
        
    
};

export default PostCards;