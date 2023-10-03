import React from 'react';
import {statusLabels} from "../../tools/statusEnum";
import {route} from "../session";
import {CheckSquareOutlined, InfoCircleOutlined, MailOutlined, UploadOutlined} from "@ant-design/icons";
import {Button} from "antd";
import {useNavigate} from "react-router";

const RedirectButton = ({record}) => {

    const navigate = useNavigate();

    switch (record.statusLabel) {
        case statusLabels.PROGRESS :
            return <Button danger
                           type="primary"
                           size={'small'}
                           onClick={() => navigate(`${route}/add/step2/${record.id}`)}
                           icon={<UploadOutlined/>}>Télécharger</Button>
        case statusLabels.FILE_DOWNLOAD :
            return <Button size={'small'}
                           danger
                           onClick={() => navigate(`${route}/add/step3/${record.id}/${record.organisationId}`)}
                           icon={<MailOutlined/>}>Inviter</Button>

        case statusLabels.INVITATION_SEND :
            return <Button size={'small'}
                           danger
                           onClick={() => navigate(`${route}/add/step3/${record.id}/${record.organisationId}`)}
                           icon={<CheckSquareOutlined/>}>Démarrer la réunion</Button>
        default:
            return <Button size={'small'}
                           key={record.id}
                           onClick={() => navigate(`${route}/view/${record.id}`)}
                           icon={<InfoCircleOutlined/>}>Détail</Button>
    }
}

export default RedirectButton;