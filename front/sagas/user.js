import {all, fork, put, takeLatest, delay } from 'redux-saga/effects';
import axios from 'axios';

import {
    LOG_IN_REQUEST,
    LOG_IN_SUCCESS, 
    LOG_IN_FAILURE, 
    SIGN_UP_REQUEST, 
    SIGN_UP_SUCCESS, 
    SIGN_UP_FAILURE, 
    LOG_OUT_SUCCESS, 
    LOG_OUT_FAILURE, 
    LOG_OUT_REQUEST
} from '../reducers/user';

function loginAPI(){
    //서버에 요청을 보내는 부분
    return axios.post('/login');
}
function logoutAPI(){
    return axios.post('/logout');
}
function signupAPI(){
    //서버에 요청을 보내는 부분
    return axios.post('/signUp');
}


function* login(){
    try{
        //yield call(loginAPI);
        yield delay(2000);
        yield put({ // put은 dispatch 동일
            type: LOG_IN_SUCCESS
        });
    } catch(e){
        console.error(e);
        yield put({
            type: LOG_IN_FAILURE
        });
    }
}
function* logout(){
    try {
        yield delay(2000);
        yield put({
            type: LOG_OUT_SUCCESS
        })
    } catch (e) {
        console.error(e);
        yield put({
            type: LOG_OUT_FAILURE
        })
    }
}
function* signup(){
    try {
        //yield call(signupAPI);
        yield delay(2000);
        yield put({
            type: SIGN_UP_SUCCESS
        });
    } catch (e) {
        console.error(e);
        yield put({
            type: SIGN_UP_FAILURE
        });
    }
}


function* watchLogin(){
    yield takeLatest(LOG_IN_REQUEST, login);
}
function* watchLogout(){
    yield takeLatest(LOG_OUT_REQUEST, logout);
}
function* watchSignup(){
    yield takeLatest(SIGN_UP_REQUEST, signup);
}

export default function* userSaga(){
    yield all([
        fork(watchLogin),
        fork(watchSignup),
        fork(watchLogout),
    ]);
}
