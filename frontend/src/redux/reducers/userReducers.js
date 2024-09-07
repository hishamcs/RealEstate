
import {
    USER_LOGIN_FAIL,
    USER_LOGIN_SUCCESS,
    USER_LOGOUT,
    USER_LOGIN_REQUEST,

    USER_LIST_FETCH_FAIL,
    USER_LIST_FETCH_REQUEST,
    USER_LIST_FETCH_SUCCESS,

    USER_BLOCK_SUCCESS,
    USER_BLOCK_REQUEST,
    USER_BLOCK_FAIL

} from '../constants/userConstants'

export const userLoginReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_LOGIN_REQUEST:
            return { loading: true }

        case USER_LOGIN_SUCCESS:
            return { loading: false, userInfo: action.payload }

        case USER_LOGIN_FAIL:
            return { loading: false, error: action.payload }

        case USER_LOGOUT:
            return {}

        default:
            return state
    }
}

export const userListFetchReducer = (state = {}, action) => {
    switch(action.type) {
        case USER_LIST_FETCH_REQUEST:
            return {loading:true}
        case USER_LIST_FETCH_SUCCESS:
            return {loading:false, userList:action.payload}
        
        case USER_LIST_FETCH_FAIL:
            return {loading:false, error:action.payload}


        case USER_BLOCK_REQUEST:
            return {
                ...state,
                loading:true
            }

        case USER_BLOCK_SUCCESS:
            return {
                ...state,
                loading:false,
                userList:state.userList.map(user=>
                    user.id === action.payload.id ? {...user, is_active:action.payload.is_active}:user
                )
            }

        case USER_BLOCK_FAIL:
            return state

        case USER_LOGOUT:
            return {}
        default:
            return state
    }
}

