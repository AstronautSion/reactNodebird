import React, { useCallback, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PostForm from '../components/PostForm';
import PostCard from '../components/PostCard';
import { LOAD_MAIN_POSTS_REQUEST } from '../reducers/post';
import Helmet from 'react-helmet';

const Home = () => {
  const { me } = useSelector(state => state.user);
  const { mainPosts, hasMorePost } = useSelector(state => state.post);
  const dispatch = useDispatch();
  const countRef = useRef([]);

  const onScroll = useCallback(() => {
    if (window.scrollY + document.documentElement.clientHeight
      > document.documentElement.scrollHeight - 300) {
      if (hasMorePost) {
        const lastId = mainPosts[mainPosts.length - 1].id;
        if (!countRef.current.includes(lastId)) {
          dispatch({
            type: LOAD_MAIN_POSTS_REQUEST,
            lastId,
          });
        }
        countRef.current.push(lastId);
      }
    }
  }, [hasMorePost, mainPosts.length]);
  useEffect(() => {
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, [mainPosts.length]);
  return (
    <>
      <Helmet
        title="노드버드"
        description="안녕하세요 노드버드에 오신것을 환영합니다."
        meta={[{
          name: 'description', content: '안녕하세요 노드버드에 오신것을 환영합니다.',
        }, {
          name: 'og:title', content: '노드버드',
        }, {
          name: 'og:description', content: '안녕하세요 노드버드에 오신것을 환영합니다.',
        }, {
          name: 'og:image', content: 'http://localhost:3060/uploads/products1614551878040.png',
        }]}
      />
      <div>
        {me && <PostForm />}
        {mainPosts.map(post => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </>
  );
};

Home.getInitialProps = async (context) => {
  context.store.dispatch({
    type: LOAD_MAIN_POSTS_REQUEST,
  });
};

export default Home;
