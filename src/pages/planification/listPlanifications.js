import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import Controls from "../../components";
import {statusLabels} from "../../tools/statusEnum";
import {route} from "./index";
import {columns} from "./column";
import {dateCancel} from "../../redux/services/sessionCagService";

const ListPlanifications = () => {

    const {data, pagination, loading} = useSelector((state) => state.common);
    const {user} = useSelector((state) => state.security);

    const dispatch = useDispatch();

    const annulerLaDate = async (value) => {
        await dispatch(dateCancel(value, `${route}/annuler`));
    }

    return (
        <Controls.Cards title="Liste des planifications CAG" bordered={false}>
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
                newBtnRedirect={'planifications/add'}
                editRedirect={'planifications/edit'}
                search={true}
                query={`organisation.id=in=(${user.organisationList.map(a => a.key)});status.label==${statusLabels.PLANNED}`}
                defaultFilterValue={"code"}
                deleteAction={annulerLaDate}
                deletePopTitle="Annulez la date"
                deletePopDescription="Êtes-vous sûr d'annuler cette date?."/>
        </Controls.Cards>
    );
}

export default ListPlanifications;