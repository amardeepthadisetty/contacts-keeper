import React, { useState, useContext, useEffect } from 'react';
import contactContext from '../../context/contact/contactContext';

const ContactForm = () => {
    const context = useContext(contactContext);
    const [contact, setContact] = useState({
        name : '',
        email : '',
        phone : '',
        type : 'personal'
    });

    const { name, email, phone, type } = contact;

    const { addContact, current, clearContact, updateContact } = context;

    useEffect(() => {
        if (current !== null) {
            setContact(current);
        }else{
            setContact({
                name: '',
                email: '',
                phone: '',
                type: 'personal'
            });

        }
    }, [contactContext, current ]);

    const onChange = (e) => setContact({ ...contact, [e.target.name] : e.target.value });

    const onSubmitHandler = e => {
        e.preventDefault();

        if (current === null) {
            addContact(contact);
        }else{
            updateContact(contact);
        }

        clearContact();
    }

    const clearAll = () => { 
         clearContact();
    }
    return (
        <form onSubmit={ onSubmitHandler }>
            <h2 className="text-primary">
                { !current ? 'Add Contact': 'Edit contact'}
            </h2>
            <input 
            type="text" 
            name="name" 
            placeholder="Provide a name" 
            value={name} 
            onChange = {onChange}
            />
            <input
                type="text"
                name="email"
                placeholder="Provide a email"
                value={email}
                onChange={onChange}
            />
            <input
                type="text"
                name="phone"
                placeholder="Provide a phone"
                value={phone}
                onChange={onChange}
            />
            <h5>Contact Type</h5>
            <input
                type="radio"
                name="type"
                value="personal"
                checked={type === "personal"}
                onChange={onChange}
            />Personal {' '}
            <input
                type="radio"
                name="type"
                value="professional"
                checked={type === "professional"}
                onChange={onChange}
                
            />Professional {' '}
            <div>
                <input type="submit" className="btn btn-primary btn-block" value={ !current ? 'Add Contact' : 'Edit contact'} />
            </div>
            {
                current && 
                (
                    <button className="btn btn-light btn-block" onClick={clearAll} >Clear</button>
                )
            }
        </form>
    )
}

export default ContactForm
