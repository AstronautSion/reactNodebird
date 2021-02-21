import { combineReducers } from 'redux';
import user from './user.js';
import post from './post.js'

const rootReducer = combineReducers({
    user,
    post
}); 

export default rootReducer;