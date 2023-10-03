import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {catchError} from "../../redux/services/actions";
import {route} from "./index";
import Controls from "../../components";
import {Button, Col, Divider, message, Row, Space, Table, Tag} from "antd";
import {
    ArrowLeftOutlined,
    CheckCircleOutlined,
    CheckOutlined,
    CloseOutlined,
    PlayCircleOutlined
} from "@ant-design/icons";
import {doPost} from "../../redux/services/httpActions";
import {findSessionCAGById} from "../../redux/services/sessionCagService";
import {UPDATE_ALL_SESSION_CAG_CHILD, UPDATE_SESSION_CAG_CHILD} from "../../redux/reducers/sessionReducer";
import {SUCCESS_UPDATE} from "../../redux/reducers/crudReducer";
import {statusLabels} from "../../tools/statusEnum";
import Timer from 'react-timer-wrapper';
import Timecode from 'react-timecode';

const {Column} = Table;

const DemarrerLaReunion = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [activeTimer, setActiveTimer] = useState(false);

    const {id} = useParams();

    useEffect(() => {
        const dataFetch = async () => {
            await dispatch(findSessionCAGById(id, route));
        }
        dataFetch().catch((error) => {
            dispatch(catchError(error, navigate));
        })
    }, []);

    const {loading, selected, children} = useSelector((state) => state.session);


    const checkPresence = async (record) => {
        const addValue = {...record, present: record.present ? false : true}
        const response = await doPost('/sessionCAGInvitations/checkPresence', addValue);
        if (response.data.success) {
            dispatch({type: UPDATE_SESSION_CAG_CHILD, payload: response.data.body});
            message.success(response.data.message);
        }
    };

    const checkAllPresence = async () => {
        const response = await doPost('/sessionCAGInvitations/checkPresenceAll', selected);
        if (response.data) {
            dispatch({type: UPDATE_ALL_SESSION_CAG_CHILD, payload: response.data});
            message.success('Tous les membres sont présents.');
        }
    };

    const checkAllAbsence = async () => {
        const response = await doPost('/sessionCAGInvitations/checkAbsenceAll', selected);
        if (response.data) {
            dispatch({type: UPDATE_ALL_SESSION_CAG_CHILD, payload: response.data});
            message.success('Tous les membres sont absents.');
        }
    };

    const demarrerLaReunion = async () => {
        const response = await doPost('/sessionCAGs/demarrerLaReunion', selected);
        if (response.data.success) {
            dispatch({
                type: SUCCESS_UPDATE,
                payload: response.data.body
            });
            message.success('La réunion est démarrée!.');
            setActiveTimer(true);
        } else
            message.error(response.data.message);
    };

    const terminerLaReunion = async () => {
        const response = await doPost('/sessionCAGs/nextStep', {
            sessionId: selected.id,
            statusLabel: statusLabels.END_MEETING
        });
        if (response.data.success) {
            dispatch({
                type: SUCCESS_UPDATE,
                payload: response.data.body
            });
            message.success('La réunion est terminer!.');
            setActiveTimer(true);
            navigate(route);
        } else
            message.error(response.data.message);
    };

    const isOneMembreAbsent = children.some(element => {
        if (!element.present) {
            return true;
        }
        return false;
    });

    const timeUp =
        activeTimer ?
            <div style={{display: "contents"}}>
                <span className="span-info" style={{marginRight: "10px"}}>Réunion démarrer depuis : </span>
                <Timer active={activeTimer} duration={null} style={{marginRight: "10px", fontWeight: "bold"}}>
                    <Timecode/>
                </Timer>
            </div> : <></>


    return (

        <Controls.Cards title="Liste des memebres invités:"
                        bordered={false}
                        extra={<Controls.CloseButton router={route}>{timeUp}</Controls.CloseButton>}>
            <Row gutter={24}>
                <Col span={3}></Col>
                <Col span={18}>

                <span
                    className="span-info">Veuillez cliquer sur le boutton <strong>Présent</strong> pour marquer la présence ou l'absence de chaque membre, si non vous pouvez cliquer sur le boutton <strong>Tous les membres sont présent</strong> pour marquer la présence de tous les membre invités à la réunion.</span>
                    <br/><br/>

                    <Table dataSource={children}
                           loading={loading}
                           title={() =>
                               <Row>
                                   <Col span={4} offset={4}>
                                   </Col>
                                   <Col span={6} offset={18}>
                                       <Button danger
                                               disabled={selected.statusLabel !== (statusLabels.INVITATION_SEND)}
                                               onClick={isOneMembreAbsent ? checkAllPresence : checkAllAbsence}
                                               size={'small'}
                                               icon={isOneMembreAbsent ? <CheckOutlined/> :
                                                   <CloseOutlined/>}
                                               type={isOneMembreAbsent ? 'primary' : 'default'}>{isOneMembreAbsent ? 'Tous les membres sont présents' : 'Tous les membres sont absents'}</Button>
                                   </Col>
                               </Row>
                           }
                           pagination={false} rowKey="id">
                        <Column title="N°" dataIndex="id" key="id" width="8%"/>
                        <Column title="Nom" dataIndex="membre" key="membre"/>
                        <Column title="Email" dataIndex="mail" key="mail"/>
                        <Column
                            title="action"
                            key="action"
                            render={(record) => (
                                selected.statusLabel !== (statusLabels.INVITATION_SEND) ?
                                    <Tag
                                        color={record.present ? 'green' : 'error'}>{record.present ? 'Présent' : 'Absent'}</Tag> :
                                    <Button danger type={record.present ? "primary" : "default"}
                                            disabled={selected.statusLabel !== (statusLabels.INVITATION_SEND)}
                                            size="small"
                                            onClick={() => checkPresence(record)}
                                            icon={record.present ? <CheckOutlined/> : <CloseOutlined/>}>
                                        {record.present ? 'Présent' : 'Absent'}
                                    </Button>)}
                        />
                    </Table>


                    <Divider/>

                    <Space>
                        <Button
                            danger
                            size="small"
                            icon={<ArrowLeftOutlined/>}
                            onClick={() => {
                                navigate(route)
                            }}>
                            Retour
                        </Button>
                        <Divider type="vertical"
                                 style={{borderColor: '#bfbfbf', height: "15px"}}/>
                        {selected.statusLabel === (statusLabels.INVITATION_SEND) ? <Button
                                danger
                                disabled={selected.statusLabel !== (statusLabels.INVITATION_SEND)}
                                size="small"
                                type="primary"
                                icon={<PlayCircleOutlined/>}
                                onClick={demarrerLaReunion}>
                                Démarrer la réunion
                            </Button>
                            :
                            <Button
                                danger
                                disabled={selected.statusLabel !== (statusLabels.START_MEETING)}
                                size="small"
                                type="primary"
                                icon={<CheckCircleOutlined/>}
                                onClick={terminerLaReunion}>
                                Terminer la réunion
                            </Button>}
                        {selected.statusLabel === (statusLabels.INVITATION_SEND) ?
                            <span className="span-info"
                                  style={{marginLeft: "20px"}}>Cliquez sur le boutton <strong>Démarrer la réunion</strong> pour démarrer la réunion.</span>
                            :
                            <span className="span-info"
                                  style={{marginLeft: "20px"}}>Cliquez sur le boutton <strong>Terminer la réunion</strong> pour terminer la réunion et passer à l'étape siuvante.</span>}
                    </Space>
                </Col>
                <Col span={3}></Col>
            </Row>
        </Controls.Cards>
    );
}

export default DemarrerLaReunion;