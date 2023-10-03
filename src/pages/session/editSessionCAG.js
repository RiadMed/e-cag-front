import React, {useEffect, useState} from 'react';
import Controls from "../../components";
import {route} from "./";
import {CarryOutOutlined, FileDoneOutlined, MailOutlined} from "@ant-design/icons";
import {Menu} from "antd";
import EditSessionCagFiles from "./editSessionCAGFiles";
import EditSessionCagInvitations from "./editSessionCAGInvitations";
import {useSelector} from "react-redux";
import {doGetData} from "../../redux/services/localActions";
import {statusLabels} from "../../tools/statusEnum";
import {useNavigate} from "react-router";

const EditSessionCAG = () => {

    const {selected} = useSelector(state => state.common);
    const [typeSessionData, setTypeSessionData] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        if (selected.statusLabel === statusLabels.DONE) {
            navigate(route + '/archiveView/' + selected.id);
        }
        doGetData(`data/typeSessions.json`).then(response => {
            setTypeSessionData(response.data)
        });
    }, [])

    const fields = [
        {
            label: 'Type Session',
            placeholder: 'Type Session',
            name: 'typeSession',
            key: 'typeSession',
            type: 'select',
            items: typeSessionData,
            itemValue: 'id',
            itemLabel: 'label',
            rules: [
                {
                    required: true,
                    message: 'Please input type!',
                }
            ]
        },
        {
            label: 'Code',
            placeholder: 'Code',
            name: 'code',
            key: 'code',
            type: 'text',
            disabled: true,
            rules: [
                {
                    required: true,
                    message: 'Please input Name!',
                }, {
                    min: 3,
                    message: 'Minimum 3 caractère!',
                }
            ]
        },
        {
            label: 'Nom',
            placeholder: 'Nom',
            name: 'label',
            key: 'label',
            type: 'text',
            rules: [
                {
                    required: true,
                    message: 'Please input Name!',
                }, {
                    min: 3,
                    message: 'Minimum 3 caractère!',
                }
            ]
        },
        {
            label: 'Adresse',
            placeholder: 'Adresse',
            name: 'description',
            key: 'description',
            type: 'text',
            rules: [
                {
                    required: true,
                    message: 'Please input Description!',
                }, {
                    min: 3,
                    message: 'Minimum 3 caractère!',
                }
            ]
        },

        {
            label: 'Date',
            placeholder: 'Date',
            name: 'sessionDateTime',
            key: 'sessionDateTime',
            type: 'date',
            dateFormat: 'DD-MM-YYYY HH:MM'
        }
    ];

    const items = [
        {
            label: 'Session',
            key: 'session',
            icon: <CarryOutOutlined/>
        },
        {
            label: 'Fichiers',
            key: 'file',
            icon: <FileDoneOutlined/>
        },
        {
            label: 'Invitations',
            key: 'invitation',
            icon: <MailOutlined/>
        }
    ];

    const initValue = {
        typeSession: 1,
        label: '',
        description: '',
        code: '',
        organisationAdresse: ''
    }
    const [current, setCurrent] = useState('session');
    const [steps, setSteps] = useState('step1');

    const onClick = (e) => {
        setCurrent(e.key);
        if (e.key === 'file') {
            setSteps('step2');
        } else if (e.key === 'invitation') {
            setSteps('step3');
        } else {
            setSteps('step1');
        }
    };

    return (
        <>
            <Menu theme="dark" onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items}/>
            {steps === 'step1' ?
                (<Controls.EditFormGroupsUseParam title="Modifier la session'" fields={fields} initialValues={initValue}
                                                  router={route} backToList={true} disabledReset={true}/>)
                : steps === 'step2' ? (<EditSessionCagFiles selected={selected}/>) : (
                    <EditSessionCagInvitations selected={selected}/>)
            }

        </>
    );
}

export default EditSessionCAG;
