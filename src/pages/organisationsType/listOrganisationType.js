import React from 'react';
import {useSelector} from "react-redux";
import {route} from "./";
import Controls from "../../components";
import {columns} from "./columns";
import {filters} from "../session/columns";

const ListOrganisationType = () => {


    const {data, pagination, loading} = useSelector((state) => state.common);

    return (
        <Controls.Cards title="Liste des types d'organisations" bordered={false}>
            <Controls.PaginationTable
                dataSource={data}
                pagination={pagination}
                columns={columns}
                filters={filters}
                loading={loading}
                route={route}
                showEditBtn={true}
                showDeleteBtn={true}
                showAdvSearch={false}
                showNewBtn={true}
                defaultFilterValue={"label"}/>
        </Controls.Cards>
    );
}

export default ListOrganisationType;
