import React from 'react';
import PostForm from '../components/PostForm.js';
import PostCard from '../components/PostCard.js';
import { useSelector }  from 'react-redux';

const Home = () =>{
    const { me } = useSelector(state => state.user);
    const { mainPosts } = useSelector(state => state.post);

    return(
        <>
            {me && <PostForm />}
            {mainPosts.map((c, i) =>{
                return( <PostCard key={i} post={c} /> );
            })}
        </>
    );
};

export default Home;