import React from 'react';
import Contacts from '../contacts/Contacts';
import ContactForm from '../contacts/ContactForm';
import ContactFilter from '../contacts/ContactFilter';

const Home = () => {
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
