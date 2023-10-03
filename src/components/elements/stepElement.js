import React from 'react';
import {Steps} from "antd";

const StepElement = ({current, items, onChange}) => {
    return (
        <Steps
            type="navigation"
            size="small"
            current={current}
            onChange={onChange}
            className="site-navigation-steps"
            items={items}
        />
    );
}

export default StepElement;