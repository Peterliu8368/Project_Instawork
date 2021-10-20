import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";

const Posts = (props) => {
    const [post, setPost]= useState([]);
    const [loaded, setLoaded] = useState(false);
    const [addResult, setAddResult] = useState(false);
    const history = useHistory();

    useEffect(() => {
        axios
            .post("http://localhost:5000/api/post/department/", {
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
            {post.map((post, index) => {
                return <div key={index}>
                    <h1>{post.userId.firstName} {post.userId.lastName}</h1>
                    <p>Work Plan: </p>
                    <p>{post.postText}</p>
                    <p>Work Result: </p>
                    <p>{post.workResult}</p>
                    <p>{post.reviewMessage}</p>
                </div>
            })}
        </div>
    );
};

export default Posts;