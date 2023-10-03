import React from 'react';
import {CheckOutlined, CloseOutlined} from '@ant-design/icons'
import {Form, Switch} from "antd";

const SwitchGroups = ({name, label, rules, disabled, labelCol, wrapperCol})=> {
    return (
        <Form.Item
            labelCol={labelCol}
            wrapperCol={wrapperCol}
            name={name}
            key={name}
            label={label}
            rules={rules}>
            <Switch
                checkedChildren={<CheckOutlined/>}
                unCheckedChildren={<CloseOutlined/>}
                defaultChecked
                disabled={disabled}
            />
        </Form.Item>
    );
}

export default SwitchGroups;
