import React from 'react';
import {Button, Col, Divider, Form, Input, Layout, Space} from "antd";
import Controls from "../../components";
import {CheckOutlined, CloseOutlined, EyeInvisibleOutlined, EyeTwoTone, LockOutlined} from "@ant-design/icons";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router";
import {resetPassword} from "../../redux/services/securityAction";

const FirstLogin = () => {

    const navigate = useNavigate();
    const [form] = Form.useForm();

    const {Footer} = Layout;
    const dispatch = useDispatch();
    const {user} = useSelector((state) => state.security);

    const submitPassword = async (value) => {
        const addValue = {userId: user.id}
        let newValue = Object.assign(value, addValue);
        await dispatch(resetPassword(newValue, user, navigate));
    }

    return (
        <Layout>
            <Layout>
                <Col md={{span: 10, offset: 7}} style={{marginTop: '5%'}}>
                    <Controls.Cards title="Modifier votre mot de passe">
                        <br/>
                        <Form
                            form={form}
                            name="normal_login"
                            className="login-form"
                            initialValues={{remember: true}}
                            onFinish={submitPassword}
                            style={{marginTop: '10px'}}>
                            <span><strong>Mot de passe</strong> (de 8 à 16 caractères, dont au moins 1 lettre majuscule, 1 lettre minuscule et 1 chiffre)</span>
                            <Form.Item
                                hasFeedback
                                style={{marginTop: "5px"}}
                                name="newPassword"
                                rules={[
                                    {required: true, message: 'Please input your Password!.'},
                                    {min: 8, message: 'Nombre minumum des caractères est 8.'},
                                    {max: 16, message: 'Nombre maximum des caractères est 16.'},
                                    {pattern: '(?=.*[A-Z])', message: 'Ajoutez au moins 1 lettre majuscule.'},
                                    {pattern: '(?=.*\\d)', message: 'Ajoutez au moins 1 chiffre.'}
                                ]}>
                                <Input.Password
                                    prefix={<LockOutlined className="site-form-item-icon"
                                                          style={{color: "rgb(153 153 153)"}}/>}
                                    size="large" allowClear
                                    placeholder="Nouveau mot de passe"
                                    iconRender={(visible) => (visible ? <EyeTwoTone/> : <EyeInvisibleOutlined/>)}
                                />
                            </Form.Item>

                            <br/>
                            <span><strong>Confirmez votre mot de passe</strong> (identique au précédent)</span>
                            <Form.Item
                                hasFeedback
                                style={{marginTop: "5px"}}
                                name="confirmPassword"
                                rules={[
                                    {required: true, message: 'Please input your Password!.'},
                                    {min: 8, message: 'Nombre minumum des caractères est 8.'},
                                    {max: 16, message: 'Nombre maximum des caractères est 16.'},
                                    {pattern: '(?=.*[A-Z])', message: 'Ajoutez au moins 1 lettre majuscule.'},
                                    {pattern: '(?=.*\\d)', message: 'Ajoutez au moins 1 chiffre.'}
                                ]}>
                                <Input.Password
                                    prefix={<LockOutlined className="site-form-item-icon"
                                                          style={{color: "rgb(153 153 153)"}}/>}
                                    size="large" allowClear
                                    placeholder="Confirmer le mot de passe"
                                    iconRender={(visible) => (visible ? <EyeTwoTone/> : <EyeInvisibleOutlined/>)}
                                />
                            </Form.Item>
                            <br/>
                            <Form.Item>
                                <Space style={{float: 'right'}}>
                                    <Divider type="vertical" style={{borderColor: "#d0d0d0"}}/>
                                    <Button
                                        icon={<CloseOutlined/>}
                                        onClick={() => form.resetFields()}>
                                        Reset
                                    </Button>
                                    <Button danger type="primary" htmlType="submit" icon={<CheckOutlined/>}>
                                        Valider
                                    </Button>
                                </Space>
                            </Form.Item>
                        </Form>
                    </Controls.Cards>
                </Col>
            </Layout>
            <Footer style={{textAlign: "center"}}>
                <strong>G-TECH</strong> | Tous droits réservés | Apps ©2023.<br/><br/>
                <img alt={"Logo de la wilaya d'alger"} src={process.env.PUBLIC_URL + '/alg.png'} width="50"
                     height="70"/>
            </Footer>
        </Layout>
    );
}

export default FirstLogin;