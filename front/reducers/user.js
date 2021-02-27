const dummyUser = {
    nickname: '고양이',
    Post : [],
    Followings: [],
    Followers: [],
    signUpData: {}
};

export const initalState = {
    isLoggingOut: false, //로그아웃 시도중
    isLoggingIn: false, //로그인 시도중
    loginErrorReason: '', //로그인 에러 사유
    isSignedUp: false, //회원가입 성공
    isSigningUp: false, //회원가입 시도중
    signUpErrorReason: '', //회원가입 실패 사유
    me: null,
    followingList: [], //팔로잉 리스트
    followerList: [], //팔로워 리스트
    userInfo : null, //남의 정보
};

export const SIGN_UP_REQUEST = 'SIGN_UP_REQUEST';
export const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS';
export const SIGN_UP_FAILURE = 'SIGN_UP_FAILURE';

export const LOG_IN_REQUEST = 'LOG_IN_REQUEST';
export const LOG_IN_SUCCESS = 'LOG_IN_SUCCESS';
export const LOG_IN_FAILURE = 'LOG_IN_FAILURE';

export const LOAD_MAIN_USER_REQUEST = 'LOAD_MAIN_USER_REQUEST';
export const LOAD_MAIN_USER_SUCCESS = 'LOAD_MAIN_USER_SUCCESS';
export const LOAD_MAIN_USER_FAILURE = 'LOAD_MAIN_USER_FAILURE';

export const LOG_OUT_REQUEST = 'LOG_OUT_REQUEST';
export const LOG_OUT_SUCCESS = 'LOG_OUT_SUCCESS';
export const LOG_OUT_FAILURE = 'LOG_OUT_FAILURE';

export const LOAD_FOLLOW_REQUEST = 'LOAD_FOLLOW_REQUEST';
export const LOAD_FOLLOW_SUCCESS = 'LOAD_FOLLOW_SUCCESS';
export const LOAD_FOLLOW_FAILURE = 'LOAD_FOLLOW_FAILURE';

export const FOLLOW_USER_REQUEST = 'FOLLOW_USER_REQUEST';
export const FOLLOW_USER_SUCCESS = 'FOLLOW_USER_SUCCESS';
export const FOLLOW_USER_FAILURE = 'FOLLOW_USER_FAILURE';

export const UNFOLLOW_USER_REQUEST = 'UNFOLLOW_USER_REQUEST';
export const UNFOLLOW_USER_SUCCESS = 'UNFOLLOW_USER_SUCCESS';
export const UNFOLLOW_USER_FAILURE = 'UNFOLLOW_USER_FAILURE';

export const REMOVE_FOLLOWER_REQUEST = 'REMOVE_FOLLOWER_REQUEST';
export const REMOVE_FOLLOWER_SUCCESS = 'REMOVE_FOLLOWER_SUCCESS';
export const REMOVE_FOLLOWER_FAILURE = 'REMOVE_FOLLOWER_FAILURE';

export const ADD_POST_TO_ME = 'ADD_POST_TO_ME';
 

export const loginRequestAction = (data) =>({
    type: LOG_IN_REQUEST,
    data,
});
export const logoutRequestAction = {
    type: LOG_OUT_REQUEST,
};
export const signUpRequestAction = (data) => ({
    type: SIGN_UP_REQUEST,
    data,
});


const reducer  = (state = initalState, action) =>{
    switch(action.type){
        case LOG_IN_REQUEST : {
            return {
                ...state,
                isLoggingIn: true,
                
            }
        }
        case LOG_IN_SUCCESS:{
            return {
                ...state,
                me: action.data,
                isLoggingIn: false,
                isLoading: false,
            }
        }
        case LOG_IN_FAILURE:{
            return {
                ...state,
                isLoggingIn: false,
                isLoading: false,
                me: null,
                loginErrorReason: action.error,
            }
        }

        case LOG_OUT_REQUEST: {
            return {
                ...state,
                isLoggingOut:true,
            }
        }
        case LOG_OUT_SUCCESS: {
            return {
                ...state,
                isLoggingOut:false,
                isLoggingIn: false,
                me: null,
            }
        }
        case LOG_OUT_FAILURE: {
            return {
                ...state,
            }
        }

        case SIGN_UP_REQUEST: {
            return {
                ...state,
                isSigningUp: true,
                isSignedUp: false,
                signUpData : action.data,
                signUpErrorReason : '',
            }
        }
        case SIGN_UP_SUCCESS: {
            return{
                ...state,
                isSigningUp: false,
                isSignedUp: true,
            }
        }
        case SIGN_UP_FAILURE: {
            return{
                ...state,
                isSigningUp: false,
                isSignedUp: false,
                signUpErrorReason : action.error,
            }
        }

        case LOAD_MAIN_USER_REQUEST: {
            return {
                ...state,
            }
        }
        case LOAD_MAIN_USER_SUCCESS: {
            if(action.me){
                return{
                    ...state,
                    me: action.data
                }
            }
            return {
                ...state,
                userInfo: action.data,
            };
           
        }
        case LOAD_MAIN_USER_FAILURE: {
            return{
                ...state,
            }
        }
        default: {
            return {
                ...state,
            };
        }
    }
};

export default reducer;