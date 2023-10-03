import React from 'react';
import {Button} from "antd";
import {useNavigate} from "react-router-dom";

const NavigateButtons = ({type, url,title, icon}) => {
    const navigate = useNavigate();
    return (
        <Button type={type}
                onClick={() => navigate(url)}
                icon={icon}
        >
            {title}
        </Button>
    );
}

export default NavigateButtons;
