import {LOGIN_SUCCESS, LOGIN_ERROR, LOG_OUT_SUCCESS, REGISTER_ERROR, REGISTER_SUCCESS, GETTING_USER_SUCCESS, GETTING_USER_FAILED, POST_ANIME_SUCCESS, POST_ANIME_ERROR, RESET_MESSAGES, RESET_REGISTER, LOGIN_START, REGISTER_START} from '../actions/userActions'
import {FETCH_DATA_START} from '../actions/dataAction'

export const initialState = {
    user: {
        user_id: 0,
        username: '',
        animes: [],
        friends: [],
    },
    loading: false,
    postSuccessMessage: '',
    userFetched: false,
    isLoggedIn: false,
    isRegistered: false,
    errors: '',
    postErrors: '',
}

export const authReducer = (state = initialState, action) => {
    switch(action.type){
        case LOGIN_START:
            return{
                ...state, 
                loading:true,
            }
        case LOGIN_SUCCESS:
            return {
                ...state,
                user: {
                    user_id: action.payload.id,
                    username: '',
                    animes: [],
                    friends: [],
                },
                loading:false,
                isLoggedIn: true,
                errors: '',
            }
        case LOGIN_ERROR:
            return {
                ...state,
                loading: false,
                errors: action.payload,
            }
        case LOG_OUT_SUCCESS:
            return initialState
        case RESET_MESSAGES:
            return {
                ...state,
                postSuccessMessage: '',
                postErrors: '',
            }
        case RESET_REGISTER:
            return {
                ...state,
                isRegistered: false,
            }
        case REGISTER_START:
            return {
                ...state,
                loading: true,
            }
        case REGISTER_SUCCESS:
            return {
                ...state,
                isRegistered: true,
                loading: false,
                errors: ''
            }
        case REGISTER_ERROR:
            return {
                ...state,
                errors: action.payload,
                loading: false,
            }
        case GETTING_USER_SUCCESS:
            return {
                ...state,
                user: action.payload,
                loading: true,
                errors: '',
                userFetched: true,
            }
        case GETTING_USER_FAILED:
            return {
                ...state,
                userFetched: false,
                errors: action.payload
            }
        case POST_ANIME_SUCCESS:
            return {
                ...state,
                postErrors: '',
                postSuccessMessage: 'Anime has been added to your list!',
            }
        case POST_ANIME_ERROR:
            return {
                ...state,
                postSuccessMessage:'',
                postErrors: action.action,
            }
        case FETCH_DATA_START:
            return {
                ...state,
                userFetched: false,
            }
        default:
            return state;
    }
}