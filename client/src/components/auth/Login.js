import React, { useState, useContext, useEffect } from 'react';
import authContext from '../../context/Auth/authContext';
import alertContext from '../../context/Alert/alertContext';

const Login = (props) => {
    const context = useContext(authContext);
    const alertContextRef = useContext(alertContext);

    const { login, isAuthenticated, error, clearError } = context;
    const { setAlert } = alertContextRef;
    const [user, setUser] = useState({
        email: '',
        password: ''
    });

    const {  email, password } = user;

    useEffect(() => {
        if (isAuthenticated) {
            props.history.push('/');
        }
        console.log("login page component : ", error );
        if (error === 'Invalid Credentials') {
            setAlert(error, 'danger', 6000);
            clearError();
        }
        //eslint-disable-next-line
    }, [error, isAuthenticated, props.history]);

    const onChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });

    const onSubmitHandler = (e) => {
        e.preventDefault();
        if ( email === '' || password === '' ) {
            setAlert('Please enter all fields', 'danger');
        }else{
            login({
                email,
                password
            });

        }
    }
    return (
        <div className="form-container">
            <h1>
                Account <span className="text-primary">Login</span>
            </h1>
            <form onSubmit={onSubmitHandler}>
                

                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="text" name="email" value={email} onChange={onChange} />
                </div>

                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" value={password} onChange={onChange} />
                </div>

                
                <input type="submit" value="Login" className="btn btn-primary btn-block" />
            </form>
        </div>
    )
}

export default Login;
