import {Tag} from "antd";
import {EyeInvisibleOutlined, EyeOutlined} from "@ant-design/icons";
import React from "react";

export const columns = [
    {
        title: 'N°',
        dataIndex: 'id',
        key: 'id',
        sorter: (a, b) => a.id - b.id,
        sortDirections: ['descend', 'ascend'],
        width: '5%'
    },
    {
        title: 'Membre',
        dataIndex: 'membre',
        key: 'membre',
        sorter: (a, b) => a.membre.length - b.membre.length,
        sortDirections: ['descend', 'ascend']
    },
    {
        title: 'Email',
        dataIndex: 'mail',
        key: 'mail',
        sorter: (a, b) => a.mail.length - b.mail.length,
        sortDirections: ['descend', 'ascend']
    },
    {
        title: 'Code session',
        dataIndex: 'sessionCAGCode',
        key: 'sessionCAGCode',
        sorter: (a, b) => a.sessionCAGCode.length - b.sessionCAGCode.length,
        sortDirections: ['descend', 'ascend'],
        render: (record) => (<Tag>{record}</Tag>)
    }, {
        title: 'Date',
        dataIndex: 'dateInvitationTime',
        key: 'dateInvitationTime',
        sorter: (a, b) => a.dateInvitationTime.length - b.dateInvitationTime.length,
        sortDirections: ['descend', 'ascend'],
        width: '15%',
        render: dateInvitationTime => dateInvitationTime ? dateInvitationTime : ''
    },
    {
        title: 'Statut',
        dataIndex: 'invitationStatus',
        key: 'invitationStatus',
        sorter: (a, b) => a.invitationStatus.length - b.invitationStatus.length,
        sortDirections: ['descend', 'ascend'],
        render: (invitationStatus) => (invitationStatus ? <div style={{color: "green"}}>Lu <EyeOutlined/></div> :
            <div style={{color: "red"}}>Non
                lu <EyeInvisibleOutlined/></div>)
    }
];

export const filters = [{label: 'membre'}, {label: 'mail'}, {label: 'sessionCAGCode'}];