import React from 'react';
import Controls from "../../components";
import {Tag} from "antd";

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
        title: 'Code',
        dataIndex: 'code',
        key: 'code',
        sorter: (a, b) => a.code.length - b.code.length,
        sortDirections: ['descend', 'ascend'],
        width: '12%'
    },
    {
        title: 'Name',
        dataIndex: 'label',
        key: 'label',
        sorter: (a, b) => a.label.length - b.label.length,
        sortDirections: ['descend', 'ascend']
    },
    {
        title: 'Organisation',
        dataIndex: 'organisationLabel',
        key: 'organisationLabel',
        sorter: (a, b) => a.organisationLabel.length - b.organisationLabel.length,
        sortDirections: ['descend', 'ascend'],
        render: (record) => (<Tag>{record}</Tag>)
    }, {
        title: 'Date',
        dataIndex: 'sessionDateTime',
        key: 'sessionDateTime',
        sorter: (a, b) => a.sessionDate.length - b.sessionDate.length,
        sortDirections: ['descend', 'ascend'],
        width: '15%',
        render: sessionDateTime => sessionDateTime ? sessionDateTime : ''
    },
    {
        title: 'Adresse',
        dataIndex: 'adresse',
        key: 'adresse',
        sorter: (a, b) => a.adresse.length - b.adresse.length,
        sortDirections: ['descend', 'ascend']
    },
    {
        title: 'Statut',
        dataIndex: 'statusLabel',
        key: 'statusLabel',
        width: '10%',
        sorter: (a, b) => a.statusLabel - b.statusLabel,
        sortDirections: ['descend', 'ascend'],
        render: (statusLabel) => <Controls.StatusTags
            label={statusLabel}></Controls.StatusTags>
    }
];

export const filters = [{label: 'code'}, {label: 'label'}, {label: 'description'}];

