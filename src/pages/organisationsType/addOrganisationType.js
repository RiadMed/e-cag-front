import React from 'react';
import Controls from "../../components";
import {route} from "./";

const AddOrganisationType = () => {

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
            label: 'Activé',
            placeholder: 'Activé',
            name: 'activer',
            key: 'activer',
            type: 'switch'
        }
    ];

    const initValue = {
        label: '',
        activer: true
    }

    return (
        <Controls.AddFormGroups title="Nouveau type d'organisation" fields={fields} initialValues={initValue}
                                router={route}/>
    );
}

export default AddOrganisationType;
