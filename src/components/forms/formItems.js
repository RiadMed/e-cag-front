import React from 'react';
import Controls from "../index";
import {Col} from 'antd';

const FormItems = ({fields, form, isCreate}) => {
    return (
        fields.map(field => {
            const colspan = field.colspan ? field.colspan : 24;
            switch (field.type) {
                case 'check':
                    return (<Col xs={24} sm={24} md={colspan} lg={colspan} xl={colspan} key={field.key}>
                        <Controls.CheckboxGroups label={field.label} key={field.key}
                                                 name={field.name} rules={field.rules}
                                                 disabled={field.disabled}
                                                 labelCol={field.labelCol} wrapperCol={field.wrapperCol}/>
                    </Col>);
                case'switch':
                    return (<Col xs={24} sm={24} md={colspan} lg={colspan} xl={colspan} key={field.key}>
                        <Controls.SwitchGroups label={field.label} key={field.key}
                                               name={field.name} rules={field.rules}
                                               disabled={field.disabled}
                                               labelCol={field.labelCol} wrapperCol={field.wrapperCol}/>
                    </Col>);
                case 'date':
                    return (<Col xs={24} sm={24} md={colspan} lg={colspan} xl={colspan} key={field.key}>
                        <Controls.DatePickerGroups label={field.label} key={field.key}
                                                   placeholder={field.placeholder} disabled={field.disabled}
                                                   name={field.name} rules={field.rules} dateFormat={field.dateFormat}
                                                   onChange={field.onChange} isCreate={isCreate}
                                                   labelCol={field.labelCol} wrapperCol={field.wrapperCol}/>
                    </Col>);
                case 'select':
                    return (<Col xs={24} sm={24} md={colspan} lg={colspan} xl={colspan} key={field.key}>
                        <Controls.SelectGroups items={field.items} placeholder={field.placeholder}
                                               label={field.label} key={field.key}
                                               name={field.name} rules={field.rules}
                                               onChangeValue={field.onChangeValue}
                                               labelInValue={fields.labelInValue}
                                               mode={field.mode}
                                               disabled={field.disabled}
                                               autoFocus={field.autoFocus}
                                               labelCol={field.labelCol} wrapperCol={field.wrapperCol}/>
                    </Col>);
                case 'selectObject':
                    return (<Col xs={24} sm={24} md={colspan} lg={colspan} xl={colspan} key={field.key}>
                        <Controls.SelectObjectGroup items={field.items} placeholder={field.placeholder}
                                                    label={field.label} key={field.key}
                                                    name={field.name} rules={field.rules}
                                                    onChangeValue={field.onChangeValue}
                                                    labelInValue={fields.labelInValue}
                                                    mode={field.mode}
                                                    onClearValue={field.onClearValue}
                                                    disabled={field.disabled}
                                                    autoFocus={field.autoFocus}
                                                    labelCol={field.labelCol} wrapperCol={field.wrapperCol}/>
                    </Col>);
                case 'file':
                    return (<Col xs={24} sm={24} md={colspan} lg={colspan} xl={colspan} key={field.key}>
                        <Controls.UploadFiles form={form}
                                              multiple={field.multiple}
                                              key={field.key}
                                              label={field.label}
                                              name={field.name}/>
                    </Col>);
                case 'textarea':
                    return (<Col xs={24} sm={24} md={colspan} lg={colspan} xl={colspan} key={field.key}>
                        <Controls.TextAreaGroups key={field.key} label={field.label}
                                                 rules={field.rules} disabled={field.disabled}
                                                 placeholder={field.placeholder} name={field.name}
                                                 labelCol={field.labelCol} wrapperCol={field.wrapperCol}
                                                 autoFocus={field.autoFocus}
                                                 size={field.size}/>
                    </Col>);
                case 'label':
                    return (<Col xs={24} sm={24} md={colspan} lg={colspan} xl={colspan} key={field.key}>
                        <Controls.FormLabel key={field.key} label={field.label}
                                            name={field.name}
                                            labelCol={field.labelCol} wrapperCol={field.wrapperCol}/>
                    </Col>);
                default :
                    return (<Col xs={24} sm={24} md={colspan} lg={colspan} xl={colspan} key={field.key}>
                        <Controls.InputGroups key={field.key} label={field.label}
                                              rules={field.rules} disabled={field.disabled}
                                              placeholder={field.placeholder} name={field.name}
                                              labelCol={field.labelCol} wrapperCol={field.wrapperCol}
                                              addOnBefore={field.addOnBefore}
                                              autoFocus={field.autoFocus}
                                              addOnAfter={field.addOnAfter}/>
                    </Col>);
            }

        })
    );
}

export default FormItems;
