import  React, { useReducer } from 'react';
import axios from 'axios';
import contactContext from './contactContext';
import contactReducer from './contactReducer';
import {
    ADD_CONTACT, DELETE_CONTACT, SET_CURRENT, CLEAR_CURRENT, 
    UPDATE_CONTACT, FILTER_CONTACTS, CLEAR_FILTER, CLEAR_CONTACTS, CONTACT_ERROR,
    GET_CONTACTS
} from '../types';

const ContactState = props => {
    const INITIAL_STATE = {
        contacts : null,
        current : null,
        filtered: null, 
        error : null
    };

    const [state, dispatch] = useReducer(contactReducer, INITIAL_STATE);

    //GET CONTACTS 
    const getContactsFunc = async () => {
        

        try {
            const res = await axios.get('/api/contacts');

            dispatch({
                type: GET_CONTACTS,
                payload: res.data
            });

        } catch (error) {
            dispatch({
                type: CONTACT_ERROR,
                payload: error.response.data.msg
            });
        }

    } 

    //ADD CONTACTS
    const addContactFunc = async (contact) => {
        //contact.id = uuid();
        //console.log("add contact function", contact);
        const config = {
            headers : {
                'Content-Type' : 'application/json'
            }
        }

        try {
            const res = await axios.post('/api/contacts', contact, config);

            dispatch({
                type: ADD_CONTACT,
                payload: res.data
            });
            
        } catch (error) {
            //console.log(error);
             dispatch({
                type: CONTACT_ERROR,
                payload: error.response.msg
            }); 
        }
        
    }

    //DELETE A CONTACT
    const deleteContactFunc = async (id) => {
        try {
            const res = await axios.delete(`/api/contacts/${id}`);

            dispatch({
                type: DELETE_CONTACT,
                payload: id
            });

        } catch (error) {
            //console.log("error is: ", error);
             dispatch({
                type: CONTACT_ERROR,
                payload: error.response.msg
            }); 
        }
       
    }

    //UPDATE A CONTACT 
    const updateContactFunc = async (contact) => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        try {
            const res = await axios.put(`/api/contacts/${contact._id}`, contact, config);

            dispatch({
                type: UPDATE_CONTACT,
                payload: contact
            });

        } catch (error) {
            //console.log("error is: ", error);
            dispatch({
                type: CONTACT_ERROR,
                payload: error.response.msg
            });
        }
       
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
            error: state.error,
            addContact: addContactFunc,
            deleteContact: deleteContactFunc,
            setCurrentContact: setCurrentContactFunc,
            clearContact: clearContactFunc,
            updateContact:updateContactFunc,
            filterContacts :filterContactsFunc,
            clearFilter:clearFilterFunc,
            getContacts:getContactsFunc
        }}>
            { props.children }
        </contactContext.Provider>
    )
    


};

export default ContactState;