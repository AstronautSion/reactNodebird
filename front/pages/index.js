import React, { useEffect } from 'react';
import PostForm from '../components/PostForm.js';
import PostCard from '../components/PostCard.js';
import { useDispatch, useSelector }  from 'react-redux';
import { LOAD_MAIN_POSTS_REQUEST } from '../reducers/post.js';

const Home = () =>{
    const { me } = useSelector(state => state.user);
    const { mainPosts } = useSelector(state => state.post);
    const dispatch = useDispatch();

    useEffect(()=>{
       dispatch({
           type: LOAD_MAIN_POSTS_REQUEST,
       });
    },[])
    return(
        <>
            {me && <PostForm />}
            {mainPosts && mainPosts.map((c, i) =>{
                return( <PostCard key={i} post={c} /> );
            })}
        </>
    );
};

export default Home;