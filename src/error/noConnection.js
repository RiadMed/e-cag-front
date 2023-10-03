import React from 'react';
import {Button, Result} from "antd";
import {HomeOutlined, WarningOutlined} from "@ant-design/icons";
import {useNavigate} from "react-router";

const NoConnection = () => {

    const navigate = useNavigate();

    return (
        <Result
            status="error"
            icon={<WarningOutlined/>}
            title="You Are Offline"
            subTitle="Sorry, No Network Connection."
            extra={<Button type="default" icon={<HomeOutlined/>}
                           onClick={() => navigate('/home')} size={`small`}>Accueil</Button>}
        />
    );
}

export default NoConnection;