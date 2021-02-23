import {all, fork, put, takeLatest, delay, call } from 'redux-saga/effects';
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
axios.defaults.baseURL = 'http://localhost:8088/api';

/*******[ login ]**********/
function loginAPI(data){
    //서버에 요청을 보내는 부분
    return axios.post('/user/login', data, {
        withCredentials: true, // 쿠키를 주고받는다.
    });
}
function* login(action){
    try{
        const result = yield call(loginAPI, action.data);
        yield put({ // put은 dispatch 동일
            type: LOG_IN_SUCCESS,
            data: result.data,
        });
    } catch(error){
        console.error(error);
        yield put({
            type: LOG_IN_FAILURE,
            error: error.response.data,
        });
    }
}
function* watchLogin(){
    yield takeLatest(LOG_IN_REQUEST, login);
}

/*******[ logout ]**********/
function logoutAPI(){
    return axios.post('/logout/');
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
function* watchLogout(){
    yield takeLatest(LOG_OUT_REQUEST, logout);
}

/*******[ signup ]**********/
function signupAPI(data){
    //서버에 요청을 보내는 부분
    return axios.post('/user/', data);
}
function* signup(action){
    try {
        yield call(signupAPI, action.data);
        yield put({
            type: SIGN_UP_SUCCESS
        });
    } catch (error) {
        console.error(error);
        yield put({
            type: SIGN_UP_FAILURE
        });
    }
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
