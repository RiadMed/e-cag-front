import React from 'react';
import {Tag} from "antd";

const StatusTags = ({label, margin}) => {
    const colorMap = new Map([['En Cours', 'processing'],
        ['Planifier', 'cyan'],
        ['Envoyer', 'purple'],
        ['En Attente', 'volcano'],
        ['Modification', 'magenta'],
        ['Annuler', 'error'],
        ['Date Annuler', 'error'],
        ['Documents Télécharger', 'orange'],
        ['Invitation Envoyés', 'geekblue'],
        ['Réunion Démarrer', 'green'],
        ['Réunion Terminer', 'volcano'],
        ['PV Ajouter', 'magenta'],
    ])

    return (
        <Tag color={colorMap.get(label)} className={margin ? "tag-mb" : ""}>
            {label}
        </Tag>
    );
}

export default StatusTags;
