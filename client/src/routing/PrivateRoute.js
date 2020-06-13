import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import authContext from '../context/Auth/authContext';

const PrivateRoute = ({ component: Component, ...rest }) => {
    const authContextRef = useContext(authContext);

    const { isAuthenticated } = authContextRef;
    return (
        <Route {...rest} render={ props => !isAuthenticated ? (
            <Redirect to="/login" />
        ) : (
            <Component { ...props } />
        ) } />
    )
};

export default PrivateRoute;
