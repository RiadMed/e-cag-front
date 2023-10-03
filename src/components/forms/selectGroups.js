import React from 'react';
import {Form, Select} from "antd";

const SelectGroups = ({
                          items,
                          label,
                          name,
                          mode,
                          rules,
                          disabled,
                          placeholder,
                          itemValue,
                          itemLabel,
                          onChangeValue,
                          onClearValue,
                          labelCol,
                          wrapperCol,
                          autoFocus
                      }) => {
    if (!items)
        items = [];

    return (
        <Form.Item
            labelCol={labelCol}
            wrapperCol={wrapperCol}
            name={name}
            label={label}
            hasFeedback
            rules={rules}>

            <Select mode={mode} placeholder={placeholder}
                    onChange={onChangeValue}
                    onClear={onClearValue}
                    allowClear
                    autoFocus={autoFocus ? autoFocus : false}
                    disabled={disabled}>
                {items.map(item => (
                    <Select.Option key={item.id} value={itemValue ? `item.${itemValue}` : item.id}>
                        {itemLabel ? `item.${itemLabel}` : item.label}
                    </Select.Option>
                ))}
            </Select>
        </Form.Item>

    );
}

export default SelectGroups;
