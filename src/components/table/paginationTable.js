import React, {useEffect} from 'react';
import {Button, Divider, Popconfirm, Space, Table, Tooltip} from "antd";
import {useDispatch} from "react-redux";
import {DeleteOutlined, EditOutlined, InfoCircleOutlined} from "@ant-design/icons";
import {catchError, LazyLoadData, remove, searchLazyData} from "../../redux/services/actions";
import {useNavigate} from 'react-router-dom';
import Controls from "../index";

/**
 * Pagination table function component with crud options
 * @param dataSource
 * @param columns
 * @param route
 * @param filters
 * @returns {*}
 * @constructor
 * @author Mohamed Ryadh BOUMENDJAS
 */
const PaginationTable = ({
                             dataSource,
                             pagination,
                             columns,
                             loading,
                             route,
                             filters,
                             size,
                             showViewBtn,
                             showEditBtn,
                             showDeleteBtn,
                             actionColumnWidth,
                             showNewBtn,
                             labelNewBtn,
                             pageSize,
                             sortBy,
                             orderBy,
                             sortOrder,
                             defaultFilterValue,
                             newBtnRedirect,
                             editRedirect,
                             search,
                             query,
                             filterFileName,
                             deleteAction,
                             deletePopTitle,
                             deletePopDescription,
                             hideActionColumn,
                         }) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();


    useEffect(() => {
        const dataFetch = async () => {
            if (search)
                await dispatch(searchLazyData(0, `${pageSize ? pageSize : 5}`, `${orderBy ? orderBy : 'id'}`, `${sortOrder ? sortOrder : 'asc'}`, query, `${route}`));
            else
                await dispatch(LazyLoadData(0, `${pageSize ? pageSize : 5}`, `${orderBy ? orderBy : 'id'}`, `${sortOrder ? sortOrder : 'asc'}`, `${route}`));
        }
        dataFetch().catch((error) => {
            dispatch(catchError(error, navigate));
        })

    }, [dispatch]);

    const removeRow = async (id) => {
        await dispatch(remove(id, route))

    };

    /**
     * onSort function (ascend, descend)
     *
     * @param pagination
     * @param filters
     * @param sorter
     * @param extra
     * @returns {Promise<void>}
     */
    const onSort = async (pagination, filters, sorter, extra) => {
        const {order} = sorter;
        const {current, pageSize} = pagination;
        let sort = 'asc';
        if (order && order === 'descend') {
            sort = 'desc';
        }

        if (search)
            await dispatch(searchLazyData(
                (current - 1),
                pageSize,
                orderBy ? orderBy : 'id',
                sortOrder ? sortOrder : sort,
                query,
                `${route}`
            ));
        else
            await dispatch(LazyLoadData(
                (current - 1),
                pageSize,
                orderBy ? orderBy : 'id',
                sortOrder ? sortOrder : sort,
                `${route}`
            ));
    };

    /**
     * Add Action column on table (Delete && Edit buttons)
     */
    if (!hideActionColumn) {
        const cols = columns.filter(x => x.key === 'action');
        if (cols.length === 0)
            columns.push({
                title: '',
                key: 'action',
                width: actionColumnWidth ? actionColumnWidth : '12%',
                fixed: 'right',
                render: (record) => (
                    <Space size="small">
                        {showViewBtn ? (<>
                                <Tooltip placement="top" title="Afficher le détail" color="red">
                                    <Button type="link"
                                            onClick={() => navigate(`${route}/view/${record.id}`)}
                                            icon={<InfoCircleOutlined/>}
                                    />
                                </Tooltip>

                            </>) :
                            ('')}
                        {showEditBtn ?
                            <>
                                <Divider type="vertical" style={{borderColor: "#d0d0d0"}}/>
                                <Tooltip placement="top" title="Modifier la ligne" color="red">
                                    <Button type="link"
                                            onClick={() => navigate(`${route}/${editRedirect}/${record.id}`)}
                                            icon={<EditOutlined/>}
                                    />
                                </Tooltip>
                                <Divider type="vertical" style={{borderColor: "#d0d0d0"}}/>
                            </>
                            : <></>}
                        {showDeleteBtn ?
                            <Popconfirm
                                title={deletePopTitle}
                                description={deletePopDescription}
                                okText="Oui"
                                cancelText="Non"
                                onConfirm={() =>
                                    deleteAction ? deleteAction(record.id) : removeRow(record.id)}
                            >
                                <Button type="link" danger
                                        icon={<DeleteOutlined/>}/>
                            </Popconfirm> : <></>}
                    </Space>
                )
            });
    }

    return (
        <Table
            title={() => <Controls.TableHeader filters={filters} route={route} showNewBtn={showNewBtn}
                                               filterFileName={filterFileName}
                                               sortBy={sortBy} labelNewBtn={labelNewBtn}
                                               pageSize={pageSize} newBtnRedirect={newBtnRedirect}
                                               defaultFilterValue={defaultFilterValue}/>}
            size={size ? size : 'small'}
            columns={columns}
            dataSource={dataSource}
            pagination={pagination}
            loading={loading}
            onChange={onSort}
            scroll={pagination.total > 0 ? {x: "auto"} : {}}
            sortOrder={sortOrder ? sortOrder : 'ascend'}
            rowKey="id"
            showSorterTooltip={false}
            sticky/>
    );
}

export default PaginationTable;


PaginationTable.defaultProps = {
    showNewBtn: true,
    hideActionColumn: false,
    newBtnRedirect: 'add',
    editRedirect: 'edit',
    deletePopTitle: 'Suprimer la ligne',
    deletePopDescription: 'Êtes-vous sûr de supprimer cette ligne?.'
};
