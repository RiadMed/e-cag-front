import React from 'react';
import {Form} from "antd";
import Controls from "../index";

const layout = {
    labelCol: {span: 4},
    wrapperCol: {span: 16},
};

const FormActions = ({
                         form,
                         router,
                         showNewButton,
                         backToList,
                         BackToUrl,
                         disabledReset,
                         submitTextLabel,
                         submitIcon,
                         notSubmit,
                         newBtnRedirect,
                         showResetBtn,
                         showCancelBtn,
                         size,
                         children,
                         showSubmitSpace
                     }) => {

    return (
        <Form.Item wrapperCol={{...layout.wrapperCol, offset: 3}}>
            <Controls.ButtonsBar form={form} router={router} showNewButton={showNewButton} backToList={backToList}
                                 disabledReset={disabledReset} submitTextLabel={submitTextLabel} submitIcon={submitIcon}
                                 notSubmit={notSubmit} BackToUrl={BackToUrl}
                                 size={size} children={children} showCancelBtn={showCancelBtn}
                                 showSubmitSpace={showSubmitSpace} newBtnRedirect={newBtnRedirect}/>
        </Form.Item>
    );
}

export default FormActions;
