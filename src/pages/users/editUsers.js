import React, {useEffect, useState} from 'react';
import Controls from "../../components";
import {route} from "./";
import {doGet, doPatch} from "../../redux/services/httpActions";
import {catchError, findById} from "../../redux/services/actions";
import {useNavigate} from "react-router";
import {useDispatch, useSelector} from "react-redux";
import {message} from "antd";
import {useParams} from "react-router-dom";

const EditUsers = () => {
    const [roleList, setRoleList] = useState([]);
    const [organisationList, setOrganisationList] = useState([]);
    const [disableResponsable, setDisableResponsable] = useState(false);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {id} = useParams();

    useEffect(() => {

        const dataFetch = async () => {
            await dispatch(findById(id, route));
        }
        dataFetch().catch((error) => {
            dispatch(catchError(error, navigate));
        })

        const fetchRoleEdit = async () => {
            const response = await doGet('/roles');
            setRoleList(response.data);
        };
        fetchRoleEdit().catch((error) => {
            dispatch(catchError(error, navigate));
        });

        const fetchOrgEdit = async () => {
            const response = await doGet('/organisations/details');
            setOrganisationList(response.data)
        };
        fetchOrgEdit().catch((error) => {
            dispatch(catchError(error, navigate));
        });

    }, []);

    const {selected} = useSelector(state => state.common);

    const checkResponsable = (list, role) => {
        return list.some(item => {
            return role === item.key;
        });
    };

    const onChangeRole = (value) => {
        setDisableResponsable(!checkResponsable(value, '2'));
    };


    const fields = [
        {
            label: 'Nom',
            placeholder: 'Nom',
            name: 'lastName',
            key: 'lastName',
            type: 'text',
            autoFocus: true,
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
            label: 'Prénom',
            placeholder: 'Prénom',
            name: 'firstName',
            key: 'firstName',
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
            label: 'Email',
            placeholder: 'Email',
            name: 'email',
            key: 'email',
            type: 'text',
            rules: [
                {
                    required: true,
                    message: 'Please input Name!',
                }, {
                    type: 'email',
                    message: 'Format du courriel incorrecte',
                }
            ]
        },
        {
            label: 'Téléphone',
            placeholder: 'Téléphone',
            name: 'phone',
            key: 'phone',
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
            label: 'Organisation',
            placeholder: 'Organisation',
            name: 'organisationList',
            key: 'organisationList',
            type: 'selectObject',
            items: organisationList,
            itemValue: 'id',
            itemLabel: 'label',
            mode: 'multiple',
            rules: [
                {
                    required: true,
                    message: 'Please input type!',
                }
            ]
        },
        {
            label: 'Roles',
            placeholder: 'Roles',
            name: 'rolesList',
            key: 'rolesList',
            type: 'selectObject',
            items: roleList,
            onChangeValue: (value) => onChangeRole(value),
            itemValue: 'id',
            itemLabel: 'label',
            mode: 'multiple',
            rules: [
                {
                    required: true,
                    message: 'Please input type!',
                }
            ]
        }, {
            label: 'Responsable',
            placeholder: 'Responsable',
            name: 'organisationResponsableId',
            key: 'organisationResponsableId',
            type: 'select',
            items: organisationList,
            itemValue: 'id',
            itemLabel: 'label',
            disabled: disableResponsable
        },
        {
            label: 'Activé',
            placeholder: 'Activé',
            name: 'disabled',
            key: 'disabled',
            type: 'switch'
        }
    ];

    const onEditMembre = (value) => {
        const addValue = {
            id: selected.id,
            accountName: selected.accountName
        };
        let newValue = Object.assign(value, addValue);
        const fectSaveMembre = async () => {
            const membre = await doPatch(route + '/editMembre', newValue);
            if (membre.data.success) {
                message.success(`${membre.data.message}.`);
                navigate(route);
            } else
                message.error(`${membre.data.message}.`);
        };
        fectSaveMembre().catch((error) => {
            dispatch(catchError(error, navigate));
        });

    }


    const initValue = {
        label: '',
        description: '',
    }

    return (
        <Controls.Cards title={'Modifier le memebre :'} bordered={false}
                        extra={<Controls.CloseButton router={route}/>}>
            <Controls.EditFormGroups selected={selected} param={id}
                                     fields={fields}
                                     submitAction={onEditMembre}
                                     initialValues={initValue}
                                     router={route} backToList={true} disabledReset={true}/>
        </Controls.Cards>);

}

export default EditUsers;
