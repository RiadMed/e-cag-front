import React from 'react';
import {Button} from "antd";

const Buttons = ({color, type, icon, onClick, style, title, size, disabled}) => {

    return (

        <Button
            type={color}
            htmlType={type}
            icon={icon}
            onClick={onClick}
            size={size ? size : 'middle'}
            style={style}
            disabled={disabled}
            danger>
            {title}
        </Button>
    );
}

export default Buttons;
