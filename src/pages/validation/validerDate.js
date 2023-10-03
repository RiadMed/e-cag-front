import React, {useEffect, useState} from 'react';
import {route} from "./index";
import {useNavigate, useParams} from "react-router-dom";
import {catchError, findById} from "../../redux/services/actions";
import {useDispatch, useSelector} from "react-redux";
import {validerDate} from "../../redux/services/sessionCagService";
import {Button, Col, Divider, Modal, Row, Space} from "antd";
import Controls from "../../components";
import {ArrowLeftOutlined, CalendarOutlined, CheckOutlined, CloseOutlined} from "@ant-design/icons";

const ValiderDate = () => {

    const {id} = useParams();

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const dataFetch = async () => {
            await dispatch(findById(id, route));
        }
        dataFetch().catch((error) => {
            dispatch(catchError(error, navigate));
        })
    }, []);

    const {selected, loading} = useSelector(state => state.common);

    const onValidate = async () => {
        await dispatch(validerDate(selected, route + '/validerDate', navigate));
    }

    const onProposeUndeDate = () => {
        console.log('sssssssssssssssssssssssssssssss');
    }

    const showModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const initValue = {
        label: '',
        description: '',
    };

    const fields = [
        {
            label: 'Date',
            placeholder: 'Date',
            name: 'sessionDateTime',
            key: 'sessionDateTime',
            type: 'date',
            dateFormat: 'DD-MM-YYYY HH:MM',
            rules: [
                {
                    required: true,
                    message: 'Please input type!',
                }
            ]
        }
    ];


    return (<div>
        {loading ? <></> :
            <div>
                <Row style={{marginTop: "45px"}}>
                    <Col span={12} offset={6}>
                        <Controls.Cards title={'Valider la planification : ' + selected.code}
                                        style={{background: "rgb(245 250 255)", borderColor: "rgb(186 206 229)"}}
                                        extra={<Controls.CloseButton router={'/sessionCAGs/aValider'}/>}>
                            <p>Voulez-vous <strong>Valider</strong> cette date {selected.sessionDateTime} ?</p>
                            <span>Si non vous pouvez proposer une nouvelle date pour la réunion CAG.</span>
                            <br/>
                            <br/>
                            <br/>
                            <Space style={{float: "right"}}>
                                <Button danger onClick={() => navigate('/sessionCAGs/aValider')}
                                        icon={<ArrowLeftOutlined/>} size={'small'}>Retour</Button>
                                <Divider type="vertical" style={{borderColor: "#d0d0d0"}}/>
                                <Button type="primary" danger size={'small'}
                                        onClick={showModal}
                                        icon={<CalendarOutlined/>}> Proposez une nouvelle date</Button>
                                <Button type="primary" danger size={'small'} icon={<CheckOutlined/>}
                                        htmlType="submit" onClick={onValidate}> Validez la date</Button>
                            </Space>
                        </Controls.Cards>
                    </Col>
                </Row>
                <Modal title="Proposez une nouvelle date"
                       open={isModalOpen}
                       footer={[
                           <Button size={'small'} icon={<CloseOutlined/>} onClick={() => closeModal()}>Fermer</Button>,
                           <Button size={'small'} icon={<CheckOutlined/>} type="primary"
                                   danger onClick={() => onProposeUndeDate()}>Valider</Button>
                       ]}

                       onCancel={handleCancel}>
                    <div style={{marginTop: "60px", marginBottom: "-20px"}}>
                        <Controls.EditFormGroups selected={selected} param={id}
                                                 fields={fields}
                                                 showSubmitSpace={false}
                                                 submitAction={onProposeUndeDate}
                                                 initialValues={initValue}
                                                 router={route} backToList={true} disabledReset={true}/>
                    </div>
                </Modal>
            </div>
        }
    </div>);
}

export default ValiderDate;