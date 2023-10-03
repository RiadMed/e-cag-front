import React from 'react';
import {Tabs} from "antd";
import {useSelector} from "react-redux";
import {ROLES_KEYS} from "../../const/staticKeys";
import {checkRolesUser} from "../../redux/services/securityAction";
import HomeAdmin from "./homeAdmin";
import HomeSecretaire from "./homeSecretaire";
import HomeMembre from "./homeMembre";

function Home() {

    const {user, isLogin} = useSelector((state) => state.security);

    const checkRoles = (roles) => {
        if (isLogin)
            return checkRolesUser(user.rolesList.map(x => x.label), roles);
        return false;
    }


    const items = [
        {
            key: '1',
            label: 'Home (Secretaire)',
            disabled: !checkRoles([ROLES_KEYS.ROLE_SECRETAIRE]),
            children: <HomeSecretaire/>,
        },
        {
            key: '2',
            label: 'Home (Admin)',
            disabled: !checkRoles([ROLES_KEYS.ROLE_ADMIN]),
            children: <HomeAdmin/>,
        },
        {
            key: '3',
            label: 'Home (Membre)',
            disabled: !checkRoles([ROLES_KEYS.ROLE_MEMBRE]),
            children: <HomeMembre/>,
        },
    ];


    return (
        <Tabs items={items} type="card"
              defaultActiveKey={checkRoles([ROLES_KEYS.ROLE_SECRETAIRE]) ? "1" : checkRoles([ROLES_KEYS.ROLE_ADMIN]) ? "2" : "3"}/>
    );
}

;

export default Home;