import React, { useContext, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import authContext from '../../context/Auth/authContext';

const Navbar = ({ title, icon}) => {
    const context = useContext(authContext);

    const { isAuthenticated, logout, user } = context;

    const onLogout = () => {
        logout();
    }

    const authLinks = (
        <Fragment>
            <li>
                Hello { isAuthenticated && user ? user.name : ''}
            </li>
            <li>
                <a href="#!" onClick={ onLogout } >
                    <i className="fas fa-sign-out-alt"></i> <span className="hide-sm">Logout</span>
                </a>
            </li>
        </Fragment>
    );

    const guestLinks = (
        <Fragment>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
        </Fragment>
    );

    return (
        <div className="navbar bg-primary">
            <h1>
                <i className={icon} /> {title}
            </h1>
            <ul>
                { isAuthenticated ? authLinks : guestLinks }
            </ul>
            
        </div>
    )
}

Navbar.propTypes = {
    title: PropTypes.string.isRequired,
    icon : PropTypes.string
}

Navbar.defaultProps = {
    title : 'Contacts Keeper',
    icon : 'fas fa-id-card-alt'
}

export default Navbar
