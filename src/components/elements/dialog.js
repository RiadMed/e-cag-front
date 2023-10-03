import React from 'react';
import {Modal, Button} from 'antd';

const Dialog = (props) => {

    return (
        <Modal
            title={props.title}
            key={'TEST'}
            visible={props.visible}
            onCancel={props.hideModal}
            footer={props.footer ? props.footer : [
                <Button onClick={props.hideModal}>
                    Fermer
                </Button>
            ]}>
            {props.children}
        </Modal>
    );
}

export default Dialog;
