import { all, call } from 'redux-saga/effects';
import user from './user.js';
import post from './post.js';

export default function* rootSaga(){
    yield all([
        call(user),
        call(post),
    ]);
}