import React, {useEffect, useState} from 'react';
import {FloatButton, Layout, notification} from "antd";
import {
    CaretUpOutlined,
    InfoCircleOutlined,
    LeftSquareOutlined,
    MailOutlined,
    RightSquareOutlined
} from '@ant-design/icons';
import NavBar from "./navBar";
import LeftBar from "./leftBar";
import {useSelector} from "react-redux";

const {Content, Footer, Sider} = Layout;

const Template = (props) => {

    const [collapsed, setCollapsed] = useState(true);

    const {count, countInvitation} = useSelector((state) => state.notification);
    const {user} = useSelector((state) => state.security);
    const [api, contextHolder] = notification.useNotification();

    const openNotification = (placement, count, message, icon) => {
        api.info({
            message: `Notification : `,
            description:
                `Vous avez ${count} ${message}.`,
            icon,
            placement,
        });
    };

    useEffect(() => {
        if (count > 0 && user.isAdmin) {
            openNotification('bottomRight', count, 'planifications à valider.', <InfoCircleOutlined
                style={{color: '#ffc069'}}/>);
        }

        if (countInvitation > 0 && user.isMembre) {
            openNotification('bottomRight', countInvitation, 'nouvelles invitations.', <MailOutlined
                style={{color: '#108ee9'}}/>);
        }
    }, [user, count, countInvitation]);

    const onCollapse = () => {
        setCollapsed(!collapsed)
    };

    let logo = <img src={process.env.PUBLIC_URL + '/logo.png'}
                    alt={"Logo de l'application E-CAG"}
                    width="80" height="100"
                    style={{marginTop: "-35px", marginLeft: `${collapsed ? "0px" : "60px"}`}}/>


    const style = {
        height: 40,
        width: 40,
        lineHeight: '40px',
        borderRadius: 50,
        backgroundColor: '#384047',
        color: '#fff',
        textAlign: 'center',
        fontSize: 14,
    };


    return (
        <Layout style={{minHeight: "100vh"}}>
            <Sider collapsible
                   trigger={null}
                   collapsed={collapsed}
                   onCollapse={onCollapse}
                   theme="dark">
                <div className="logo">
                    {logo}
                </div>
                <LeftBar/>

                <div className="logo-footer">
                    <img alt={"Logo de la wilaya d'alger"}
                         src={process.env.PUBLIC_URL + '/alg.png'} width="50" height="70"
                         style={{
                             marginLeft: `${collapsed ? "10px" : "60px"}`,
                             marginTop: "-50px",
                             marginRight: "10px"
                         }}/>
                </div>
            </Sider>
            <Layout className="site-layout">
                <NavBar title="CAG Portal Web App">
                    {React.createElement(collapsed ? RightSquareOutlined : LeftSquareOutlined, {
                        className: 'trigger paddingRight-10',
                        onClick: onCollapse,
                    })}
                </NavBar>
                <Content style={{margin: "16px 16px"}}>
                    {contextHolder}
                    <div
                        className="site-layout-background"
                        style={{padding: 24, minHeight: 360, border: "1px solid #dadada"}}>
                        {props.children}
                    </div>

                    <FloatButton.BackTop>
                        <div style={style}><CaretUpOutlined/></div>
                    </FloatButton.BackTop>
                </Content>
                <Footer style={{textAlign: "center"}}>
                    <strong>G-TECH</strong> | Tous droits réservés | Apps ©2023.
                </Footer>
            </Layout>
        </Layout>
    );
}

export default Template;
