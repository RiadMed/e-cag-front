import React, {useEffect, useState} from 'react';
import {doGet} from "../../redux/services/httpActions";
import {Button, Card, Space, Table, Tooltip} from "antd";
import {columns} from "./column";
import {useNavigate} from "react-router-dom";
import {InfoCircleOutlined} from "@ant-design/icons";
import moment from "moment";
import {catchError} from "../../redux/services/actions";
import {useDispatch} from "react-redux";

const HomeSessionData = ({orgIds}) => {

    const [sessionData, setSessionData] = useState([]);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {

        const year = moment().year();

        const fetchSessions = async () => {
            const response = await doGet(`/sessionCAGs?orgId=${orgIds}&annnee=${year}`);
            setSessionData(response.data);
        };
        fetchSessions().catch((error) => {
            dispatch(catchError(error, navigate));
        });

    }, [])

    const cols = columns.filter(x => x.key === 'action');
    if (cols.length === 0)
        columns.push({
            title: '',
            key: 'action',
            width: '5%',
            fixed: 'right',
            render: (record) => (
                <Space size="small">
                    <Tooltip placement="top" title="Voir le détail" color="red">
                        <Button type="link"
                                key={record.id}
                                onClick={() => navigate(`/sessionCAGs/view/${record.id}`)}
                                icon={<InfoCircleOutlined/>}/>
                    </Tooltip>
                </Space>
            )
        });


    return (
        <Card bordered={false}>
            <Table columns={columns} dataSource={sessionData} pagination={false} showSorterTooltip={false} size={`small`}/>
        </Card>
    );
}

export default HomeSessionData;