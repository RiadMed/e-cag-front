import React from 'react';


export const filters = [{label: 'code'}, {label: 'label'}, {label: 'description'}];

export const stepsItems = [
    {
        title: 'Étape 1',
        description: 'Planification.',
    },
    {
        title: 'Étape 2',
        description: 'Téléchargement.',
    },
    {
        title: 'Étape 3',
        description: 'Invitations.',
    }
];

export const columnsUser = [
    {
        title: 'N°',
        dataIndex: 'key',
        key: 'key',
        sorter: (a, b) => a.key - b.key,
        sortDirections: ['descend', 'ascend'],
        width: '10%'
    },
    {
        title: 'Nom',
        dataIndex: 'fullName',
        key: 'fullName',
        sorter: (a, b) => a.fullName.length - b.fullName.length,
        sortDirections: ['descend', 'ascend']
    },
    {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
        sorter: (a, b) => a.email.length - b.email.length,
        sortDirections: ['descend', 'ascend']
    }
];

