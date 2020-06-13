import React, { useReducer } from 'react';
import setAuthToken from '../../utils/setAuthToken';
import axios from 'axios';
import authContext from './authContext';
import authReducer from './authReducer';
import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    CLEAR_ERRORS
} from '../types';

const AuthState = props => {
    const INITIAL_STATE = {
        token: localStorage.getItem('token'),
        isAuthenticated : null,
        loading: true, 
        user: null,
        error : null
    };

    const [state, dispatch] = useReducer(authReducer, INITIAL_STATE);

    //LOAD USER
    const loadUserFunc = async () => {
        // load token into global headers
        if (localStorage.token) {
            setAuthToken(localStorage.token);
        }


        try {
            const res = await axios.get('/api/auth' );

            dispatch({
                type: USER_LOADED,
                payload : res.data
            });
        } catch (error) {
            dispatch({
                type: AUTH_ERROR,
                payload : error.response.data.msg
            });
        }
    }

    //REGISTER USER , SIGN THE USER UP
    const registerUserFunc = async (formData) => {
        const config = {
            header :{
                'Content-Type' :'application/json'
            }
            
        };

        try {
            const result = await axios.post('/api/users', formData, config);

            dispatch({
                type : REGISTER_SUCCESS,
                payload : result.data
            });

            loadUserFunc();
            
        } catch (error) {
            dispatch({
                type: REGISTER_FAIL,
                payload: error.response.data.msg
            });
        }
    }

    //LOGIN USER
    const loginFunc = async (formData) => {
        const config = {
            header: {
                'Content-Type': 'application/json'
            }

        };

        try {
            const result = await axios.post('/api/auth', formData, config);

            dispatch({
                type: LOGIN_SUCCESS,
                payload: result.data
            });

            loadUserFunc();

        } catch (error) {
            console.log("login function error is: ", error);
            dispatch({
                type: LOGIN_FAIL,
                payload: error.response.data.msg
            });
        }
    }

    //LOGOUT , CLEAR THE TOKEN
    const logoutFunc = () => dispatch({ type : LOGOUT });

    //CLEAR THE ERRORS
    const clearErrorFunc = () => dispatch({ type : CLEAR_ERRORS });



    return (
        <authContext.Provider
            value={{
                token : state.token,
                isAuthenticated: state.isAuthenticated,
                loading : state.loading,
                user: state.user,
                error: state.error,
                registerUser:registerUserFunc,
                clearError: clearErrorFunc,
                loadUser: loadUserFunc,
                login: loginFunc,
                logout: logoutFunc
                
            }}>
            {props.children}
        </authContext.Provider>
    )



};

export default AuthState;