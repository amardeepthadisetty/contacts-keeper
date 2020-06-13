import React, { useReducer } from 'react';
import {v4 as uuid } from 'uuid';
import alertContext from './alertContext';
import alertReducer from './alertReducer';
import {
    SET_ALERT,
    REMOVE_ALERT
} from '../types';

const AlertState = props => {
    const INITIAL_STATE = [];

    const [state, dispatch] = useReducer(alertReducer, INITIAL_STATE);

   //SET ALERT
   const setAlertFunc = (msg, type, timeout= 5000) => {
        const id = uuid();
        dispatch({
            type : SET_ALERT,
            payload : { msg, type, id}
        });

        setTimeout(() => {
            dispatch({
                type : REMOVE_ALERT,
                payload: id
            });
        }, timeout);
   }

    return (
        <alertContext.Provider
            value={{
               alerts : state,
               setAlert : setAlertFunc

            }}>
            {props.children}
        </alertContext.Provider>
    )



};

export default AlertState;