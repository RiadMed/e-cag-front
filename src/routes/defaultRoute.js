import React from 'react';
import {Navigate, Route} from 'react-router-dom';
import {useSelector} from "react-redux";

const DefaultRoute = () => {

    const {isLogin} = useSelector((state) => state.security);

    return (
        <Route
            restricted={false}
            exact
            path="/"
            render={() => {
                return (
                    isLogin ?
                        <Navigate to="/home"/> :
                        <Navigate to="/login"/>
                )
            }}
        />
    );
}

export default DefaultRoute;