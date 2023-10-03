import React from 'react';
import {useSelector} from "react-redux";
import {route} from "./";
import Controls from "../../components";
import {columns} from "./columns";

const ListUsers = () => {

    const {data, pagination, loading} = useSelector((state) => state.common);

    return (
        <Controls.Cards title="Liste des Membres" bordered={false}>
            <Controls.PaginationTable
                dataSource={data}
                pagination={pagination}
                columns={columns}
                loading={loading}
                route={route}
                showEditBtn={true}
                showDeleteBtn={true}
                showAdvSearch={false}
                showNewBtn={true}
                defaultFilterValue={"lastName"}/>
        </Controls.Cards>
    );
}

export default ListUsers;
