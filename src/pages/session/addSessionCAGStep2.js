import React, {useEffect, useState} from 'react';
import {Button, Col, Divider, Form, Input, List, message, Space} from "antd";
import Controls from "../../components";
import {route} from "./index";
import {useNavigate, useParams} from "react-router-dom";
import {
    ArrowLeftOutlined,
    CheckSquareOutlined,
    CloseOutlined,
    DeleteOutlined,
    FilePdfOutlined,
    PlusOutlined
} from "@ant-design/icons";
import {useDispatch, useSelector} from "react-redux";
import {catchError, convertBase64, findById} from "../../redux/services/actions";
import {deleteFilesById, goToNextStep, saveFileCAG} from "../../redux/services/sessionCagService";
import {statusLabels} from "../../tools/statusEnum";
import {doGet} from "../../redux/services/httpActions";

const AddSessionCagStep2 = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [form] = Form.useForm();

    const {id} = useParams();
    const {selected, loading} = useSelector((state) => state.common);
    const {code} = selected;

    const [dataFiles, setDataFiles] = useState([]);
    const [fileValue, setFileValue] = useState();
    const [maxValue, setMaxValue] = useState(1);
    const [fileName, setFileName] = useState();
    const [loadingFile, setLoadingFile] = useState(true);

    useEffect(() => {
        const dataFetch = async () => {
            await dispatch(findById(id, route));
        }
        dataFetch().catch((error) => {
            dispatch(catchError(error, navigate));
        });
        setLoadingFile(true);
        const filesFetch = async () => {
            const response = await doGet(`/sessionCAGFiles?idSession=${id}`);
            setDataFiles(response.data);
            setLoadingFile(false);
        }
        filesFetch().catch((error) => {
            setLoadingFile(false);
            dispatch(catchError(error, navigate));
        });
    }, []);

    const getMax = (items) => {
        return Math.max.apply(null, items.map(item => item.id));
    }

    const uploadFile = async (e) => {
        const file = e.target.files[0];
        setFileName('- ' + file.name);
        const base64 = await convertBase64(file);
        setFileValue(base64);
    };

    const ContainerHeight = 400;

    const onScroll = (e) => {
        if (e.currentTarget.scrollHeight - e.currentTarget.scrollTop === ContainerHeight) {
        }
    };

    const initialValues = {
        key: 1,
        file: null,
        label: '',
        description: '',
        sessionCAGId: null
    }

    const onCreateSessionStep2 = async (value) => {
        let alreadyExist = false;
        if (dataFiles) {
            alreadyExist = dataFiles.some(item => value.label === item.label);
        }
        if (!alreadyExist) {
            const addValue = {
                key: maxValue,
                file: fileValue,
                sessionCAGId: id,
                sessionCAGCode: code
            }
            const newValue = Object.assign(value, addValue);
            await dispatch(saveFileCAG(newValue, '/sessionCAGFiles/files'));
            setDataFiles([...dataFiles, newValue]);
            resetForm();
        } else {
            message.error(`le document ${value.label} existe dans la liste.`, 10);
        }
    }

    const resetForm = () => {
        setFileName('');
        setFileValue(null);
        form.resetFields();
    }

    const removeFileFormList = async (label, id) => {
        await deleteFilesById(id);
        setDataFiles(dataFiles.filter(x => x.label !== label));
    }

    const saveData = async () => {
        if (dataFiles)
            await dispatch(goToNextStep(selected.id, '/sessionCAGFiles/terminer', navigate));
    }

    return (
        <>
            {/*<Controls.StepElement current={1} items={stepsItems} onChange={onChangeSteps}/>*/}

            <Controls.Cards title={'Téléchargement : '}
                            loading={loading}
                            bordered={false}
                            extra={<Controls.CloseButton router={route}/>}>
                {selected.statusLabel === statusLabels.PROGRESS ?
                    <Form
                        labelCol={{span: 3}}
                        wrapperCol={{span: 18}}
                        form={form}
                        height={ContainerHeight}
                        initialValues={initialValues}
                        size='middle'
                        onFinish={onCreateSessionStep2}>


                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                            <Form.Item
                                name="label"
                                key="label"
                                label="Titre"
                                rules={[{required: true}, {min: 3}]}>

                                <Input autoFocus={true} id={'label'}/>

                            </Form.Item>
                        </Col>

                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                            <Form.Item
                                name="description"
                                key="description"
                                label="Description"
                                rules={[{min: 3}]}>

                                <Input id={'description'}/>

                            </Form.Item>
                        </Col>

                        <Divider/>

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
                                        size={"small"} style={{marginBottom: "20px", marginRight: "15px"}}>
                                        Retour
                                    </Button>
                                    <Divider type="vertical"
                                             style={{borderColor: '#bfbfbf', height: "20px", marginBottom: "15px"}}/>
                                    <Button size={'small'}
                                            danger
                                            icon={<CloseOutlined/>}
                                            onClick={resetForm}
                                            style={{
                                                marginBottom: "20px",
                                                marginRight: "15px",
                                                marginLeft: "15px"
                                            }}>Reset</Button>

                                    <Button type="primary" size={'small'} htmlType="submit" danger
                                            icon={<PlusOutlined/>}
                                            disabled={!fileValue}
                                            style={{marginBottom: "20px", marginRight: "50px"}}>Ajouter</Button>

                                </Space>
                            </Form.Item>
                        </Col>

                    </Form> : <></>}

                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    <Divider orientation="left">Liste des fichiers télécharger</Divider>
                    <List
                        size="small"
                        key="list"
                        bordered
                        loading={loadingFile}
                        dataSource={dataFiles}
                        onScroll={onScroll}
                        renderItem={(item, index) => (
                            <List.Item>
                                <List.Item.Meta
                                    key={index}
                                    avatar={
                                        <FilePdfOutlined style={{
                                            fontSize: "30px",
                                            marginTop: "7px",
                                            marginRight: "20px",
                                            color: "#F40E01"
                                        }}/>
                                    }
                                    title={`DOC-0${index + 1} : ${item.label}`}
                                    description={item.description}
                                />
                                <div><Button onClick={() => removeFileFormList(item.label, item.id)}
                                             disabled={selected.statusLabel !== (statusLabels.PROGRESS)}
                                             icon={<DeleteOutlined/>}
                                             danger/></div>
                            </List.Item>
                        )}
                    />
                </Col>

            </Controls.Cards>
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
                <Button type="primary" size={'small'} danger icon={<CheckSquareOutlined/>}
                        onClick={saveData}
                        disabled={dataFiles.length === 0}>Finaliser cette étape</Button>
                <span className="span-info" style={{marginLeft: "20px"}}>Cliquez sur le boutton <strong>Finaliser cette étape</strong> pour passer à la prochaine étape l'envoi des invitations.</span>
            </Space>
        </>
    );
}

export default AddSessionCagStep2;