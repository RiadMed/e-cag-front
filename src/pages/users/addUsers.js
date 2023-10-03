import React, {useEffect, useState} from 'react';
import Controls from "../../components";
import {route} from "./";
import {doGet, doPost} from "../../redux/services/httpActions";
import {useNavigate} from "react-router";
import {catchError} from "../../redux/services/actions";
import {useDispatch} from "react-redux";
import {message} from "antd";

const AddUsers = () => {

    const [roleList, setRoleList] = useState([]);
    const [organisationList, setOrganisationList] = useState([]);
    const [fieldList, setFieldList] = useState([]);
    const [disableResponsable, setDisableResponsable] = useState(false);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {

        const fetchRole = async () => {
            const response = await doGet('/roles');
            setRoleList(response.data);
        };
        fetchRole().catch((error) => {
            dispatch(catchError(error, navigate));
        });


        const fetchOrg = async () => {
            const response = await doGet('/organisations');
            setOrganisationList(response.data)
        };
        fetchOrg().catch((error) => {
            dispatch(catchError(error, navigate));
        });

    }, []);

    const checkResponsable = (list, role) => {
        return list.some(item => {
            return role === item.key;
        });
    };

    const onChangeRole = (value) => {
        const checkRole2 = checkResponsable(value, '2');
        setDisableResponsable(!checkRole2);
        if (checkRole2) {
            setFieldList([...fields, addField]);
        } else {
            setFieldList([]);
            setFieldList(fields);
        }
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
            name: 'organisationIds',
            key: 'organisationIds',
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
        },
        {
            label: 'Activé',
            placeholder: 'Activé',
            name: 'disabled',
            key: 'disabled',
            type: 'switch'
        }
    ];

    const addField = {
        label: "Organisation Responsable",
        placeholder: 'Organisation Responsable',
        name: 'organisationResponsableId',
        key: 'organisationResponsableId',
        type: 'select',
        items: organisationList,
        itemValue: 'key',
        itemLabel: 'label',
        rules: [
            {
                required: !disableResponsable,
                message: 'Please input type!',
            }
        ]
    }


    const initValue = {
        label: '',
        description: ''
    }

    const onSaveMembre = (value) => {
        const fectSaveMembre = async () => {
            const membre = await doPost(route + '/saveMembre', value);
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


    return (
        <Controls.AddFormGroups title="Nouveeau Membre" fields={fieldList.length > 0 ? fieldList : fields}
                                submitAction={onSaveMembre}
                                labelCol={5} wrapperCol={16}
                                initialValues={initValue} router={route}
                                backToList={true}/>
    );
};

export default AddUsers;
