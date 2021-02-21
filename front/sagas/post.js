import {all, fork, put, takeLatest, delay } from 'redux-saga/effects';
import { 
    ADD_POST_REQUEST,
    ADD_POST_SUCCESS,
    ADD_POST_FAILURE,
    ADD_COMMENT_SUCCESS,
    ADD_COMMENT_FAILURE,
    ADD_COMMENT_REQUEST,
 }  from '../reducers/post';

function addPostAPI(){

}
function addCommentAPI(){
    
}

function* addPost(){
    try {
        yield delay(2000);
        yield put({
            type: ADD_POST_SUCCESS,
        });
    } catch (e) {
        console.error(e);
        yield put({
            type: ADD_POST_FAILURE,
            error: e,
        })
    }
}
function* addComment(action){
    try {
        yield delay(2000)
        yield put({
            type: ADD_COMMENT_SUCCESS,
            data: {
                postId: action.data.postId
            }
        });
    } catch (e) {
        console.error(e);
        yield put({
            type: ADD_COMMENT_FAILURE,
        });
    }
}


function* watchAddPost(){
    yield takeLatest(ADD_POST_REQUEST, addPost);
}
function* watchAddComment(){
    yield takeLatest(ADD_COMMENT_REQUEST, addComment);
}


export default function* postSaga(){
    yield all([
        fork(watchAddPost),
        fork(watchAddComment),
    ]);
}