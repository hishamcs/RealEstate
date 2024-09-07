
import axiosInstance from '../../axios';
import {
    PROPERTY_FETCH_REQUEST,
    PROPERTY_FETCH_FAIL,
    PROPERTY_FETCH_SUCCESS,
    PROPERTY_BLOCK_REQUEST,
    PROPERTY_BLOCK_SUCCESS,
    ADD_PROPERTY_REQUEST,
    ADD_PROPERTY_SUCCESS
} from '../constants/propertyConstants'

export const fetchProperties = () => async (dispatch) => {
    try {
        dispatch({
            type: PROPERTY_FETCH_REQUEST
        })

        const {data} = await axiosInstance.get('property/')
        
        dispatch({
            type: PROPERTY_FETCH_SUCCESS,
            payload:data
        })

    } catch(error) {
        console.log('error : ', error)
        dispatch({
            type: PROPERTY_FETCH_FAIL,
            payload: error.response && error.response.data
                ? error.response.data.detail
                :error.message
        })
    }
}

export const propertyBlock = (propertyId) => async(dispatch) => {

    try{
        dispatch({
            type:PROPERTY_BLOCK_REQUEST
        })

        const {data} = await axiosInstance.patch('property/', {propertyId})

        dispatch({
            type:PROPERTY_BLOCK_SUCCESS,
            payload:data
        })
    } catch(error) {
        console.log('errorrrrrr : ', error)
        throw new Error(
            error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message
        )
    }
}

export const addProperty = (formData) => async(dispatch) => {

    try{

        dispatch({
            type: ADD_PROPERTY_REQUEST
        })

        const {data} = await axiosInstance.post('property/', formData)

        dispatch({
            type:ADD_PROPERTY_SUCCESS,
            payload:data
        })

    } catch(error) {
        throw new Error(
            error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message
        )
    }
}