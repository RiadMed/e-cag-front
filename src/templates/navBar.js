import React from 'react';
import {BellOutlined, MailOutlined, PoweroffOutlined, WalletOutlined} from '@ant-design/icons';
import {Badge, Button, Divider, Popconfirm, Tooltip} from 'antd';
import {useNavigate} from "react-router-dom";
import {doLogout} from "../redux/services/securityAction";
import {useDispatch, useSelector} from "react-redux";

const NavBar = ({title, children}) => {

    const dispatch = useDispatch();
    const logout = () => dispatch(doLogout());
    const navigate = useNavigate();

    const {user} = useSelector((state) => state.security);

    const {count, countInvitation,} = useSelector((state) => state.notification);

    const userInfos = (
        <div className="logout-link" style={{margin: '18px 170px', fontSize: '16px', fontWeight: '500'}}>
            {user.fullName}
        </div>);

    const userLinks = (
        <div>

            <div className="logout-link">
                {user.isAdmin ?
                    <Badge count={count} style={{marginTop: "15px", marginRight: "100px"}}>
                        <Button type="link" className="nav-link" size={'large'}
                                style={{marginTop: "10px", marginRight: "100px", color: "#565554"}}
                                onClick={() => navigate('/sessionCAGs/aValider')}
                                icon={<BellOutlined style={{fontSize: "25px"}}/>}></Button>
                    </Badge> : <></>}

            </div>

            <div className="logout-link">
                {user.isMembre ?
                    <Badge count={countInvitation} style={{marginTop: "15px", marginRight: "55px"}}>
                        <Button type="link" className="nav-link" size={'large'}
                                style={{marginTop: "10px", marginRight: "50px", color: "#565554"}}
                                onClick={() => navigate('/sessionCAGInvitations')}
                                icon={<MailOutlined style={{fontSize: "25px"}}/>}></Button>
                    </Badge> : <></>}

            </div>
            <div className="logout-link">
                <a className="nav-link" onClick={() => onLogout()}><PoweroffOutlined
                    style={{marginTop: "19px", marginRight: "10px"}}/></a>
            </div>
        </div>
    );

    const onLogout = () => {
        logout();
        navigate(`/login`)
    }


    return (
        <nav className="navbar navbar-expand-sm navbar-dark navbar-bkg">
            {children}
            <a className="navbar-brand">
                <Divider type="vertical" style={{height: "25px", paddingRight: "10px", borderColor: "#dee2e6"}} dashed/>
                <WalletOutlined style={{marginRight: '7px', fontSize: '20px'}}/> {title}
            </a>
            {userInfos}
            {userLinks}
        </nav>

    );
}

export default NavBar;
