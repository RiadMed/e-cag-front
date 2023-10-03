import React from 'react';
import Controls from "../../components";
import {route} from "./";

const EditStatus = () => {

    const fields = [
        {
            label: 'Nom',
            placeholder: 'Nom',
            name: 'label',
            key: 'label',
            type: 'text',
            rules: [
                {
                    required: true,
                    message: 'Please input family Name!',
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
                    message: 'Please input family Name!',
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
        description: '',
    }

    return (
        <Controls.EditFormGroupsUseParam title="Modifier le status'" fields={fields} initialValues={initValue}
                                         router={route} backToList={true} disabledReset={true}/>
    );
}

export default EditStatus;
