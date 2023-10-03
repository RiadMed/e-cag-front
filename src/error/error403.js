import React from 'react';
import {Button, Result} from "antd";
import {HomeOutlined} from "@ant-design/icons";
import {useNavigate} from "react-router";

const Error403 = () => {
    const navigate = useNavigate();
    return (
        <Result
            status="403"
            title="403"
            subTitle="Sorry, you are not authorized to access this page."
            extra={<Button type="primary" danger icon={<HomeOutlined />}
                           onClick={() => navigate('/home')} size={`small`}>Accueil</Button>}
        />
    );
}

export default Error403;