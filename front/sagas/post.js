import axios from 'axios';
import {all, fork, put, takeLatest, delay, call } from 'redux-saga/effects';
import { 
    ADD_POST_REQUEST,
    ADD_POST_SUCCESS,
    ADD_POST_FAILURE,
    LOAD_MAIN_POSTS_REQUEST,
    LOAD_MAIN_POSTS_SUCCESS,
    LOAD_MAIN_POSTS_FAILURE,
    ADD_COMMENT_SUCCESS,
    ADD_COMMENT_FAILURE,
    ADD_COMMENT_REQUEST,
    LOAD_HASHTAG_POSTS_SUCCESS,
    LOAD_HASHTAG_POSTS_FAILURE,
    LOAD_HASHTAG_POSTS_REQUEST,
    LOAD_USER_POSTS_SUCCESS,
    LOAD_USER_POSTS_FAILURE,
    LOAD_USER_POSTS_REQUEST,
 }  from '../reducers/post';

 /*******[ add post ]**********/
function addPostAPI(data){
    return axios.post('/post', data, {
        withCredentials:true,
    });
}
function* addPost(action){
    try {
        const result = yield call(addPostAPI, action.data);
        yield put({
            type: ADD_POST_SUCCESS,
            data: result.data,
        });
    } catch (error) {
        console.error(error);
        yield put({
            type: ADD_POST_FAILURE,
            error,
        })
    }
}
function* watchAddPost(){
    yield takeLatest(ADD_POST_REQUEST, addPost);
}

/*******[ comment ]**********/
function addCommentAPI(data){
    return axios.post(`/post/${data.postId}/comment`,data,{ // POST  /api/post/comment
        withCredentials:true,
    });
}
function* addComment(action){
    try {
        const result = yield call(addCommentAPI, action.data)
        yield put({
            type: ADD_COMMENT_SUCCESS,
            data: result.data,
        });
    } catch (error) {
        console.error(error);
        yield put({
            type: ADD_COMMENT_FAILURE,
        });
    }
}
function* watchAddComment(){
    yield takeLatest(ADD_COMMENT_REQUEST, addComment);
}


 /*******[ load main posts ]**********/
 function loadPostsAPI(){
    return axios.get('/posts');
}
function* loadMainPosts(){
    
    try {
        const result = yield call(loadPostsAPI);
        yield put({
            type: LOAD_MAIN_POSTS_SUCCESS,
            data: result.data,
        });
    } catch (error) {
        console.error(error);
        yield put({
            type: LOAD_MAIN_POSTS_FAILURE,
            error,
        })
    }
}
function* watchLoadPosts(){
    yield takeLatest(LOAD_MAIN_POSTS_REQUEST, loadMainPosts);
}


/*******[ load hash tag ]**********/
function loadHashtagPostsAPI(tagName, lastId = 0) {
    return axios.get(`/hashtag/${tagName}?lastId=${lastId}`);
  }
  
  function* loadHashtagPosts(action) {
    try {
      const result = yield call(loadHashtagPostsAPI, action.data, action.lastId);
      yield put({
        type: LOAD_HASHTAG_POSTS_SUCCESS,
        data: result.data,
      });
    } catch (error) {
      yield put({
        type: LOAD_HASHTAG_POSTS_FAILURE,
        error,
      });
    }
  }
  
  function* watchLoadHashtagPosts() {
    yield takeLatest(LOAD_HASHTAG_POSTS_REQUEST, loadHashtagPosts);
  }


/*******[ load user post ]**********/
function loadUserPostsAPI(id) {
    return axios.get(`/user/${id}/posts`);
  }
  
  function* loadUserPosts(action) {
    try {
      const result = yield call(loadUserPostsAPI, action.data);
      yield put({
        type: LOAD_USER_POSTS_SUCCESS,
        data: result.data,
      });
    } catch (error) {
      yield put({
        type: LOAD_USER_POSTS_FAILURE,
        error,
      });
    }
  }
  function* watchLoadUserPosts() {
    yield takeLatest(LOAD_USER_POSTS_REQUEST, loadUserPosts);
  }





export default function* postSaga(){
    yield all([
        fork(watchLoadPosts),
        fork(watchAddPost),
        fork(watchAddComment),
        fork(watchLoadHashtagPosts),
        fork(watchLoadUserPosts),
    ]);
}