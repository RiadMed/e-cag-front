import React from 'react';
import {Button, Dropdown, Menu} from "antd";
import {CheckSquareOutlined, MoreOutlined, PlayCircleOutlined, PlusSquareOutlined} from "@ant-design/icons";
import {statusLabels} from "../../tools/statusEnum";
import {route} from "./index";
import {useNavigate} from "react-router";

const DropMenuDown = ({record}) => {

    const navigate = useNavigate();
    const menu = (
        <Menu>
            <Menu.Item key="1" icon={<PlayCircleOutlined/>}
                       disabled={record.statusLabel !== statusLabels.INVITATION_SEND && record.statusLabel !== statusLabels.START_MEETING}
                       onClick={() => navigate(route + '/demarrer/' + record.id)}>
                {record.statusLabel !== statusLabels.START_MEETING ? "Démarrer la réunion" : "Voir la réunion"}
            </Menu.Item>
            <Menu.Item key="2" icon={<PlusSquareOutlined/>}
                       disabled={record.statusLabel !== (statusLabels.END_MEETING)}
                       onClick={() => navigate(route + '/addpv/' + record.id)}>
                Ajouter le PV
            </Menu.Item>
            <Menu.Item key="3" icon={<CheckSquareOutlined/>}
                       onClick={() => navigate(route + '/resolutions/' + record.id)}
                       disabled={record.statusLabel !== (statusLabels.PV_FILE_ADD)}>
                Résolutions
            </Menu.Item>
            <Menu.Item key="4" icon={<CheckSquareOutlined/>}
                       disabled={record.statusLabel !== (statusLabels.PV_FILE_ADD)}>
                Valider le PV
            </Menu.Item>
        </Menu>
    );

    return (
        <Dropdown overlay={menu} type={'link'}>
            <Button type="link" icon={<MoreOutlined style={{color: "#8e8e8e", cursor: "pointer"}}/>}></Button>
        </Dropdown>
    );
}

export default DropMenuDown;