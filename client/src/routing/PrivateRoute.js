import React, { useContext, useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import authContext from '../context/Auth/authContext';

const PrivateRoute = ({ component: Component, ...rest }) => {
    const authContextRef = useContext(authContext);

    const { isAuthenticated } = authContextRef;
    useEffect(() => {
        authContextRef.loadUser();
        //eslint-disable-next-line
    }, []);
    return (
        <Route {...rest} render={ props => !isAuthenticated ? (
            <Redirect to="/login" />
        ) : (
            <Component { ...props } />
        ) } />
    )
};

export default PrivateRoute;
