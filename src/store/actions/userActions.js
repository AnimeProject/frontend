import axios from "axios"
import axiosWithAuth from '../../utils/axiosWithAuth'

export const LOGIN_START = "LOGIN_START";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_ERROR = "LOGIN_ERROR";
export const LOG_OUT_SUCCESS = "LOG_OUT_SUCCESS";
export const RESET_MESSAGES = "RESET_MESSAGES";

export const REGISTER_START = "REGISTER_START";
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_ERROR = "REGISTER_ERROR";
export const RESET_REGISTER = "RESET_REGISTER";

export const GETTING_USER_START = "GETTING_USER_START";
export const GETTING_USER_SUCCESS = "GETTING_USER_SUCCESS";
export const GETTING_USER_FAILED = "GETTING_USER_FAILED";

export const POST_ANIME_START = 'POST_ANIME_START';
export const POST_ANIME_SUCCESS = 'POST_ANIME_SUCCESS';
export const POST_ANIME_ERROR = 'POST_ANIME_ERROR';

export const handleLogin = (user) => (dispatch) => {
    dispatch({type: LOGIN_START})
    axios.post('https://animenu.herokuapp.com/api/users/login', user)
        .then(res => {
            dispatch({type: LOGIN_SUCCESS, payload: res.data})
            localStorage.setItem('token', res.data.token)
        })
        .catch(err => {
            dispatch({type: LOGIN_ERROR, payload: err.message})
        })
}

export const logOut = () => {
    return {type: LOG_OUT_SUCCESS, payload: false}
}
export const resetMessages = () => {
    return {type: RESET_MESSAGES}
}
export const resetRegister = () => {
    return {type: RESET_REGISTER}
}

export const handleRegister = (user) => (dispatch) => {
    dispatch({type: REGISTER_START})
    axios.post('https://animenu.herokuapp.com/api/users/register', user)
        .then(res => {
            dispatch({type: REGISTER_SUCCESS, payload: res.data})
        })
        .catch(err => {
            dispatch({type: REGISTER_ERROR, payload: err.message})
        })
}

// Anime Crud
export const getUserData = (id) => (dispatch) => {
    dispatch({type: GETTING_USER_START})
    axiosWithAuth().get(`https://animenu.herokuapp.com/api/users/${id}`)
        .then(res => {
            dispatch({type: GETTING_USER_SUCCESS, payload: res.data})
        })
        .catch(err => {
            dispatch({type: GETTING_USER_FAILED, payload: err.response.data.message})
        })
}

export const addAnimeToList = (anime) => (dispatch) => {
    axiosWithAuth().post('https://animenu.herokuapp.com/api/lists', anime)
        .then(res => {
            dispatch({type: POST_ANIME_SUCCESS})
        }).catch(error => {
            dispatch({type: POST_ANIME_ERROR, action: error.response.data.message})
        })
}