import {
    ADD_PROPERTY_SUCCESS,
    PROPERTY_BLOCK_FAIL,
    PROPERTY_BLOCK_REQUEST,
    PROPERTY_BLOCK_SUCCESS,
    PROPERTY_FETCH_FAIL,
    PROPERTY_FETCH_REQUEST,
    PROPERTY_FETCH_SUCCESS,
} from '../constants/propertyConstants'
import { USER_LOGOUT } from '../constants/userConstants'


export const fetchPropertiesReducer = (state={}, action) => {
    switch(action.type) {
        case PROPERTY_FETCH_REQUEST:
            return {loading:true}
        case PROPERTY_FETCH_SUCCESS:
            return {loading:false, properties:action.payload}
        case PROPERTY_FETCH_FAIL:
            return {loading:false, error:action.payload}

        case PROPERTY_BLOCK_REQUEST:
            return {
                ...state,
                loading:true
            }

        case PROPERTY_BLOCK_SUCCESS:
            return {
                ...state,
                loading:false,
                properties:state.properties.map(property=>
                    property.id === action.payload.id ? {...property, status:action.payload.status}:property
                )
                
            }
        case ADD_PROPERTY_SUCCESS:
            return {
                ...state,
                loading:false,
                properties:[action.payload, ...state.properties]
            }
        case PROPERTY_BLOCK_FAIL:
            return state
        case USER_LOGOUT:
            return {}
        default:
            return state
    }
}
