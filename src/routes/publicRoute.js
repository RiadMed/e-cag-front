import React from 'react';
import {Navigate, Route} from 'react-router-dom';

const PublicRoute = ({component: Component, restricted, ...rest}) => {

    return (
        <Route {...rest} render={props => (
            restricted ?
                <Navigate to="/about"/>
                : <Component {...props} />
        )}/>
    );
};

export default PublicRoute;
