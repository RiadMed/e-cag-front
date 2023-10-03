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
        title: 'Name',
        dataIndex: 'label',
        key: 'label',
        sorter: (a, b) => a.label.length - b.label.length,
        sortDirections: ['descend', 'ascend']
    }
];

export const filters = [{label: 'label'}, {label: 'description'}];
