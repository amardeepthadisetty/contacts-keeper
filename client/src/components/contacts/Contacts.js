import React, { Fragment, useContext } from 'react';
import contactContext from '../../context/contact/contactContext';
import ContactItem from './Contact-item';

const Contacts = () => {
    const context = useContext(contactContext);

    const { contacts, filtered } =  context;

    if (contacts.length === 0) {
        return <h4>Please add a contact </h4>
        
    }
    return (
        <Fragment>
            {
                filtered !== null ? 
                    filtered.map(contact =>
                        <ContactItem key={contact.id} contact={contact} />
                    ) :
                contacts.map(contact => 
                <ContactItem key={contact.id} contact={contact} /> 
                )
            }
            
        </Fragment>
    )
}

export default Contacts
