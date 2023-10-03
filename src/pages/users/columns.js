export const columns = [
    {
        title: 'N°',
        dataIndex: 'id',
        key: 'id',
        sorter: (a, b) => a.id - b.id,
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
    },
    {
        title: 'Téléphone',
        dataIndex: 'phone',
        key: 'phone',
        sorter: (a, b) => a.phone.length - b.phone.length,
        sortDirections: ['descend', 'ascend']
    }
];

export const filters = [{label: 'firstName'}, {label: 'lastName'}, {label: 'email'}, {label: 'phone'}];
