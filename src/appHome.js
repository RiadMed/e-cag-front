import React from 'react';
import AppRouter from "./appRouter";
import Template from "./templates/template";
import Login from "./security/page/login";
import {useSelector} from "react-redux";
import FirstLogin from "./security/page/firstLogin";
import {Spin} from "antd";

const AppHome = () => {

    const {isLogin, user, loading} = useSelector((state) => state.security);

    return (
        <Spin spinning={loading}>
            {isLogin ? (user.nouveauCompte ? <FirstLogin/> : <Template><AppRouter/></Template>) : (<Login/>)}
        </Spin>
    );
}

export default AppHome;