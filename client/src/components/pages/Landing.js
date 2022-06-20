import React, { useState, useContext, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';

const Landing = () => {
    const authContext = useContext(AuthContext);

    const { isAuthenticated } = authContext;

    useEffect(() => {
        if (isAuthenticated) {
            return <Redirect to='/home'/>;
        }
    }, [isAuthenticated]);

    return <Redirect to='/login'/>;
}

export default Landing;