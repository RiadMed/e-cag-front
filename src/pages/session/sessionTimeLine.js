import React, {useEffect, useState} from 'react';
import {Timeline} from "antd";
import Controls from "../../components";
import {
    CalendarOutlined, CheckOutlined,
    CloseCircleOutlined,
    CloseSquareOutlined, DiffOutlined,
    DownloadOutlined,
    EditOutlined,
    FieldTimeOutlined,
    MailOutlined,
    PauseCircleOutlined
} from "@ant-design/icons";
import {doGet} from "../../redux/services/httpActions";
import {catchError} from "../../redux/services/actions";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router";

const SessionTimeLine = ({id}) => {

    const [statusItems, setStatusItems] = useState([]);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const statusFetch = async () => {
            const response = await doGet('/statusSessions?sessionId=' + id);
            setStatusItems(response.data);
        }
        statusFetch().catch((error) => {
            dispatch(catchError(error, navigate));
        })
    }, [])

    const colorTime = (label) => {
        switch (label) {
            case 'Planifier':
                return 'blue';
            case 'Envoyer':
                return 'purple';
            case 'En Attente':
                return 'red';
            case 'Modification':
                return 'red';
            case 'Annuler':
                return 'red';
            case 'Date Annuler':
                return 'red';
            case 'Documents Télécharger':
                return 'green';
            case 'Invitation Envoyés':
                return 'green';
            case 'PV Ajouter':
                return 'magenta';
            case 'Réunion Démarrer':
                return 'green';
            case 'Réunion Terminer':
                return 'volcano';
            default:
                return 'gray'
        }
    }

    const iconTime = (label) => {
        switch (label) {
            case 'Planifier':
                return <CalendarOutlined style={{fontSize: '16px'}}/>;
            case 'Envoyer':
                return <MailOutlined style={{fontSize: '16px'}}/>;
            case 'En Attente':
                return <PauseCircleOutlined style={{fontSize: '16px'}}/>;
            case 'Modification':
                return <EditOutlined style={{fontSize: '16px'}}/>;
            case 'Annuler':
                return <CloseCircleOutlined style={{fontSize: '16px'}}/>;
            case 'Date Annuler':
                return <CloseSquareOutlined style={{fontSize: '16px'}}/>;
            case 'Documents Télécharger':
                return <DownloadOutlined style={{fontSize: '16px'}}/>;
            case 'Invitation Envoyés':
                return <MailOutlined style={{fontSize: '16px'}}/>;
            case 'PV Ajouter':
                return <DiffOutlined style={{fontSize: '16px'}}/>;
            default:
                return <FieldTimeOutlined style={{fontSize: '16px'}}/>
        }
    }

    return (
        statusItems ?
            <Timeline>
                {statusItems.map((state) => {
                    return <Timeline.Item
                        key={state.id}
                        dot={iconTime(state.statusLabel)}
                        color={colorTime(state.statusLabel)}>
                        <span key={'a-' + state.id}><Controls.StatusTags
                            label={state.statusLabel} margin={true}/></span>
                        <br/>
                        <span key={'d-' + state.id}>{'(' + state.statusDateTime + ')'}</span>
                        <br/>
                        <span key={'b-' + state.id}>{state.userLastName + ' ' + state.userFirstName}</span>
                    </Timeline.Item>
                })}
            </Timeline> : <></>

    );
}

export default SessionTimeLine;