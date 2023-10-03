import React from 'react';
import {Button, Result} from "antd";
import {ArrowLeftOutlined} from "@ant-design/icons";
import {useNavigate} from "react-router-dom";

function Results({status, title, subTitle}) {
    const navigate = useNavigate();
    return (
        <Result
            status={status ? status : 'success'}
            title={title}
            subTitle={subTitle}
            extra={[
                <Button type="primary" key="console" danger size={'small'} icon={<ArrowLeftOutlined/>}
                        onClick={() => navigate.goBack()}>
                    Retour
                </Button>
            ]}
        />
    );
}

export default Results;