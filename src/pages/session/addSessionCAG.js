import React, {useEffect, useState} from 'react';
import Controls from "../../components";
import {route} from "./";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {stepsItems} from "./columns"
import {doGetData} from "../../redux/services/localActions";


const AddSessionCAG = () => {

    const navigate = useNavigate();

    const [typeSessionData, setTypeSessionData] = useState([]);

    const {selected} = useSelector(state => state.common);

    useEffect(() => {

        doGetData(`data/typeSessions.json`).then(response => {
            setTypeSessionData(response.data)
        });
    }, []);

    const onChangeSteps = (value) => {
        if (value === 0) {
            navigate(route + '/add');
        } else if (value === 1) {
            navigate(route + '/add/step2/' + selected.id);
        } else {
            navigate(route + '/add/step3/' + selected.id + '/' + selected.organisationId);
        }

    };

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
            disabled: true,
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
            label: 'Adresse',
            placeholder: 'Adresse',
            name: 'description',
            key: 'description',
            type: 'text',
            disabled: true,
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
            disabled: true,
            dateFormat: 'DD-MM-YYYY HH:MM'
        }
    ];

    const initValue = {
        typeSession: 1,
        label: '',
        description: '',
        code: '',
        organisationAdresse: ''
    }


    return (
        <>
            <Controls.StepElement current={0} items={stepsItems} onChange={onChangeSteps}/>
            <Controls.EditFormGroupsUseParam title={`Session CAG : ${selected.code}`}
                                             fields={fields}
                                             showNewButton={false}
                                             showSubmitSpace={false}
                                             initialValues={initValue}
                                             router={route} backToList={true} disabledReset={true}/>
        </>
    );
}

export default AddSessionCAG;
