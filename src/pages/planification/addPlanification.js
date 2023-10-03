import React, {useEffect, useState} from 'react';
import Controls from "../../components";
import {route} from "../session";
import {doGetData} from "../../redux/services/localActions";
import {message} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {createDate} from "../../redux/services/sessionCagService";

const AddPlanification = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const save = (value) => dispatch(createDate(value, route + '/saveDate', navigate));

    const [typeSessionData, setTypeSessionData] = useState([]);

    const [sessionDate, setSessionDate] = useState();
    const [annee, setAnnee] = useState();
    const [mois, setMois] = useState();
    const [sessionCode, setSessionCode] = useState('');
    const [sessionType, setSessionType] = useState();

    const {user} = useSelector((state) => state.security);

    useEffect(() => {
        doGetData(`data/typeSessions.json`).then(response => {
            setTypeSessionData(response.data)
        });
    }, []);

    const onChangeDate = (date, dateString) => {
        setSessionDate(dateString);
        const dateArray = dateString.split('-');
        setAnnee(parseInt(dateArray[0]));
        setMois(parseInt(dateArray[1]));

        setSessionCode(user.organisationResponsable + `${sessionType === 1 ? '-SO' : '-SEX'}` + '-' + dateArray[0] + '/' + dateArray[1]);
    }

    const onChangeTypeValue = (value) => {
        setSessionCode(user.organisationResponsable + `${value === 1 ? '-SO' : '-SEX'}`);
        setSessionType(value);
    }

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
            onChangeValue: (value) => onChangeTypeValue(value),
            rules: [
                {
                    required: true,
                    message: 'Please input type!',
                }
            ]
        }, {
            label: 'Date',
            placeholder: 'Date',
            name: 'date',
            key: 'date',
            type: 'date',
            dateFormat: 'DD-MM-YYYY HH:MM',
            onChange: onChangeDate
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
        label: '',
        activer: true
    }

    const onCreateSession = async (value) => {
        try {
            const addValue = {
                code: sessionCode,
                sessionDateTime: sessionDate,
                annee: annee,
                mois: mois,
                organisationId: user.organisationResponsableId
            }
            const newValue = Object.assign(value, addValue);
            await save(newValue);
        } catch (error) {
            message.error(`${error.message}.`);
        }
    }

    return (
        <Controls.AddFormGroups
            title={'Plannifier une nouvelle session : ' + sessionCode}
            fields={fields} initialValues={initValue}
            router={route}
            BackToList={false} BackToUrl={'sessionCAGs/planifications'}
            submitAction={onCreateSession}/>
    );
}

export default AddPlanification;
