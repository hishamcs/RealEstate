import {createStore, combineReducers, applyMiddleware} from 'redux';
import {thunk} from 'redux-thunk';
import {composeWithDevTools} from '@redux-devtools/extension';

import {userListFetchReducer, userLoginReducer} from '../src/redux/reducers/userReducers'
import { fetchPropertiesReducer } from './redux/reducers/propertyReducer';


const reducer = combineReducers({
    userLogin:userLoginReducer,
    userList:userListFetchReducer,
    properties:fetchPropertiesReducer,
})

const userInfoFromStorage = localStorage.getItem('userInfo') ?
    JSON.parse(localStorage.getItem('userInfo')) : null

const initialState = {
    userLogin: { userInfo: userInfoFromStorage },
}

const middleware = [thunk]

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store