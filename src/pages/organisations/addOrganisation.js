import React, {useEffect, useState} from 'react';
import Controls from "../../components";
import {route} from "./";
import {doGet} from "../../redux/services/httpActions";

const AddOrganisation = () => {

    const [organisationTypeItems, setOrganisationTypeItems] = useState([]);

    useEffect(() => {
        doGet('/organisationTypes').then(response => {
            setOrganisationTypeItems(response.data);
        });
    }, []);

    const fields = [
        {
            label: 'Code',
            placeholder: 'Code',
            name: 'code',
            key: 'code',
            type: 'text',
            autoFocus: true,
            size: 7,
            rules: [
                {
                    required: true,
                    message: 'Please input Code!',
                }, {
                    max: 7,
                    message: 'Maximum 7 caractère!',
                }
                , {
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
            label: 'Adresse',
            placeholder: 'Adresse',
            name: 'adresse',
            key: 'adresse',
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
            label: 'Type',
            placeholder: 'Type',
            name: 'organisationTypeId',
            key: 'organisationTypeId',
            type: 'select',
            items: organisationTypeItems,
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
            label: 'Téléphone',
            placeholder: 'Téléphone',
            name: 'phone',
            key: 'phone',
            type: 'text',
            rules: [
                {
                    required: true,
                    message: 'Please input phone!',
                }
            ]
        },
        {
            label: 'Contact Mail Administrateur',
            placeholder: 'Contact Mail Administrateur',
            name: 'adminMail',
            key: 'adminMail',
            type: 'text',
            rules: [
                {
                    required: true,
                    message: 'Please input phone!',
                }
            ]
        },
        {
            label: 'Contact Mail Secrétaire',
            placeholder: 'Contact Mail Secrétaire',
            name: 'secretaireMail',
            key: 'secretaireMail',
            type: 'text',
            rules: [
                {
                    required: true,
                    message: 'Please input phone!',
                }
            ]
        },
        {
            label: 'Contact Mail Responsable',
            placeholder: 'Contact Mail Responsable',
            name: 'responsableMail',
            key: 'responsableMail',
            type: 'text',
            rules: [
                {
                    required: true,
                    message: 'Please input phone!',
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
        },
        {
            label: 'Logo',
            placeholder: 'Log',
            name: 'logo',
            key: 'logo',
            type: 'file',
            rules: [
                {
                    required: true,
                    message: 'Please input Description!',
                }
            ]
        }
    ];

    const initValue = {
        code: '',
        label: '',
        description: '',
        phone: ''
    }

    return (
        <Controls.AddFormGroups title="Nouvelle organisation" fields={fields} initialValues={initValue} router={route}
                                backToList={true} labelCol={5} wrapperCol={16}/>
    );
}

export default AddOrganisation;
