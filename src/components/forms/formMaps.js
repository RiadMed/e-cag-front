import React from 'react';
import {Checkbox, Col, Input, Select} from "antd";
import TextArea from "antd/lib/input/TextArea";

const FormMaps = ({fields, onChange}) => {

    return (
        fields.map(field => {
            switch (field.type) {
                case 'check':
                    return <Col key={field.key} span={field.colspan}>
                        <Checkbox name={field.name}
                                  value={field.value}
                                  disabled={field.disabled}
                                  onChange={onChange}>
                            {field.label}
                        </Checkbox>
                        <div style={{margin: '24px 0'}}/>
                    </Col>
                case 'textarea':
                    return <Col key={field.key} span={field.colspan}>
                        <TextArea
                            allowClear
                            name={field.name}
                            value={field.value}
                            placeholder={field.placeholder}
                            disabled={field.disabled}
                            autoSize={field.size}
                        />
                        <div style={{margin: '24px 0'}}/>
                    </Col>
                case 'select':
                    return <Col key={field.key} span={field.colspan}>
                        <Select
                            label={field.label}
                            mode={field.mode ? field.mode : ''}
                            name={field.name}
                            value={field.value}
                            placeholder={field.placeholder}
                            onChange={field.onChangeValue}
                            onClear={field.onClearValue}
                            allowClear
                            disabled={field.disabled}
                            style={{width: "99%"}}>
                            {field.items.map(item => (
                                <Select.Option key={item.id}
                                               value={field.itemValue ? `item.${field.itemValue}` : item.id}>
                                    {field.itemLabel ? `item.${field.itemLabel}` : item.label}
                                </Select.Option>
                            ))}
                        </Select>
                        <div style={{margin: '24px 0'}}/>
                    </Col>
                default:
                    return <Col key={field.key} span={field.colspan}>
                        <Input
                            allowClear
                            type={field.type}
                            name={field.name}
                            value={field.value}
                            placeholder={field.placeholder}
                            disabled={field.disabled}
                            onChange={onChange}
                            addonBefore={field.label}/>
                        <div style={{margin: '24px 0'}}/>
                    </Col>
            }
        })
    );
}

export default FormMaps;
