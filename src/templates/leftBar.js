import React, {useEffect, useState} from 'react';
import {Menu} from "antd";
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {doGet} from "../redux/services/httpActions";
import IconApp from "./iconApp";

const LeftBar = () => {

    const navigate = useNavigate();
    const [menuList, setMenuList] = useState([]);

    const {isLogin, user} = useSelector((state) => state.security);


    useEffect(() => {
        if (isLogin) {
            let roleList = [];
            roleList = user.rolesList.map(a => a.id);
            const fetchMenu = async () => {
                const response = await doGet(`/menus?rolesIds=${roleList}`);
                setMenuList(response.data);
            }
            fetchMenu().catch((error) => {
                console.log('TEST ERROR fetchMenu ', error)
            })
        }
    }, [])

    const getItem = (label, key, icon, children, type) => {
        return {
            key,
            icon,
            children,
            label,
            type,
        };
    }

    let menuItem = [];
    menuItem = menuList.map(menu => {
        return getItem(menu.menuDescription, menu.menuLabel, <IconApp label={menu.menuLabel}/>)
    });

    const onClick = (e) => {
        navigate('/' + e.key);
    };

    return (
        <Menu
            onClick={onClick}
            style={{marginTop: "80px"}}
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['home']}
            mode="inline"
            items={menuItem}
        />
    );
}

export default LeftBar;
