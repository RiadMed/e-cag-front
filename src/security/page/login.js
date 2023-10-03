import React from 'react';
import {Button, Col, Form, Input, Layout} from "antd";
import {EyeInvisibleOutlined, EyeTwoTone, LockOutlined, UserOutlined} from "@ant-design/icons";
import {doLogin} from "../../redux/services/securityAction";
import {useDispatch, useSelector} from "react-redux";
import Controls from "../../components";
import {useNavigate} from "react-router-dom";
import {GO_TO_FORGOT_PASS} from "../../redux/reducers/securityReducer";
import ForgotPassword from "./forgotPassword";

const Login = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {Footer} = Layout;
    const login = async (value) => await dispatch(doLogin(value, navigate));

    const onFinish = async (values) => {
        await login(values);
    };

    const {forgot} = useSelector(state => state.security);

    let logo = <img src={process.env.PUBLIC_URL + '/alg.png'} width="50" height="70" alt={"Logo de la wilaya d'alger"}/>

    return (


        <Layout>
            <Layout>
                <Col md={{span: 8, offset: 8}} style={{marginTop: '5%'}}>
                    {forgot ? <ForgotPassword/> :
                        <Controls.Cards title="Bienvenu au E-CAG Portal Web App!">
                            <br/>
                            <Form
                                name="normal_login"
                                className="login-form"
                                initialValues={{remember: true}}
                                onFinish={onFinish}
                                style={{marginTop: '10px'}}
                                autoComplete="off">

                                <Form.Item
                                    hasFeedback
                                    style={{marginTop: "5px"}}
                                    name="username"
                                    rules={[{required: true, message: 'Please input your Username!'}]}>
                                    <Input prefix={<UserOutlined className="site-form-item-icon"
                                                                 style={{color: "rgb(153 153 153)"}}/>}
                                           allowClear
                                           placeholder="code d'utilisateur"
                                           size="large"/>
                                </Form.Item>

                                <Form.Item
                                    hasFeedback
                                    style={{marginTop: "5px"}}
                                    name="password"
                                    rules={[{required: true, message: 'Please input your Password!'}]}>
                                    <Input.Password
                                        prefix={<LockOutlined className="site-form-item-icon"
                                                              style={{color: "rgb(153 153 153)"}}/>}
                                        size="large"
                                        allowClear
                                        placeholder="Mot de passe"
                                        iconRender={(visible) => (visible ? <EyeTwoTone/> :
                                            <EyeInvisibleOutlined/>)}
                                    />
                                </Form.Item>

                                <a href="#" className="login-form-forgot" onClick={() => {
                                    dispatch({type: GO_TO_FORGOT_PASS})
                                }}>
                                    J'ai oublié mon mot de passe.
                                </a>
                                <br/>
                                <br/>
                                <Form.Item>
                                    <Button danger type="primary" htmlType="submit"
                                            className="login-form-button">
                                        Log in
                                    </Button>
                                </Form.Item>
                            </Form>
                        </Controls.Cards>
                    }
                </Col>
            </Layout>
            <Footer style={{textAlign: "center"}}>
                <strong>G-TECH</strong> | Tous droits réservés | Apps ©2023.<br/><br/>
                {logo}
            </Footer>
        </Layout>

    );
}

export default Login;
