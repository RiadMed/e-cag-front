import React from 'react';
import Controls from "../../components";
import {route} from "./";

const AddStatus = () => {

    const fields = [
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
            label: 'Description',
            placeholder: 'Description',
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
            label: 'Activé',
            placeholder: 'Activé',
            name: 'disabled',
            key: 'disabled',
            type: 'switch'
        }
    ];

    const initValue = {
        label: '',
        description: ''
    }

    return (
        <Controls.AddFormGroups title="Nouveau status" fields={fields} initialValues={initValue} router={route}/>
    );
}

export default AddStatus;
