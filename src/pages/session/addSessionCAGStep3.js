import React, {useEffect, useState} from 'react';
import Controls from "../../components";
import {columnsUser} from "./columns";
import {Button, Col, Divider, Row, Skeleton, Space, Table} from "antd";
import {route} from "./index";
import {useNavigate, useParams} from "react-router-dom";
import {doGet} from "../../redux/services/httpActions";
import {ArrowLeftOutlined, SendOutlined, UserAddOutlined} from "@ant-design/icons";
import {useDispatch, useSelector} from "react-redux";
import {catchError, findById} from "../../redux/services/actions";
import {sendInvitationCAG} from "../../redux/services/sessionCagService";
import {statusLabels} from "../../tools/statusEnum";

const AddSessionCagStep3 = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [selectedData, setSelectedData] = useState([]);
    const [data, setData] = useState([]);

    const {id, orgId} = useParams();
    const {selected, loading} = useSelector((state) => state.common);

    useEffect(() => {
        const dataFetch = async () => {
            await dispatch(findById(id, route));
        }
        dataFetch().catch((error) => {
            dispatch(catchError(error, navigate));
        })

        const fetchOrg = async () => {
            const response = await doGet('/organisationMembres?orgId=' + orgId);
            setData(response.data)
        };
        fetchOrg().catch((error) => {
            dispatch(catchError(error, navigate));
        });
    }, []);

    const onSelectChange = (newSelectedRowKeys) => {
        setSelectedRowKeys(newSelectedRowKeys);
    };

    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    }

    const mapData = () => {
        selectedRowKeys.map(data => {
            const element = findSelectedElement(data);
            const addValue = {
                membre: element.fullName,
                mail: element.email,
                sessionCAGId: selected.id,
                sessionCAGCode: selected.code,
                invitationStatus: false
            };
            const checkElement = selectedData.filter(x => x.email === addValue.mail)
            if (checkElement.length === 0)
                selectedData.push(addValue)
            let alreadyExist = false;
            if (selectedData) {
                alreadyExist = selectedData.some(item => item.mail === addValue.mail);
            }
            if (!alreadyExist)
                setSelectedData([...selectedData, addValue]);
            return data;
        })
    }

    const findSelectedElement = (key) => {
        return data.find((element) => {
            return element.key === key;
        })
    }

    const sendInvitation = async () => {
        mapData();
        await dispatch(sendInvitationCAG(selectedData, '/sessionCAGInvitations/invitations', navigate));
    }

    return (

        <Controls.Cards title="Liste des memebres :"
                        bordered={false}
                        loading={loading}
                        extra={<Controls.CloseButton router={route}/>}>
            <Row gutter={24}>
                <Col span={2}></Col>
                <Col span={20}>
                            <span
                                className="span-info"> Veuillez selectionner la liste des membres pour les inviter à la réunion puis cliquez sur le boutton <strong>Envoyer</strong>,
                                 Une invitation sera envoyée automatiquement par mail à chaque membre pour assister à la réunion CAG.</span>
                    <br/><br/>
                    <Table footer={() => <Space> <Button type="primary" danger
                                                         size={"small"}
                                                         icon={<SendOutlined/>}
                                                         rowKey={'key'}
                                                         onClick={sendInvitation}
                                                         disabled={selectedRowKeys.length === 0 || selected.statusLabel !== (statusLabels.FILE_DOWNLOAD)}>Envoyer</Button>
                        <Divider type="vertical"
                                 style={{borderColor: '#bfbfbf', height: "15px"}}/>
                    </Space>}
                           rowSelection={selected.statusLabel !== (statusLabels.FILE_DOWNLOAD) ? null : rowSelection}
                           columns={columnsUser} dataSource={data}
                           pagination={false}/>


                    <Divider/>
                    <Space>
                        <Button
                            danger
                            size={"small"}
                            icon={<ArrowLeftOutlined/>}
                            onClick={() => {
                                navigate(route)
                            }}
                            style={{marginRight: "15px"}}>
                            Retour
                        </Button>
                        <Divider type="vertical"
                                 style={{borderColor: '#bfbfbf', height: "20px"}}/>
                        <Button type="primary" danger
                                size={"small"} style={{marginLeft: "20px"}}
                                disabled={selected.statusLabel !== (statusLabels.FILE_DOWNLOAD)}
                                icon={<UserAddOutlined/>}
                                rowKey={'key'}>Ajouter des invités</Button>
                        <span className="span-info" style={{marginLeft: "20px"}}>Cliquez sur le boutton <strong>Ajouter des invités</strong> pour ajouter d'autre invité.</span>
                    </Space>
                </Col>
                <Col span={2}></Col>
            </Row>
        </Controls.Cards>
    );
};

export default AddSessionCagStep3;