import React from 'react';
import {Avatar, Button, Col, Image, List, Row} from "antd";
import {DeleteOutlined, PictureOutlined} from "@ant-design/icons";
import Moment from "moment";

const Lists = ({items, onFileDelete, spanLabel, spanInput}) => {
    return (
        <Row>
            <Col span={spanLabel ? spanLabel : 3}>

            </Col>
            <Col span={spanInput ? spanInput : 18}>
                {items ? (
                    <List
                        rowKey="name"
                        bordered={true}
                        itemLayout="horizontal"
                        dataSource={items}
                        renderItem={item => (
                            <List.Item
                                actions={[
                                    <Button icon={<DeleteOutlined/>} type="link" danger
                                            onClick={onFileDelete.bind(this, item.id)}/>
                                ]}>
                                <List.Item.Meta
                                    avatar={<Avatar icon={<PictureOutlined/>}/>}
                                    title={<a href="https://ant.design">{`${item.id} - ${item.label}`}</a>}
                                    description={`Date : ${Moment(new Date()).format('DD-MM-YYYY')}`}
                                />
                                <Image  width={152}
                                        src={`data:image/png;base64,${item.file}`}
                                       style={{cursor: "pointer"}}/>
                            </List.Item>
                        )}
                    />
                ) : (
                    ''
                )}
            </Col>
        </Row>
    );
}

export default Lists;
