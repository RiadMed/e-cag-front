import React from 'react';
import {Form} from "antd";

const FormLabel = ({label, name, key, labelCol, wrapperCol}) => {
    return (
        <Form.Item key={key} label={label} name={name}
                   labelCol={labelCol}
                   wrapperCol={wrapperCol}>
            <span className="ant-form-text" key={key + '-label'} render={(record) => record}></span>
        </Form.Item>
    );
}

export default FormLabel;