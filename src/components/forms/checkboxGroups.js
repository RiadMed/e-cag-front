import React from 'react';
import {Checkbox, Form} from "antd";

const CheckboxGroups = ({name, label, rules, disabled, labelCol, wrapperCol}) => {
    return (
        <Form.Item
            labelCol={labelCol}
            wrapperCol={wrapperCol}
            name={name}
            label={label}
            key={name}
            rules={rules}
            valuePropName="checked">
            <Checkbox disabled={disabled}/>
        </Form.Item>
    );
}

export default CheckboxGroups;
