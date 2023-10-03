import React, {useEffect, useState} from 'react';
import {catchError, findById} from "../../redux/services/actions";
import {useDispatch, useSelector} from "react-redux";
import {route} from "./";
import {useParams} from "react-router-dom";
import {Button, Card, Col, Descriptions, Divider, List, Pagination, Row, Skeleton, Space, Tag} from "antd";
import {
    ArrowLeftOutlined,
    CheckSquareOutlined,
    EyeInvisibleOutlined,
    EyeOutlined,
    FileAddOutlined,
    FileDoneOutlined,
    FileTextOutlined,
    MailOutlined,
    MinusSquareOutlined,
    PlayCircleOutlined,
    PrinterOutlined
} from "@ant-design/icons";
import Controls from "../../components";
import {useNavigate} from "react-router";
import ViewSessionFiles from "./viewSessionFiles";
import {statusLabels} from "../../tools/statusEnum";
import {checkRolesUser} from "../../redux/services/securityAction";
import {ROLES_KEYS} from "../../const/staticKeys";
import SessionTimeLine from "./sessionTimeLine";
import {doDelete, doGet} from "../../redux/services/httpActions";
import convertFile from "../../redux/services/fileServices";

const ViewSessionCag = (icon = <PrinterOutlined/>) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {id} = useParams();

    const {user, isLogin} = useSelector((state) => state.security);
    const {note} = useSelector((state) => state.notes);
    const {selected, loading} = useSelector(state => state.common);

    const [showFichiers, setShowFichiers] = useState(true);
    const [showInvitation, setShowInvitation] = useState(false);
    const [showResolution, setShowResolution] = useState(false);
    const [fileList, setFileList] = useState([]);
    const [resolutionList, setResolutionList] = useState([]);
    const [loadResolutionData, setLoadResolutionData] = useState(false);
    const [pagination, setPagination] = useState({});
    const [loadingFiles, setLoadingFiles] = useState(true);


    useEffect(() => {

        const dataFetch = async () => {
            await dispatch(findById(id, route));
        }
        dataFetch().catch((error) => {
            dispatch(catchError(error, navigate));
        });
        setLoadingFiles(true);
        fetchDataFile(0);

    }, []);

    const fetchDataFile = (page) => {
        doGet(`/sessionCAGFilesNotes?sessionId=${id}&page=${page}`).then(response => {
            setFileList(response.data.content);
            setPagination({
                current: response.data.pageable.pageNumber,
                pageSize: response.data.size,
                total: response.data.totalElements,
                totalPages: response.data.totalPages,
            })
            setLoadingFiles(false);
        });

    }

    const onChangePage = async (pageNumber) => {
        setLoadingFiles(true);
        await fetchDataFile(pageNumber - 1);
    };

    useEffect(() => {
        const itemUpdate = {note: note.note, id: note.id, label: note.label, description: note.description};
        setFileList(fileList.map(x => x.id === itemUpdate.id ? itemUpdate : x));
    }, [note]);

    const checkRoles = (roles) => {
        return isLogin ? checkRolesUser(user.rolesList.map(x => x.label), roles) : false;
    }

    const onShowInvitation = () => {
        setShowFichiers(false);
        setShowInvitation(true);
        setShowResolution(false);
    };

    const onShowFichiers = () => {
        setShowFichiers(true);
        setShowInvitation(false);
        setShowResolution(false);
    }

    const onShowResolution = () => {
        setShowFichiers(false);
        setShowInvitation(false);
        setShowResolution(true);
        setLoadResolutionData(true);
        const resolutionsFetch = async () => {
            const response = await doGet(`/Resolutions?sessionId=${id}`);
            setResolutionList(response.data);
            setLoadResolutionData(false);
        }
        resolutionsFetch().catch((error) => {
            dispatch(catchError(error, navigate));
            setLoadResolutionData(false);
        });
    }

    const onDelete = async (item) => {
        await doDelete(`/sessionCAGFilesNotes?fileId=${item.id}`);
        const itemUpdate = {note: '', id: item.id, label: item.label, description: item.description};
        setFileList(fileList.map(x => x.id === itemUpdate.id ? itemUpdate : x));
    }

    const downloadPVFile = async () => {
        const response = await doGet(route + "/files?idFile=" + selected.id);
        convertFile(response.data, "PV-" + selected.code);
    }

    const ContainerHeight = 400;

    const onScroll = (e) => {
        if (e.currentTarget.scrollHeight - e.currentTarget.scrollTop === ContainerHeight) {
        }
    };

    const items = [
        {
            key: '1',
            label: 'Code',
            children: selected.code,
        },
        {
            key: '2',
            label: 'Titre',
            children: selected.label,
        },
        {
            key: '3',
            label: 'Adresse',
            children: selected.adresse,
        },
        {
            key: '4',
            label: 'Date',
            children: selected.sessionDateTime,
        }
    ];

    const showTotal = (total) => `Totale ${total} fichiers`;

    return (
        <div>

            <Row gutter={24}>
                <Col span={6}>
                    <Card loading={loading} className="ecag-card height-100">
                            <span
                                className="span-info">&#9201; La chronologie de la session CAG N&#176;: <strong>{selected.code}</strong></span>
                        <br/>
                        <br/>
                        <SessionTimeLine id={id}/>
                    </Card>

                </Col>
                <Col span={0}>
                    <Divider type={"vertical"} plain style={{height: "100%"}}/>
                </Col>

                <Col span={18}>

                    <Card title={'Détail session N: ' + selected.code}
                          bordered={false}
                          loading={loading}
                          extra={<Controls.CloseButton router={route}/>}>
                             <span
                                 className="span-info">Consultez le détail de la réunion CAG N&#176;: <strong>{selected.code}</strong>,<br/>
                                 Veuillez cliquer sur le boutton <strong>Fichiers</strong> pour consulter la liste des documents de la réunion, et sur le boutton <strong>Invitations</strong> pour consulter la liste des membre invités à la réunion.</span>
                        <br/><br/>
                        <Card className="ecag-card">
                            <Descriptions items={items} column={4}/>
                        </Card>
                        <br/>

                        {loading ? <></> :
                            <>
                                {selected.statusLabel !== (statusLabels.CANCELED_DATE) && selected.statusLabel !== (statusLabels.PLANNED) ?
                                    <>
                                        <Divider plain/>
                                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                            <Space.Compact block>
                                                <Button type={showFichiers ? 'primary' : 'default'}
                                                        icon={<FileTextOutlined/>}
                                                        danger={showFichiers}
                                                        onClick={onShowFichiers}>Fichiers</Button>
                                                <Button icon={<MailOutlined/>} danger={showInvitation}
                                                        type={showInvitation ? 'primary' : 'default'}
                                                        onClick={onShowInvitation}>Invitations</Button>
                                                <Button icon={<CheckSquareOutlined/>} danger={showResolution}
                                                        type={showResolution ? 'primary' : 'default'}
                                                        onClick={onShowResolution}>Résolutions</Button>
                                            </Space.Compact>
                                        </Col>
                                    </>
                                    : <></>}
                                <br/>

                                {/*list des fichiers */}
                                <Card bordered={false} loading={loadingFiles}>
                                    {showFichiers ?
                                        <>{fileList.map(item => <ViewSessionFiles item={item}
                                                                                  onDelete={() => onDelete(item)}/>)}
                                            <Pagination defaultCurrent={pagination.current + 1}
                                                        total={pagination.total}
                                                        current={pagination.current + 1}
                                                        pageSize={3} size={'small'} style={{float: "right"}}
                                                        onChange={onChangePage} showTotal={showTotal}/></>
                                        : <></>}
                                </Card>
                                {/*list des invitations*/}
                                {showInvitation ? <List
                                    size="small"
                                    key="list"
                                    bordered
                                    dataSource={selected.invitationsList}
                                    renderItem={(item, index) => (
                                        <List.Item className={item.invitationStatus ? "" : "line-style"}>
                                            <List.Item.Meta
                                                key={index}
                                                avatar={
                                                    <MailOutlined style={{
                                                        fontSize: "30px",
                                                        marginTop: "7px",
                                                        marginRight: "20px",
                                                        color: item.invitationStatus ? "#4096ff" : "#97a4b5"
                                                    }}/>
                                                }
                                                title={`${index + 1} : ${item.membre}`}
                                                description={item.mail}
                                            />
                                            <div style={{
                                                marginRight: "20px"
                                            }}>{item.invitationStatus ?
                                                <div
                                                    style={{color: "#52c41a"}}>Lu <EyeOutlined/> - {item.invitationStatusDateTime}
                                                </div> :
                                                <div style={{color: "#f5222d"}}>Non lu <EyeInvisibleOutlined/>
                                                </div>}</div>
                                        </List.Item>
                                    )}
                                /> : <></>}

                                {showResolution ?
                                    <List
                                        size="small"
                                        key="list"
                                        bordered
                                        loading={loadResolutionData}
                                        dataSource={resolutionList}
                                        onScroll={onScroll}
                                        renderItem={(item, index) => (
                                            <List.Item>
                                                <List.Item.Meta
                                                    key={index}
                                                    title={`Résolution N: ${index + 1}`}
                                                    description={item.description}
                                                />
                                                <div>
                                                    <Tag color={item.status ? 'green' : 'default'}
                                                         icon={item.status ? <CheckSquareOutlined/> :
                                                             <MinusSquareOutlined/>}>
                                                        {item.status ? 'Résolu' : 'Pas encore'}
                                                    </Tag>
                                                </div>
                                            </List.Item>
                                        )}
                                    />
                                    : <></>}
                            </>
                        }
                    </Card>
                    <Divider/>
                    {loading ? <Skeleton active style={{marginLeft: "20px"}}/> :
                        <Space size="small">
                            <Controls.Buttons
                                type="button"
                                icon={<ArrowLeftOutlined/>}
                                onClick={() => navigate(route, {replace: true})}
                                title="Retour"
                                size={'small'}>
                            </Controls.Buttons>
                            <Divider type="vertical" style={{borderColor: "#d0d0d0"}}/>

                            {checkRoles(ROLES_KEYS.ROLE_SECRETAIRE) ?
                                <>
                                    {selected.statusLabel !== (statusLabels.START_MEETING) ?
                                        <Controls.Buttons
                                            disabled={selected.statusLabel !== (statusLabels.START_MEETING)}
                                            type="button"
                                            style={{marginLeft: "35px"}}
                                            icon={<EyeOutlined />}
                                            onClick={() => navigate(route + '/demarrer/' + selected.id)}
                                            title="Voir la réunion"
                                            size={'small'}>
                                        </Controls.Buttons>
                                        :
                                        <Controls.Buttons
                                            disabled={selected.statusLabel !== (statusLabels.INVITATION_SEND)}
                                            type="button"
                                            style={{marginLeft: "35px"}}
                                            icon={<PlayCircleOutlined/>}
                                            onClick={() => navigate(route + '/demarrer/' + selected.id)}
                                            title="Démarrer la réunion"
                                            size={'small'}>
                                        </Controls.Buttons>
                                    }

                                    <Divider type="vertical" style={{borderColor: "#d0d0d0"}}/>
                                    <Controls.Buttons
                                        disabled={selected.statusLabel !== statusLabels.END_MEETING}
                                        type="button"
                                        onClick={() => navigate(route + '/addpv/' + selected.id)}
                                        icon={<FileAddOutlined/>}
                                        title="Ajouter le PV"
                                        size={'small'}>
                                    </Controls.Buttons></> : <></>}

                            {selected.filePath ?
                                <>
                                    <Divider type="vertical" style={{borderColor: "#d0d0d0"}}/>
                                    <Button
                                        danger
                                        icon={<PrinterOutlined/>}
                                        onClick={downloadPVFile}
                                        size={'small'}>
                                        Imprimer le PV
                                    </Button>
                                </>
                                : <></>}

                            {checkRoles(ROLES_KEYS.ROLE_MEMBRE) ? <>
                                <Controls.Buttons
                                    disabled={selected.statusLabel !== statusLabels.PV_FILE_ADD}
                                    color={'primary'}
                                    type="button"
                                    icon={<FileDoneOutlined/>}
                                    title="Valider le PV"
                                    size={'small'}>
                                </Controls.Buttons>
                                <Divider type="vertical" style={{borderColor: "#d0d0d0"}}/>
                            </> : <></>}
                        </Space>
                    }
                </Col>

            </Row>
        </div>
    );
};


export default ViewSessionCag;