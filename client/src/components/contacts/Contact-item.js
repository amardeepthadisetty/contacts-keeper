import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import contactContext from '../../context/contact/contactContext';

export const ContactItem = ({ contact }) => {
    const {id, name, email, phone, type} = contact;
    const context = useContext(contactContext);
    const { deleteContact, setCurrentContact, clearContact } = context;

    const onDelete = () => {
        deleteContact(id);

        //clear the current item
        clearContact();
    }
    return (
        <div className="card bg-light">
            <h3 className="text-primary text-left">
                { name }{' '} 
                <span style={{
                    float : 'right'
                }} className={'badge ' + (type==='professional' ? 'badge-success' : 'badge-primary' )}>
                    {type.charAt(0).toUpperCase() + type.slice(1) }
                </span>
                <ul className='list'>
                    {email && (
                        <li>
                            <i className='fas fa-envelope-open' /> {email}
                        </li>
                    )}
                    {phone && (
                        <li>
                            <i className='fas fa-phone' /> {phone}
                        </li>
                    )}
                </ul>

                <p>
                    <button
                        className='btn btn-dark btn-sm'
                        onClick={ () => setCurrentContact(contact) }
                    >
                        Edit
                     </button>
                    <button className='btn btn-danger btn-sm' onClick={onDelete} >
                        Delete
                    </button>
                </p>



            </h3>
            
        </div>
    )
}

ContactItem.propTypes = {
    contact : PropTypes.object.isRequired
}

export default ContactItem;
