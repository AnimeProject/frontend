import axios from "axios"
import axiosWithAuth from '../../utils/axiosWithAuth'

export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_ERROR = "LOGIN_ERROR";
export const LOG_OUT_SUCCESS = "LOG_OUT_SUCCESS";

export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_ERROR = "REGISTER_ERROR";

export const GETTING_USER_START = "GETTING_USER_START";
export const GETTING_USER_SUCCESS = "GETTING_USER_SUCCESS";
export const GETTING_USER_FAILED = "GETTING_USER_FAILED";

export const FETCH_USER_ANIME_START = "FETCH_USER_ANIME_START";
export const FETCH_USER_ANIME_SUCCESS = "FETCH_USER_ANIME_SUCCESS";
export const FETCH_USER_ANIME_ERROR = "FETCH_USER_ANIME_ERROR";

export const POST_ANIME_START = 'POST_ANIME_START';
export const POST_ANIME_SUCCESS = 'POST_ANIME_SUCCESS';
export const POST_ANIME_ERROR = 'POST_ANIME_ERROR';

export const handleLogin = (user) => (dispatch) => {
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

export const handleRegister = (user) => (dispatch) => {
    axios.post('https://animenu.herokuapp.com/api/users/register', user)
        .then(res => {
            dispatch({type: REGISTER_SUCCESS, payload: res.data})
            // localStorage.setItem('token', res.data.token)
        })
        .catch(err => {
            dispatch({type: REGISTER_ERROR, payload: err.message})
        })
}

// Anime Crud
export const getUserData = (id) => (dispatch) => {
    dispatch({type: GETTING_USER_START})
    axios.get(`https://animenu.herokuapp.com/api/users/${id}`)
        .then(res => {
            dispatch({type: GETTING_USER_SUCCESS, payload: res.data})
        })
        .catch(err => {
            dispatch({type: GETTING_USER_FAILED, payload: err.message})
        })
}

export const fetchUserAnimes = (animes) => (dispatch) => {
    dispatch({ type: FETCH_USER_ANIME_START })
    const promises = Promise.all(animes.map((anime) => {
        return axios.get(`https://api.jikan.moe/v3/anime/${anime.anime_id}`)
    }))
    promises.then(res => {
        dispatch({type: FETCH_USER_ANIME_SUCCESS, payload: res})
    }).catch(error => {
        dispatch({type:FETCH_USER_ANIME_ERROR, payload: error})
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