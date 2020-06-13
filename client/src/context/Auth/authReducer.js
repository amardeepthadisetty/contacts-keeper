import { REGISTER_FAIL, REGISTER_SUCCESS, CLEAR_ERRORS, AUTH_ERROR, USER_LOADED,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT
 } from '../types';

export default ( state, action ) => {
    switch (action.type) {
        
        case USER_LOADED:
            return {
                ...state,
                isAuthenticated:true,
                loading: false,
                user : action.payload
            }
            
        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
            localStorage.setItem('token', action.payload.token);
            return {
                ...state, 
                token : action.payload.token,
                isAuthenticated: true,
                loading: false
            }
        case REGISTER_FAIL:
        case LOGIN_FAIL:
        case AUTH_ERROR: 
        case LOGOUT: 
            localStorage.setItem('token', '');    
            return {
                ...state,
                token: '',
                isAuthenticated: false,
                loading : false,
                user: null,
                error: action.payload
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error : null
            }    
        
    
        default:
            return state;
    }
}