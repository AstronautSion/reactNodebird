import axios from 'axios';
import {all, fork, put, takeLatest, call } from 'redux-saga/effects';
import {
    LOG_IN_REQUEST,
    LOG_IN_SUCCESS, 
    LOG_IN_FAILURE, 
    LOG_OUT_REQUEST,
    LOG_OUT_SUCCESS, 
    LOG_OUT_FAILURE, 
    SIGN_UP_REQUEST, 
    SIGN_UP_SUCCESS, 
    SIGN_UP_FAILURE, 
    LOAD_MAIN_USER_REQUEST, 
    LOAD_MAIN_USER_SUCCESS, 
    LOAD_MAIN_USER_FAILURE, 
} from '../reducers/user';

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
    return axios.post('/user/logout', {} , {
        withCredentials: true,
    });
}
function* logout(){
    try {
        yield call(logoutAPI)
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
    return axios.post('/user', data);
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
            type: SIGN_UP_FAILURE,
            error: error.response.data,
        });
    }
}
function* watchSignup(){
    yield takeLatest(SIGN_UP_REQUEST, signup);
}

/*******[ load user ]**********/
function loadUserAPI(data){
    //서버에 요청을 보내는 부분
    return axios.get( data ? `/user/${data}` : '/user/',{
        withCredentials:true
    });
}
function* loadUser(action){
    console.log('actions>>',action);
    try {
        const result = yield call(loadUserAPI, action.data);
        console.log('***result Data',result.data, action.data);
        yield put({
            type: LOAD_MAIN_USER_SUCCESS,
            data: result.data,
            me: !action.data,
        });
    } catch (error) {
        console.error(error);
        yield put({
            type: LOAD_MAIN_USER_FAILURE,
            error,
        });
    }
}
function* watchLoadUser(){
    yield takeLatest(LOAD_MAIN_USER_REQUEST, loadUser);
}


export default function* userSaga(){
    yield all([
        fork(watchLogin),
        fork(watchSignup),
        fork(watchLogout),
        fork(watchLoadUser)
    ]);
}
