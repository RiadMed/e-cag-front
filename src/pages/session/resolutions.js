import React, {useEffect, useState} from 'react';
import {Button, Col, Divider, Form, List, message, Row} from "antd";
import Controls from "../../components";
import {route} from "./index";
import {useNavigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {catchError, findById} from "../../redux/services/actions";
import {doGet, doPost} from "../../redux/services/httpActions";
import {CheckSquareOutlined, MinusSquareOutlined} from "@ant-design/icons";

const Resolutions = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [form] = Form.useForm();

    const [data, setData] = useState([]);
    const [loadData, setLoadData] = useState(false);

    const {id} = useParams();
    const {selected, loading} = useSelector((state) => state.common);

    useEffect(() => {
        const dataFetch = async () => {
            await dispatch(findById(id, route));
        }
        dataFetch().catch((error) => {
            dispatch(catchError(error, navigate));
        });

        setLoadData(true);

        const resolutionsFetch = async () => {
            const response = await doGet(`/Resolutions?sessionId=${id}`);
            setData(response.data);
            setLoadData(false);
        }
        resolutionsFetch().catch((error) => {
            dispatch(catchError(error, navigate));
            setLoadData(false);
        });
    }, []);

    const fields = [
        {
            label: 'Résolution',
            placeholder: 'Résolution',
            name: 'description',
            key: 'description',
            type: 'text',
            autoFocus: true,
            rules: [
                {
                    required: true,
                    message: 'Please input Résolution!',
                }, {
                    min: 3,
                    message: 'Minimum 3 caractère!',
                }
            ]
        }
    ];

    const initValue = {
        description: ''
    }

    const onSaveResolution = async (value) => {
        setLoadData(true);
        const response = await doPost('/Resolutions', {...value, sessionCAGId: selected.id});
        setData([...data, response.data]);
        form.resetFields();
        message.success('Resolution ajouter!.');
        setLoadData(false);
    }

    const ContainerHeight = 400;

    const onScroll = (e) => {
        if (e.currentTarget.scrollHeight - e.currentTarget.scrollTop === ContainerHeight) {
        }
    };

    return (
        <div>
            <Controls.AddFormGroups title={"Résolution - Session CAG N: " + selected.code}
                                    fields={fields} initialValues={initValue}
                                    submitAction={onSaveResolution}
                                    router={route} loading={loading} forms={form}/>

            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                <Divider orientation="left">Liste des résolutions</Divider>
                <List
                    size="small"
                    key="list"
                    bordered
                    header={
                        <Row justify="end">
                            <Col span={22}></Col>
                            <Col span={2}>
                                <Button size={'small'} type="primary" danger
                                        icon={<CheckSquareOutlined/>}>Tous Résolu</Button>
                            </Col>
                        </Row>
                    }
                    loading={loadData}
                    dataSource={data}
                    onScroll={onScroll}
                    renderItem={(item, index) => (
                        <List.Item>
                            <List.Item.Meta
                                key={index}
                                title={`Résolution N: ${index + 1}`}
                                description={item.description}
                            />
                            <div>
                                <Button danger type={item.status ? "primary" : "default"}
                                        size="small"
                                        onClick={() => console.log('ssssssssssssss')}
                                        icon={item.status ? <CheckSquareOutlined/> : <MinusSquareOutlined/>}>
                                    {item.status ? 'Résolu' : 'Non résolu'}
                                </Button>
                            </div>
                        </List.Item>
                    )}
                />
            </Col>

        </div>
    );
}

export default Resolutions;