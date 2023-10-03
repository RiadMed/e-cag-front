import React from 'react';
import {Form, Input} from "antd";

const InputGroups = ({
                         label,
                         type,
                         placeholder,
                         name,
                         rules,
                         disabled,
                         labelCol,
                         wrapperCol,
                         addOnBefore,
                         addOnAfter,
                         autoFocus
                     }) => {

    return (
        <Form.Item
            labelCol={labelCol}
            wrapperCol={wrapperCol}
            name={name}
            key={name}
            label={label}
            hasFeedback
            rules={rules}>
            <Input
                addonBefore={addOnBefore}
                allowClear
                id={name}
                type={type}
                placeholder={placeholder}
                disabled={disabled}
                autoFocus={autoFocus ? autoFocus : false}
                addonAfter={addOnAfter}/>

        </Form.Item>
    );
}

export default InputGroups;
