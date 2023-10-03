import React from 'react';
import {CloseCircleOutlined} from "@ant-design/icons";
import {Button, Divider} from "antd";
import {useNavigate} from "react-router";

const CloseButton = ({router, children}) => {
    const navigate = useNavigate();
    return (
        <>
            {children}
            <Divider type="vertical"
                     style={{borderColor: '#e0e0e0', height: "20px", marginRight: "20px"}}/>
            <Button type='link' danger icon={<CloseCircleOutlined/>}
                    onClick={() => navigate(router, {replace: true})}></Button>
        </>
    );
}

export default CloseButton;