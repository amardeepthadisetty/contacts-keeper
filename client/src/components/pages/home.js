import React, { useContext, useEffect } from 'react';
import Contacts from '../contacts/Contacts';
import ContactForm from '../contacts/ContactForm';
import ContactFilter from '../contacts/ContactFilter';
import authContext from '../../context/Auth/authContext';

const Home = () => {
    const context = useContext(authContext);

    const { loadUser } = context;

    useEffect(() =>{
        loadUser();
        //eslint-disable-next-line
    },[]);
    return (
        <div className="grid-2">
            <div>
                {/* Contacts form */}
                
                <ContactForm />
            </div>
            

            <div>
                { /* this is to show up list of contacts and filter */}
                <ContactFilter />
                <Contacts />
            </div>
        </div>
    )
}

export default Home;
