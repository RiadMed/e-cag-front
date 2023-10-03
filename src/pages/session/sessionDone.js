import React, {useEffect} from 'react';
import {Button, Result} from "antd";
import {useNavigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {catchError, findById} from "../../redux/services/actions";
import {route} from "./index";
import {ArrowLeftOutlined, HddOutlined} from "@ant-design/icons";

const SessionDone = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {id} = useParams();

    useEffect(() => {
        const dataFetch = async () => {
            await dispatch(findById(id, route));
        }
        dataFetch().catch((error) => {
            dispatch(catchError(error, navigate));
        })
    }, [dispatch, id]);


    const {selected} = useSelector(state => state.common);

    const subTitle = "Cette session CAG est archivée le " + selected.sessionDateTime;

    return (
        <Result
            status="success"
            icon={<HddOutlined/>}
            title="Session CAG archivée!"
            subTitle={subTitle}
            extra={[
                <Button key="console" danger icon={<ArrowLeftOutlined/>}
                        onClick={() => navigate(route)}>
                    Retour
                </Button>,
            ]}
        />
    );
}

export default SessionDone;