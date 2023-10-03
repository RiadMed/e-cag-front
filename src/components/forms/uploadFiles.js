import React, {useEffect, useState} from 'react';
import {Col, Form, Row} from 'antd';
import Controls from "../index";

const UploadFiles = ({label, name, title, multiple, form}) => {

    const [items, setItems] = useState([]);

    useEffect(() => {
        if (items)
            form.setFieldsValue({files: items});

    }, [items, form]);

    const onFileUpload = (event) => {
        let file = event.target.files[0];
        let reader = new FileReader();
        if (file) {
            reader.readAsDataURL(file);
            reader.onload = readerLoaded.bind(this);
            event = null;
        }
    }

    const readerLoaded = (readerEvent) => {
        const file64 = {
            id: items.length + 1,
            label: `image-0${items.length + 1}`,
            file: readerEvent.target.result.toString().split(',')[1]
        };
        if (multiple) {
            setItems([...items, file64]);
        } else {
            setItems([]);
            setItems([file64]);
        }
    }

    const onFileDelete = (id) => {
        setItems(items.filter(x => id !== x.id));
    }

    return (
        <div>
            <Form.Item
                name={name}
                key={name}
                label={label}>
                <Controls.Uploads title={title} onFileUpload={(readerEvent) => onFileUpload(readerEvent)}/>
            </Form.Item>
            <Row gutter={24}>
                <Col span={3}></Col>
                <Col span={19}>
                    <Controls.Lists items={items} onFileDelete={(id) => onFileDelete(id)}/>
                </Col>
            </Row>
        </div>

    );
}

export default UploadFiles;
