import React from 'react';
import {List} from "antd";
import {EyeInvisibleOutlined, EyeOutlined, MailOutlined} from "@ant-design/icons";

const ViewSessionInvitations = ({invitationsList}) => {
    return (
        <List
            size="small"
            key="list"
            bordered
            dataSource={invitationsList}
            renderItem={(item, index) => (
                <List.Item>
                    <List.Item.Meta
                        key={index}
                        avatar={
                            <MailOutlined style={{
                                fontSize: "30px",
                                marginTop: "7px",
                                marginRight: "20px",
                                color: "#8c8c8c"
                            }}/>
                        }
                        title={`${index + 1} : ${item.membre}`}
                        description={item.mail}
                    />
                    <div style={{
                        marginRight: "20px",
                        color: "#8c8c8c"
                    }}>{item.invitationStatus ? <>Lu <EyeOutlined color="green"/>{item.dateInvitationTime}</> : <>Non
                        lu <EyeInvisibleOutlined color="red"/></>}</div>
                </List.Item>
            )}
        />
    );
}

export default ViewSessionInvitations;