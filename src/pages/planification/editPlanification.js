import React, {useEffect, useState} from 'react';
import {doGetData} from "../../redux/services/localActions";
import Controls from "../../components";
import {route} from "./index";
import {useSelector} from "react-redux";
import dayjs from "dayjs";

function EditPlanification() {

    const [typeSessionData, setTypeSessionData] = useState([]);

    useEffect(() => {
        doGetData(`data/typeSessions.json`).then(response => {
            setTypeSessionData(response.data)
        });
    }, []);

    const {selected} = useSelector(state => state.common);

    const fields = [
        {
            label: 'Code',
            placeholder: 'Code',
            name: 'code',
            key: 'code',
            type: 'code',
            disabled: true,
            rules: [
                {
                    required: true,
                    message: 'Please input type!',
                }
            ]
        },
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
            label: 'Date',
            placeholder: 'Date',
            name: 'date',
            key: 'date',
            type: 'date',
            dateFormat: 'DD-MM-YYYY HH:MM'
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
            name: 'adresse',
            key: 'adresse',
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
            label: 'Description',
            placeholder: 'Description',
            name: 'description',
            key: 'description',
            type: 'textarea',
            rules: [
                {
                    min: 3,
                    message: 'Minimum 3 caractère!',
                }
            ]
        }
    ];

    const initValue = {
        code: '',
        label: '',
        description: '',
        date: dayjs(selected.sessionDateTime)
    }

    return (
        <Controls.EditFormGroupsUseParam title="Modifier la plannification'" fields={fields} initialValues={initValue}
                                         BackToList={false} BackToUrl={'sessionCAGs/planifications'}
                                         router={route} disabledReset={true}
                                         newBtnRedirect={'/sessionCAGs/planifications/add'}/>
    );
}

export default EditPlanification;