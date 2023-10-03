import React from 'react';
import Controls from "../../components";
import {statusLabels} from "../../tools/statusEnum";
import {useSelector} from "react-redux";
import {route} from "./index";
import {Button} from "antd";
import {CheckOutlined} from "@ant-design/icons";
import {columns} from "./columns";
import {useNavigate} from "react-router";

const SessionAValider = () => {

    const navigate = useNavigate();

    const {data, pagination, loading} = useSelector((state) => state.common);
    const {user} = useSelector((state) => state.security);

    const cols = columns.filter(x => x.key === 'valider');
    if (cols.length === 0)
        columns.push({
            title: 'Valider',
            key: 'valider',
            width: '10%',
            fixed: 'right',
            align: 'center',
            render: (record) => (<Button type="primary" danger icon={<CheckOutlined/>} size={'small'}
                                         style={{paddingRight: "15px"}}
                                         onClick={() => navigate('/sessionCAGs/aValider/' + record.id)}>Valider</Button>)
        })

    return (
        <Controls.Cards title="Liste des Sessions CAG à valider" bordered={false}>
            <Controls.PaginationTable
                dataSource={data}
                pagination={pagination}
                columns={columns}
                loading={loading}
                route={route}
                pageSize={10}
                showEditBtn={true}
                showDeleteBtn={true}
                showAdvSearch={false}
                showNewBtn={false}
                newBtnRedirect={'create'}
                editRedirect={'modifier'}
                search={true}
                hideActionColumn={true}
                query={`organisation.id=in=(${user.organisationList.map(a => a.key)});status.label==${statusLabels.PLANNED}`}
                defaultFilterValue={"code"}
                deletePopTitle="Annulez la date"
                deletePopDescription="Êtes-vous sûr d'annuler cette date?."/>
        </Controls.Cards>
    );
}

export default SessionAValider;