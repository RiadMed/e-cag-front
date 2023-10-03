import React, {useEffect, useState} from 'react';
import {Navigate, Route} from 'react-router-dom';
import {useSelector} from "react-redux";
import {TOKEN_KEYS} from "../const/staticKeys";

const PrivateRoute = ({component: Component, role, ...rest}) => {

    const {isLogin} = useSelector((state) => state.security);

    const [checkRoles, setCheckRoles] = useState([]);

    const isMounted = React.useRef(true);

    useEffect(() => {
        isMounted.current = false;
        if (isMounted.current)
            setCheckRoles(role.filter(item => localStorage.getItem(TOKEN_KEYS.ROLES) && !localStorage.getItem(TOKEN_KEYS.ROLES).includes(item)));
        return () => {
            isMounted.current = false;
        }
    }, []);

    return (
        <Route  {...rest} render={props => (
            isLogin && localStorage.getItem(TOKEN_KEYS.ROLES) && checkRoles.length === 0 ?
                <Component {...props} />
                : <Navigate to="/exceptions/403"/>
        )}/>
    );
};

export default PrivateRoute;