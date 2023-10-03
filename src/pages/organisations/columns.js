export const columns = [
    {
        title: 'N°',
        dataIndex: 'code',
        key: 'code',
        sorter: (a, b) => a.id - b.id,
        sortDirections: ['descend', 'ascend'],
        width: '10%'
    },
    {
        title: 'Name',
        dataIndex: 'label',
        key: 'label',
        sorter: (a, b) => a.label.length - b.label.length,
        sortDirections: ['descend', 'ascend']
    },
    {
        title: 'Description',
        dataIndex: 'description',
        key: 'description',
        sorter: (a, b) => a.label.length - b.label.length,
        sortDirections: ['descend', 'ascend']
    }
];

export const filters = [{label: 'label'}, {label: 'description'}];
