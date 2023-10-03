import React, {useEffect, useState} from 'react';
import Controls from "../../components";
import {route} from "./index";
import {useNavigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {Button, Card, Col, Divider, Form, message, Space} from "antd";
import {catchError, convertBase64, findById} from "../../redux/services/actions";
import {statusLabels} from "../../tools/statusEnum";
import {ArrowLeftOutlined, CheckOutlined, CloseOutlined, PlusOutlined} from "@ant-design/icons";
import {saveFileCAG} from "../../redux/services/sessionCagService";

const AjouterPv = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [form] = Form.useForm();

    const [fileName, setFileName] = useState();
    const [fileValue, setFileValue] = useState();

    const {id} = useParams();
    const {selected, loading} = useSelector((state) => state.common);

    useEffect(() => {
        const dataFetch = async () => {
            await dispatch(findById(id, route));
        }
        dataFetch().catch((error) => {
            dispatch(catchError(error, navigate));
        });
    }, []);

    const uploadFile = async (e) => {
        const file = e.target.files[0];
        setFileName(file.name);
        const base64 = await convertBase64(file);
        setFileValue(base64);
    };

    const onAddPvFile = async () => {
        const addValue = {
            id: selected.id,
            name: fileName,
            file: fileValue
        }
        await dispatch(saveFileCAG(addValue, route + '/addPVFile'));
        navigate(route)
    }

    const initialValues = {
        id: selected.id,
        name: '',
        file: ''
    }

    return (
        <Controls.Cards title={'Ajouter le PV - Session N: ' + selected.code}
                        loading={loading}
                        bordered={false}
                        extra={<Controls.CloseButton router={route}/>}>
             <span
                 className="span-info">Veuillez cliquer sur le lien <strong> Télécharger </strong> pour joindre le document du PV de la réunion CAG N&#176;: <strong>{selected.code}</strong> qui a été faite le <strong>{selected.sessionDateTime}</strong>.</span>
            <br/><br/>
            {selected.statusLabel === statusLabels.START_MEETING ?
                <div>
                    <Form
                        labelCol={{span: 3}}
                        wrapperCol={{span: 18}}
                        form={form}
                        initialValues={initialValues}
                        size='middle'
                        onFinish={onAddPvFile}>

                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                            <Form.Item
                                name="file"
                                key="file"
                                label="Joindre les fichiers">

                                <Controls.Uploads onFileUpload={uploadFile} accept=".pdf"/>
                            </Form.Item>
                        </Col>

                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                            <span style={{marginLeft: "260px"}}> <strong>{fileName}</strong></span>
                        </Col>
                        <Divider/>
                        <Col xs={14} sm={14} md={14} lg={14} xl={14}>
                            <Form.Item>
                                <Space style={{float: "right"}}>
                                    <Button
                                        danger
                                        icon={<ArrowLeftOutlined/>}
                                        onClick={() => {
                                            navigate(route)
                                        }}
                                        size={"small"} style={{marginRight: "15px"}}>
                                        Retour
                                    </Button>
                                    <Divider type="vertical"
                                             style={{borderColor: '#bfbfbf', height: "20px"}}/>

                                    <Button type="primary" size={'small'} htmlType="submit" danger
                                            icon={<CheckOutlined/>}
                                            disabled={!fileValue}
                                            style={{marginRight: "50px"}}>Valider</Button>
                                    <span className="span-info"
                                          style={{marginLeft: "20px"}}>Cliquez sur le boutton <strong>Valider</strong> pour envoyer le PV et passer à la prochaine étape.</span>
                                </Space>
                            </Form.Item>
                        </Col>

                    </Form>

                </div>
                : <></>}
        </Controls.Cards>
    );
};

export default AjouterPv;