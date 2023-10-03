import React from 'react';
import {Card, Col, List} from "antd";
import {EyeInvisibleOutlined, EyeOutlined, MailOutlined} from "@ant-design/icons";

const EditSessionCagInvitations = ({selected}) => {

    return (
        <Card title={'Liste des fichiers :'}>
            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                <List
                    size="small"
                    key="list"
                    bordered
                    dataSource={selected.invitationsList}
                    renderItem={(item, index) => (
                        <List.Item>
                            <List.Item.Meta
                                key={index}
                                avatar={
                                    <MailOutlined  style={{
                                        fontSize: "30px",
                                        marginTop: "7px",
                                        marginRight: "20px",
                                        color: "#F40E01"
                                    }}/>
                                }
                                title={`${index + 1} : ${item.membre}`}
                                description={item.mail}
                            />
                            <div style={{
                                marginRight: "20px",
                                color: "#8c8c8c"
                            }}>{item.invitationStatus ? <>Lu <EyeOutlined/></> : <>Non
                                lu <EyeInvisibleOutlined/></>}</div>
                        </List.Item>
                    )}
                />
            </Col>
        </Card>
    );
}

export default EditSessionCagInvitations;