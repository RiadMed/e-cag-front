import React from 'react';
import {useSelector} from "react-redux";
import {route} from "./";
import {columns} from "./columns";
import {Card} from "antd";
import Controls from "../../components"

const ListStatus = () => {

    const {data, pagination, loading} = useSelector((state) => state.common);

    return (
        <Card title="Liste des status" bordered={false}>
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
                showNewBtn={true}
                defaultFilterValue={"label"}/>
        </Card>
    );
}

export default ListStatus;
