import React from 'react';
import {Button, Modal} from "antd";
import {CheckOutlined, CloseOutlined} from "@ant-design/icons";

function ConfirmDialog({visible, handleOk, handleCancel, message}) {
    return (
        <Modal
            title={'Confirmation!'}
            visible={visible}
            footer={[
                <>
                    <Button key="return"
                            type="primary"
                            danger
                            size="small"
                            onClick={handleOk}
                            className="pr-15"
                            icon={<CheckOutlined />}>
                        Oui
                    </Button>
                    <Button key="back" onClick={handleCancel} danger
                            size="small"
                            className={'pr-15'}
                            icon={<CloseOutlined/>}>
                        Non
                    </Button>
                </>
            ]}>
            <h6>
                {message}
            </h6>
        </Modal>
    );
}

export default ConfirmDialog;