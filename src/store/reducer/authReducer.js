import {LOGIN_SUCCESS, LOGIN_ERROR, LOG_OUT_SUCCESS, REGISTER_ERROR, REGISTER_SUCCESS, GETTING_USER_SUCCESS, GETTING_USER_FAILED, FETCH_USER_ANIME_START, FETCH_USER_ANIME_SUCCESS, FETCH_USER_ANIME_ERROR, POST_ANIME_SUCCESS, POST_ANIME_ERROR, GETTING_USER_FRIENDS_START, GETTING_USER_FRIENDS_SUCCESS, GETTING_USER_FRIENDS_FAILED, PUT_ANIME_SUCCESS, PUT_ANIME_ERROR, EDITING_CHANGE, DELETE_ANIME_SUCCESS, DELETE_ANIME_ERROR, RESET_MESSAGES, RESET_REGISTER} from '../actions/userActions'

export const initialState = {
    user: {
        user_id: 0,
        username: '',
        animes: [],
        friends: [],
    },
    userAnimes: [],
    loading: false,
    loadingFriends: false,
    postSuccessMessage: '',
    userFetched: false,
    isLoggedIn: false,
    isRegistered: false,
    isEditing: false,
    deleteErrors: '',
    errors: '',
    postErrors: '',
}

export const authReducer = (state = initialState, action) => {
    switch(action.type){
        case LOGIN_SUCCESS:
            return {
                ...state,
                user: {
                    user_id: action.payload.id,
                    username: '',
                    animes: [],
                    friends: [],
                },
                isLoggedIn: true,
            }
        case LOGIN_ERROR:
            return {
                ...state,
                errors: action.payload,
            }
        case LOG_OUT_SUCCESS:
            return initialState

        case EDITING_CHANGE:
            return {
                ...state,
                isEditing: action.payload,
            }
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
        case REGISTER_SUCCESS:
            return {
                ...state,
                isRegistered: true,
            }
        case REGISTER_ERROR:
            return {
                ...state,
                errors: action.payload,
            }
        case GETTING_USER_SUCCESS:
            return {
                ...state,
                user: action.payload,
                errors: '',
                userFetched: true,
            }
        case GETTING_USER_FAILED:
            return {
                ...state,
                userFetched: false,
                errors: action.payload
            }
        case FETCH_USER_ANIME_START:
            return {
                ...state,
                loading: true,
                errors: '',
            }
        case FETCH_USER_ANIME_SUCCESS:
            return {
                ...state,
                userAnimes: action.payload,
                errors: '',
                loading: false,
            }
        case FETCH_USER_ANIME_ERROR:
            return {
                ...state, 
                loading: false,
                errors: action.payload,
            }
        case POST_ANIME_SUCCESS:
            return {
                ...state,
                postErrors: '',
                postSuccessMessage: 'Anime has been added to your list!',
                user: {
                    ...state.user,
                    animes: [...state.user.animes, action.payload]
                },
            }
        case POST_ANIME_ERROR:
            return {
                ...state,
                postSuccessMessage:'',
                postErrors: action.action,
            }
        case GETTING_USER_FRIENDS_START:
            return {
                ...state,
                loadingFriends: true,
            }
        case GETTING_USER_FRIENDS_SUCCESS:
            return {
                ...state,
                user: {
                    ...state.user,
                    friends: action.payload
                },
                loadingFriends: false,
                errors: '',
            }
        case GETTING_USER_FRIENDS_FAILED:
            return {
                ...state,
                error: action.payload,
                loadingFriends: false,
            }
        case PUT_ANIME_SUCCESS: {
            const newArray = [...state.user.animes];
            newArray[action.payload.idx] = {...action.payload.rest, list_id: action.payload.list_id}
            return {
                ...state,
                isEditing: false,
                user: {
                    ...state.user,
                    animes: newArray
                },
            }
        }
        case PUT_ANIME_ERROR:
            return {
                ...state,
                putErrors: action.action,
            }
        case DELETE_ANIME_SUCCESS:
            const userArray = state.user.animes.filter((anime) => anime.anime_id !== action.payload)
            const userAnimes = state.userAnimes.filter((anime) => anime.data.mal_id !== action.payload)
            return {
                ...state,
                user: {
                    ...state.user,
                    animes: userArray
                },
                userAnimes: userAnimes,
                deleteErrors: '',
            }
        case DELETE_ANIME_ERROR:
            return {
                ...state,
                deleteErrors: action.action
            }
        default:
            return state;
    }
}