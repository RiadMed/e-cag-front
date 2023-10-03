import React from 'react';
import {Button, Divider, Form, Input, Space} from "antd";
import Controls from "../../components";
import {ArrowLeftOutlined, CheckOutlined, CloseOutlined, MailOutlined} from "@ant-design/icons";
import {useDispatch} from "react-redux";
import {BACK_TO_LOGIN} from "../../redux/reducers/securityReducer";
import {sendPassword} from "../../redux/services/securityAction";

const ForgotPassword = () => {

    const [form] = Form.useForm();
    const dispatch = useDispatch();

    const onSendPassword = async (value) => {
        await dispatch(sendPassword(value));
    }

    return (

        <Controls.Cards title="Demander un nouveau mot de passe">
            <br/>
            <Form
                form={form}
                name="normal_login"
                className="login-form"
                initialValues={{remember: true}}
                onFinish={onSendPassword}
                style={{marginTop: '10px'}}>
                <span>Votre adresse mail (un mot de passe temporaire sera envoyé à cette adresse)</span>
                <br/>
                <br/>
                <Form.Item
                    hasFeedback
                    style={{marginTop: "5px"}}
                    name="mail"
                    rules={[
                        {required: true, message: 'Please input your email!.'},
                        {type: "email", message: 'Format incorrecte.'}
                    ]}>
                    <Input prefix={<MailOutlined className="site-form-item-icon"
                                                 style={{color: "rgb(153 153 153)"}}/>}
                           allowClear size={'large'}
                           placeholder="votre email"/>
                </Form.Item>
                <br/>
                <Form.Item>
                    <Space style={{float: 'right'}}>
                        <Button
                            size={'small'}
                            danger
                            htmlType="button"
                            icon={<ArrowLeftOutlined/>}
                            onClick={() => {
                                dispatch({type: BACK_TO_LOGIN});
                            }}>
                            Retour
                        </Button>
                        <Divider type="vertical" style={{borderColor: "#d0d0d0"}}/>
                        <Button
                            size={'small'}
                            icon={<CloseOutlined/>}
                            onClick={() => form.resetFields()}>
                            Reset
                        </Button>
                        <Button
                            size={'small'}
                            danger type="primary"
                            htmlType="submit"
                            icon={<CheckOutlined/>}>
                            Valider
                        </Button>
                    </Space>
                </Form.Item>
            </Form>
        </Controls.Cards>
    );
}

export default ForgotPassword;