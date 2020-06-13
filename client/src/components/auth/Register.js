import React, { useState, useContext, useEffect } from 'react';

import authContext from '../../context/Auth/authContext';
import alertContext from '../../context/Alert/alertContext';

const Register = (props) => {
    const context = useContext(alertContext);
    const authContextRef = useContext(authContext);
    
    const { setAlert } =  context;
    const { registerUser, error, clearError, isAuthenticated } = authContextRef;

    useEffect(() => {
        if (isAuthenticated) {
            props.history.push('/');
        }
        if (error ==='Email already exists, please use a different one.') {
            setAlert(error, 'danger', 6000);
            clearError();
        }
        //eslint-disable-next-line
    }, [error, isAuthenticated, props.history]);


    const [user, setUser] = useState({
        name : '',
        email : '',
        password : '',
        password2 : ''
    });

    const { name, email, password, password2 } = user;

    const onChange = (e) => setUser({ ...user, [e.target.name] : e.target.value });

    const onSubmitHandler = (e) => {
        e.preventDefault();
        if (name==='' || email === '' || password==='' || password2==='') {
            setAlert('Please enter all fields', 'danger');
        }else if(password!==password2){
            setAlert('Passwords do not match', 'danger', 10000);
        }else{
            registerUser({
                name, 
                email,
                password
            });

        }
    }
    return (
        <div className="form-container">
            <h1>
                Account <span className="text-primary">Register</span>
            </h1>
            <form onSubmit={onSubmitHandler}>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input type="text" name="name" value={name} onChange={onChange} />
                </div>

                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="text" name="email" value={email} onChange={onChange} />
                </div>

                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" value={password} onChange={onChange} />
                </div>

                <div className="form-group">
                    <label htmlFor="password2">Confirm password</label>
                    <input type="password" name="password2" value={password2} onChange={onChange} />
                </div>
                <input type="submit" value="Register" className="btn btn-primary btn-block" />
            </form>
        </div>
    )
}

export default Register;
