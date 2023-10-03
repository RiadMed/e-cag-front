import React from 'react';
import {useSelector} from "react-redux";
import Controls from "../../components";
import {columns, filters} from "./column";
import {route} from "./index";

const ListInvitations = () => {

    const {data, pagination, loading} = useSelector((state) => state.common);
    const {user} = useSelector((state) => state.security);

    return (
        <Controls.Cards title="Liste des invitations : " bordered={false}>
            <Controls.PaginationTable
                dataSource={data}
                pagination={pagination}
                columns={columns}
                filters={filters}
                loading={loading}
                route={route}
                showEditBtn={false}
                showDeleteBtn={false}
                showAdvSearch={false}
                showNewBtn={false}
                showViewBtn={true}
                search={true}
                orderBy={'id'}
                sortOrder={'desc'}
                query={`mail==${user.email}`}
                defaultFilterValue={"Code"}/>
        </Controls.Cards>
    );
}

export default ListInvitations;