import  React, { useReducer } from 'react';
import {v4 as uuid} from 'uuid';
import contactContext from './contactContext';
import contactReducer from './contactReducer';
import {
    ADD_CONTACT, DELETE_CONTACT, SET_CURRENT, CLEAR_CURRENT, 
    UPDATE_CONTACT, FILTER_CONTACTS, CLEAR_FILTER, CLEAR_CONTACTS
} from '../types';

const ContactState = props => {
    const INITIAL_STATE = {
        contacts : [
            {
                id: 1,
                name: 'amar',
                email: 'sa3A@gmail.com',
                phone: '3432323222',
                type: 'Personal'
            },
            {
                id: 2,
                name: 'amar dee',
                email: 'tese@gmail.com',
                phone: '4444444434',
                type: 'Personal'
            }, {
                id: 3,
                name: 'amar bges',
                email: 'sds@gmail.com',
                phone: '6666666666',
                type: 'professional'
            }
        ],
        current : null,
        filtered: null
    };

    const [state, dispatch] = useReducer(contactReducer, INITIAL_STATE);

    //ADD CONTACTS
    const addContactFunc = (contact) => {
        contact.id = uuid();
        console.log("add contact function", contact);
        dispatch({
            type: ADD_CONTACT,
            payload: contact
        });
    }

    //DELETE A CONTACT
    const deleteContactFunc = (id) => {
        dispatch({
            type: DELETE_CONTACT,
            payload: id
        });
    }

    //SET A CONTACT
    const setCurrentContactFunc = (contact) => {
        dispatch({
            type: SET_CURRENT ,
            payload: contact
        });
    }

    //CLEARS A CONTACT
    const clearContactFunc = () => {
        dispatch({
            type: CLEAR_CONTACTS
        });
    }

    //UPDATE A CONTACT 
    
    const updateContactFunc = (contact) => {
        dispatch({
            type: UPDATE_CONTACT,
            payload: contact
        });
    }

    //FILTER THE CONTACTS BASED ON GIVEN TEXT
    const filterContactsFunc = (text) => {
        dispatch({
            type: FILTER_CONTACTS,
            payload: text
        });
    }

    //CLEAR THE FILTER
    const clearFilterFunc = () => {
        dispatch({
            type: CLEAR_FILTER
        });
    }




    return (
        <contactContext.Provider
        value={{
            contacts : state.contacts,
            current: state.current,
            filtered: state.filtered,
            addContact: addContactFunc,
            deleteContact: deleteContactFunc,
            setCurrentContact: setCurrentContactFunc,
            clearContact: clearContactFunc,
            updateContact:updateContactFunc,
            filterContacts :filterContactsFunc,
            clearFilter:clearFilterFunc
        }}>
            { props.children }
        </contactContext.Provider>
    )
    


};

export default ContactState;