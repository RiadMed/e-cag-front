import React from 'react';
import TextArea from "antd/lib/input/TextArea";
import {Form} from "antd";

const TextAreaGroups = ({label, placeholder, name, rules, size, disabled, labelCol, wrapperCol,autoFocus}) => {
    return (
        <Form.Item
            labelCol={labelCol}
            wrapperCol={wrapperCol}
            name={name}
            key={name}
            label={label}
            hasFeedback
            rules={rules}>
            <TextArea
                allowClear
                placeholder={placeholder}
                autoFocus={autoFocus ? autoFocus : false}
                disabled={disabled}
                autoSize={size}
            />
        </Form.Item>
    );
}

export default TextAreaGroups;
