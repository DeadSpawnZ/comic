import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isAuthenticated } from './authentication';
import Navigation from '../components/Navigation';
/**
 * Create a public route
 * @param { component, options } param
*/
export const PrivateRoute = ({component, ...options}) => {
    const isAuth = isAuthenticated();
    if (isAuth) return <div><Navigation /><Route {...options} component={component} /></div>
    return <Redirect to="/login" />
}

export const PublicRoute = ({component, ...options}) => {
    const isAuth = isAuthenticated();
    if (!isAuth) return <Route {...options} component={component} />
    return <Redirect to="/comics" />
}