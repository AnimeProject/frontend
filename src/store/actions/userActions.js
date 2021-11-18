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
export const RESET_USER_ANIMES = "RESET_USER_ANIMES";

export const GETTING_USER_START = "GETTING_USER_START";
export const GETTING_USER_SUCCESS = "GETTING_USER_SUCCESS";
export const GETTING_USER_FAILED = "GETTING_USER_FAILED";

export const FETCH_USER_ANIME_START = "FETCH_USER_ANIME_START";
export const FETCH_USER_ANIME_SUCCESS = "FETCH_USER_ANIME_SUCCESS";
export const FETCH_USER_ANIME_ERROR = "FETCH_USER_ANIME_ERROR";

export const POST_ANIME_START = 'POST_ANIME_START';
export const POST_ANIME_SUCCESS = 'POST_ANIME_SUCCESS';
export const POST_ANIME_ERROR = 'POST_ANIME_ERROR';

export const PUT_ANIME_START = 'PUT_ANIME_START';
export const PUT_ANIME_SUCCESS = 'PUT_ANIME_SUCCESS';
export const PUT_ANIME_ERROR = 'PUT_ANIME_ERROR';

export const GETTING_USER_FRIENDS_START = "GETTING_USER_FRIENDS_START";
export const GETTING_USER_FRIENDS_SUCCESS = "GETTING_USER_FRIENDS_SUCCESS";
export const GETTING_USER_FRIENDS_FAILED = "GETTING_USER_FRIENDS_FAILED";

export const DELETE_ANIME_START = "DELETE_ANIME_START";
export const DELETE_ANIME_SUCCESS = "DELETE_ANIME_SUCCESS";
export const DELETE_ANIME_ERROR = "DELETE_ANIME_ERROR";

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
export const resetUserAnimes = () => {
    return {type: RESET_USER_ANIMES}
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

export const fetchUserFriends = (id) => (dispatch) => {
    dispatch({type: GETTING_USER_FRIENDS_START})
    axiosWithAuth().get(`https://animenu.herokuapp.com/api/friends/${id}`)
        .then(res => {
            dispatch({type: GETTING_USER_FRIENDS_SUCCESS, payload: res.data})
        })
        .catch(err => {
            dispatch({type: GETTING_USER_FRIENDS_FAILED, payload: err})
        })
}

export const fetchUserAnime = (anime_id) => (dispatch) => {
    dispatch({type: FETCH_USER_ANIME_START})
    axios.get(`https://api.jikan.moe/v3/anime/${anime_id}`)
        .then(res => {
            dispatch({type: FETCH_USER_ANIME_SUCCESS, payload: res.data})
        })
        .catch(err => {
            dispatch({type: FETCH_USER_ANIME_ERROR, payload: err})
        })
}

export const addAnimeToList = (anime) => (dispatch) => {
    axiosWithAuth().post('https://animenu.herokuapp.com/api/lists', anime)
        .then(res => {
            dispatch({type: POST_ANIME_SUCCESS, payload: {
                anime_id: anime.anime_id,
                completed: anime.completed,
                list_id: res.data.list_id,
                rating: anime.rating
            }})
        }).catch(error => {
            dispatch({type: POST_ANIME_ERROR, action: error.response.data.message})
        })
}

export const updateAnime = (id, anime) => (dispatch) => {
    const {idx, ...rest} = anime;
    dispatch({ type: PUT_ANIME_START })
    axiosWithAuth().put(`https://animenu.herokuapp.com/api/lists/${id}`, rest)
        .then(res => {
            dispatch({type: PUT_ANIME_SUCCESS, payload: {list_id: res.data[0].list_id, rest, idx}})
        }).catch(error => {
            dispatch({type: PUT_ANIME_ERROR, action: error.response.data.message})
        })
}

export const deleteAnime = (id, anime_id) => (dispatch) => {
    dispatch({ type: DELETE_ANIME_START })
    axiosWithAuth().delete(`https://animenu.herokuapp.com/api/lists/${id}`)
        .then(res => {
            dispatch({type: DELETE_ANIME_SUCCESS, payload: anime_id})
        }).catch(error => {
            dispatch({type: DELETE_ANIME_ERROR, action: error.message})
        })
}