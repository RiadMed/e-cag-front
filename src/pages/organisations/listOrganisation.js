import React from 'react';
import {useSelector} from "react-redux";
import {route} from "./";
import Controls from "../../components";
import {columns} from "./columns";
import {filters} from "../session/columns";
import {Button, Space, Tooltip} from "antd";
import {InfoCircleOutlined} from "@ant-design/icons";

const ListOrganisation = () => {

    const {data, pagination, loading} = useSelector((state) => state.common);
    const {user, } = useSelector((state => state.security));

    if (user.secretaire && !user.isAdmin) {
        const cols = columns.filter(x => x.key === 'action');

        if (cols.length === 0)
            columns.push({
                title: '',
                key: 'action',
                width: "8%",
                fixed: 'right',
                render: (record) => (
                    <Space size="small">
                        <Tooltip placement="top" title="Voir le détail" color="red">
                            <Button type="link"
                                    key={record.id}
                                    onClick={() => console.log('')}
                                    icon={<InfoCircleOutlined/>}/>
                        </Tooltip>
                    </Space>
                )
            });
    }
    return (
        <Controls.Cards title="Liste des organisations" bordered={false}>
            <Controls.PaginationTable
                dataSource={data}
                pagination={pagination}
                columns={columns}
                loading={loading}
                route={route}
                filters={filters}
                showEditBtn={true}
                showDeleteBtn={true}
                showAdvSearch={false}
                showNewBtn={user.isAdmin}
                defaultFilterValue={"code"}/>
        </Controls.Cards>
    );
}

export default ListOrganisation;
