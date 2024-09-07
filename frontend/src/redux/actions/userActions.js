import axiosInstance from '../../axios';
import {
    USER_LOGIN_FAIL,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_REQUEST,

    USER_LIST_FETCH_REQUEST,
    USER_LIST_FETCH_SUCCESS,
    USER_LIST_FETCH_FAIL,
    
    USER_BLOCK_FAIL,
    USER_BLOCK_REQUEST,
    USER_BLOCK_SUCCESS,
    USER_LOGOUT
} from '../constants/userConstants'


export const login = (email, password) => async (dispatch) => {

    try {
        dispatch({
            type: USER_LOGIN_REQUEST
        })

        console.log(email)
        console.log(password)

        const {data} = await axiosInstance.post('user/login/', { 'email': email, 'password': password })
        console.log('data : ', data)

        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        })

        localStorage.setItem('userInfo', JSON.stringify(data))

    } catch (error) { 
        dispatch({
            type: USER_LOGIN_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
        throw new Error(error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message);
    }
}


export const userListFetch = (url = 'user/allusers/') => async(dispatch) => {
    try {
        dispatch({
            type: USER_LIST_FETCH_REQUEST
        })

        const {data} = await axiosInstance.get(url)

        dispatch({
            type: USER_LIST_FETCH_SUCCESS,
            payload:data
        })


    } catch(error){
        console.log(error)
        dispatch({
            type:USER_LIST_FETCH_FAIL,
            payload:error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message
        })

    }


}


export const userBlock = (userId) => async(dispatch) => {
    
    try{

        dispatch({
            type:USER_BLOCK_REQUEST
        })
        console.log('requeteddd')
        const {data} = await axiosInstance.patch('user/allusers/', {'userId':userId})
        console.log('data in block : ', data)
        dispatch({
            type:USER_BLOCK_SUCCESS,
            payload:data
        })

    } catch(error) {
        dispatch({
            type:USER_BLOCK_FAIL,
            payload:error.response&&error.response.data.detail
                ? error.response.data.detail
                :error.message
        })
        throw new Error(error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message);
    }
}


export const logout = () => async(dispatch) => {
    localStorage.removeItem('userInfo')
    dispatch({type:USER_LOGOUT})
}