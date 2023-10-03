import React from 'react';
import {Button, Result} from "antd";
import {HomeOutlined} from "@ant-design/icons";
import {useNavigate} from "react-router";

const Error500 = () => {
    const navigate = useNavigate();
    return (
        <Result
            status="500"
            title="500"
            subTitle="Sorry, something went wrong."
            extra={<Button type="primary" danger icon={<HomeOutlined />}
                           onClick={() => navigate('/home')} size={`small`}>Accueil</Button>}
        />
    );
}

export default Error500;