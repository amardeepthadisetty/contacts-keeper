import React, { useContext, useRef, useEffect } from 'react';
import contactContext from '../../context/contact/contactContext';
const ContactFilter = () => {
    const context = useContext(contactContext);
    const text = useRef('');

    const { filterContacts, clearFilter, filtered } = context;

    useEffect(() => {
        if (filtered === null) {
            text.current.value = '';
        }
        //eslint-disable-next-line
    },[]);


    const filterOnChange = (e) => {
        if (text.current.value !== '') {
            //input has some value, so we need to call filter function
            filterContacts(e.target.value);
        }else{
            //input is empty so call clearFilter
            clearFilter();
        }
    }
    return (
        <form>
            <input ref={text} type="text" placeholder="Type to filter"
            onChange = { filterOnChange }
            />
            
        </form>
    )
}

export default ContactFilter;
