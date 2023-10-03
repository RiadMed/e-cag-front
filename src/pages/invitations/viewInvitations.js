import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Button, Card, Col, Descriptions, Divider, Row, Space, Tag} from "antd";
import Controls from "../../components";
import {route} from "./index";
import {useParams} from "react-router-dom";
import {catchError, findById} from "../../redux/services/actions";
import {useNavigate} from "react-router";
import {ArrowLeftOutlined, ProfileOutlined} from "@ant-design/icons";
import {changeInvitationStatus} from "../../redux/services/sessionCagService";

const ViewInvitations = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {id} = useParams();

    useEffect(() => {
        const dataFetch = async () => {
            await dispatch(findById(id, route));
        }
        dataFetch().catch((error) => {
            dispatch(catchError(error, navigate));
        });
        const statusFetch = async () => {
            await dispatch(changeInvitationStatus(id));
        }
        statusFetch().catch((error) => {
            dispatch(catchError(error, navigate));
        })
    }, []);

    const {selected, loading} = useSelector(state => state.common);

    const items = [
        {
            key: '1',
            label: 'Membre',
            children: selected.membre,
        },
        {
            key: '2',
            label: 'Email',
            children: selected.mail,
        },
        {
            key: '3',
            label: 'Code Session',
            children: <Tag color="cyan">{selected.sessionCAGCode}</Tag>,
        },
        {
            key: '5',
            label: 'Adresse',
            children: selected.sessionCAGAdresse,
        },
        {
            key: '6',
            label: 'Type',
            children: selected.sessionCAGTypeSession === '1' ? <Tag>Ordinaire</Tag> : <Tag>Extra-Ordinaire</Tag>,
        },
        {
            key: '7',
            label: 'Organisation',
            children: selected.sessionCAGOrganisationLabel,
        },
        {
            key: '8',
            label: "Date de l'invitaion",
            children: selected.dateInvitationTime,
        }
    ];

    return (
        <Card title={'Détail invitation pour la session N: ' + selected.sessionCAGCode}
              extra={<Controls.CloseButton router={route}/>} bordered={false}>
            <Row gutter={24}>
                <Col span={3}></Col>
                <Col span={18}>
                    <Card className="ecag-card" loading={loading}>
                        <Descriptions items={items} column={3}/>

                        <br/><br/>
                        <Divider/>
                        <Space size={'small'}>
                            <Button key="console" danger size={'small'} icon={<ArrowLeftOutlined/>}
                                    onClick={() => navigate(route)}>
                                Retour
                            </Button>
                            <Divider type="vertical" style={{borderColor: "#d0d0d0"}}/>
                            <Button danger icon={<ProfileOutlined/>}
                                    type="primary" size={'small'}
                                    onClick={() => navigate(`/sessionCAGs/view/${selected.sessionCAGId}`)}> Consulter la
                                liste des fichiers</Button>
                        </Space>
                    </Card>
                </Col>
                <Col span={3}></Col>

            </Row>
        </Card>
    );
}

export default ViewInvitations;