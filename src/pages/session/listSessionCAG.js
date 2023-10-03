import React, {useEffect, useState} from 'react';
import {useSelector} from "react-redux";
import {route} from "./";
import Controls from "../../components";
import {DownloadOutlined, InfoCircleOutlined, MailOutlined, UploadOutlined} from "@ant-design/icons";
import {Button, Divider, Space, Tag, Tooltip} from "antd";
import {useNavigate} from "react-router";
import {statusLabels} from "../../tools/statusEnum";
import {checkRolesUser} from "../../redux/services/securityAction";
import {ROLES_KEYS} from "../../const/staticKeys";
import DropMenuDown from "./dropMenuDown";
import {doGet} from "../../redux/services/httpActions";
import convertFile from "../../redux/services/fileServices";

const ListSessionCAG = () => {

    const pageSize = 10;
    const navigate = useNavigate();

    const {data, pagination, loading} = useSelector((state) => state.common);
    const {user, isLogin} = useSelector((state) => state.security);

    const checkRoles = (roles) => {
        return isLogin ? checkRolesUser(user.rolesList.map(x => x.label), roles) : false;
    }

    const actionColumnWith = checkRoles([ROLES_KEYS.ROLE_SECRETAIRE]) ? '15%' : '8%';

    const downloadPVFile = async (record) => {
        const response = await doGet(route + "/files?idFile=" + record.id);
        convertFile(response.data, "PV-" + record.code);
    }

    const columns = [
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
        },
        {
            title: 'Date',
            dataIndex: 'sessionDateTime',
            key: 'sessionDateTime',
            sorter: (a, b) => a.sessionDateTime.length - b.sessionDateTime.length,
            sortDirections: ['descend', 'ascend'],
            width: '15%',
            render: sessionDateTime => sessionDateTime ? sessionDateTime : ''
        },
        // {
        //     title: 'Adresse',
        //     dataIndex: 'adresse',
        //     key: 'adresse',
        //     sorter: (a, b) => a.adresse.length - b.adresse.length,
        //     sortDirections: ['descend', 'ascend']
        // },
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

    const cols = columns.filter(x => x.key === 'action');

    if (cols.length === 0)
        columns.push({
            title: '',
            key: 'action',
            width: actionColumnWith,
            fixed: 'right',
            render: (record) => (
                <Space size="small">
                    <Button size={'small'}
                            key={record.id}
                            onClick={() => navigate(`${route}/view/${record.id}`)}
                            icon={<InfoCircleOutlined/>}>Détail</Button>

                    {checkRoles([ROLES_KEYS.ROLE_SECRETAIRE]) ?
                        <>
                            <Divider type="vertical"
                                     style={{borderColor: "#d0d0d0"}}/>
                            <Button danger
                                    type="primary"
                                    size={'small'}
                                    disabled={record.statusLabel !== (statusLabels.PROGRESS)}
                                    onClick={() => navigate(`${route}/add/step2/${record.id}`)}
                                    icon={<UploadOutlined/>}>Télécharger</Button>
                        </> : <></>}
                    {checkRoles([ROLES_KEYS.ROLE_SECRETAIRE]) ?
                        <>
                            <Divider type="vertical" style={{borderColor: "#d0d0d0"}}/>
                            <Button size={'small'}
                                    danger
                                    disabled={record.statusLabel !== (statusLabels.FILE_DOWNLOAD)}
                                    onClick={() => navigate(`${route}/add/step3/${record.id}/${record.organisationId}`)}
                                    icon={<MailOutlined/>}>Inviter</Button>
                        </> : <></>}
                    <Divider type="vertical"
                             style={{borderColor: "#d0d0d0"}}/>
                    <Tooltip placement="top" title={'Voir le PV'} color={'red'}>
                        <Button size={'small'}
                                disabled={record.statusLabel !== (statusLabels.PV_FILE_ADD)}
                                key={record.id}
                                onClick={() => downloadPVFile(record)}
                                icon={<DownloadOutlined/>}/>
                    </Tooltip>
                    {checkRoles([ROLES_KEYS.ROLE_SECRETAIRE]) ?
                        <DropMenuDown record={record}/>
                        : <></>}
                </Space>
            )
        });

    return (
        <Controls.Cards title="Liste des sessions CAG " bordered={false}>
            <Controls.PaginationTable
                dataSource={data}
                pagination={pagination}
                columns={columns}
                loading={loading}
                route={route + '/dataGrid'}
                filterFileName={route}
                showEditBtn={true}
                showDeleteBtn={true}
                showAdvSearch={false}
                showNewBtn={false}
                pageSize={pageSize}
                showViewBtn={true}
                search={true}
                query={`organisation.id=in=(${user.organisationList.map(a => a.key)})`}
                sortOrder={'desc'}
                defaultFilterValue={"code"}/>
        </Controls.Cards>
    );
}

export default ListSessionCAG;
