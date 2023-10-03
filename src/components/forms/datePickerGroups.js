import React from 'react';
import {DatePicker, Form} from 'antd';
import dayjs from "dayjs";
import 'dayjs/locale/fr';

dayjs.locale('fr');

const DatePickerGroups = ({
                              name,
                              label,
                              placeholder,
                              rules,
                              disabled,
                              labelCol,
                              wrapperCol,
                              dateFormat,
                              onChange,
                              isCreate
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
            {isCreate ?
                <DatePicker placeholder={placeholder}
                            onChange={onChange}
                            showTime={{format: 'HH:mm'}}
                            format="YYYY-MM-DD HH:mm"
                            style={{width: '100%'}}
                            value={dayjs()}
                            disabled={disabled}/>
                :
                <DatePicker placeholder={placeholder}
                            onChange={onChange}
                            showTime={{format: 'HH:mm'}}
                            format="YYYY-MM-DD HH:mm"
                            style={{width: '100%'}}
                            disabled={disabled}
                />
            }
        </Form.Item>
    );
}

export default DatePickerGroups;
