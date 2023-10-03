import React, {useState} from 'react';
import {Button, Card, Col, Divider, message, Popconfirm, Row} from "antd";
import {DeleteOutlined, FilePdfOutlined} from "@ant-design/icons";
import TextArea from "antd/es/input/TextArea";
import {doGet, doPost} from "../../redux/services/httpActions";
import {useDispatch} from "react-redux";
import {ADD_NOTE, NOTE_LOADING} from "../../redux/reducers/noteReducer";
import convertFile from "../../redux/services/fileServices";

const ViewSessionFiles = ({item, onDelete}) => {

    const dispatch = useDispatch();

    const [note, setNote] = useState("");


    const downloadFile = async (item) => {
        const response = await doGet("/sessionCAGFiles/files?idFile=" + item.id);
        convertFile(response.data, item.label);
    }


    const onSaveNote = async () => {
        if (note) {
            dispatch({type: NOTE_LOADING});
            const addValue = {id: item.id, label: item.label, description: item.description, note: note};
            const response = await doPost('/sessionCAGFilesNotes/saveNote', addValue);
            if (response.data.success) {
                message.success(response.data.message);
                dispatch({type: ADD_NOTE, payload: addValue});
                setNote("");
            }
        }
    }

    return (

        <>
            <Card bordered={false}>
                <Row>
                    <Col span={2}>
                        <Button type="link"
                                className="pdf-btn"
                                icon={<FilePdfOutlined
                                    style={{
                                        fontSize: "30px",
                                        marginTop: "7px",
                                        marginRight: "20px",
                                        color: "#ff4d4f"
                                    }}/>}
                                onClick={() => downloadFile(item)}></Button>


                        <br/>
                        <br/>
                    </Col>
                    <Col span={1}>
                        <Divider type="vertical"
                                 style={{borderColor: "#e0e0e0", height: "100px"}}/>
                    </Col>
                    <Col span={21}>
                        <Row><span><strong>{item.label}</strong> - ({item.description})</span></Row>
                        <Row>
                            <Col span={22}><p style={{color: "#797979"}}>{item.note}</p></Col>
                            <Col span={1}> <Divider type="vertical"
                                                    style={{borderColor: "#d0d0d0", height: "20px"}}/></Col>
                            <Col span={1}>
                                <Popconfirm
                                    title="Supprimer la note"
                                    description="voulez-vous supprimer cette note ?"
                                    onConfirm={onDelete}
                                    okText="Oui"
                                    cancelText="Non">
                                    <Button type="link" danger icon={<DeleteOutlined/>} disabled={!item.note}/>
                                </Popconfirm>
                            </Col>
                        </Row>
                        <Divider/>
                        <Row>
                            <TextArea placeholder={'Note... '}
                                      showCount={true}
                                      maxLength={500}
                                      disabled={item.note}
                                      allowClear
                                      id={'noteArea'}
                                      value={note}
                                      onPressEnter={() => onSaveNote()}
                                      onChange={(e) => setNote(e.target.value)}></TextArea>
                            <span
                                className="span-info">Ajoutez une note puis cliquez sur le boutton <strong>Enter &#11168;</strong> &nbsp; du clavier pour l'ajouter.</span>
                        </Row>
                    </Col>
                </Row>
            </Card><br/>
        </>

    );
}

export default ViewSessionFiles;