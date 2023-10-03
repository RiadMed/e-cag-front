import React from 'react';
import {Button, Card, Col, List} from "antd";
import {DeleteOutlined, FilePdfOutlined} from "@ant-design/icons";

const EditSessionCagFiles = ({selected}) => {
    return (
        <Card title={'Liste des fichiers :'}>
            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                <List
                    size="small"
                    key="list"
                    bordered
                    dataSource={selected.filesList}
                    renderItem={(item, index) => (
                        <List.Item>
                            <List.Item.Meta
                                key={index}
                                avatar={
                                    <FilePdfOutlined style={{
                                        fontSize: "30px",
                                        marginTop: "7px",
                                        marginRight: "20px",
                                        color: "#F40E01"
                                    }}/>
                                }
                                title={`DOC-0${index + 1} : ${item.label}`}
                                description={item.description}
                            />
                            <div><Button onClick={() => console.log('TEST')} icon={<DeleteOutlined/>}
                                         danger/></div>
                        </List.Item>
                    )}
                />
            </Col>
        </Card>
    );
}

export default EditSessionCagFiles;