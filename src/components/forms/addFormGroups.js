import React from 'react';
import {Divider, Form, message, Row} from "antd";
import Controls from "../index";
import {useDispatch} from "react-redux";
import {create} from "../../redux/services/actions";
import {useNavigate} from "react-router-dom";

/**
 * Add Forms Groups function component
 * @param title
 * @param fields la list des champs
 * @param initialValues
 * @param router
 * @param size
 * @returns {*}
 * @constructor
 * @author Mohamed Ryadh BOUMENDJAS
 */
const AddFormGroups = ({
                           title,
                           fields,
                           forms,
                           initialValues,
                           router,
                           size,
                           submitAction,
                           backToList,
                           BackToUrl,
                           addValue,
                           submitTextLabel,
                           submitIcon,
                           bordered,
                           loading,
                           labelCol,
                           showSubmitSpace,
                           wrapperCol,
                           children
                       }) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const save = (value) => dispatch(create(value, router));
    const [form] = Form.useForm();


    const onCreate = async (value) => {
        try {
            if (addValue) {
                let newValue = Object.assign(value, addValue);
                await save(newValue);
            } else {
                await save(value);
            }
            navigate(router);
        } catch (error) {
            message.error(`${error.message}.`);
        }
    }

    return (
        <Controls.Cards title={title} bordered={bordered ? bordered : false}
                        loading={loading}
                        extra={<Controls.CloseButton router={BackToUrl ? '/' + BackToUrl : router}/>}>
            <Form
                labelCol={{span: labelCol ? labelCol : 3}}
                wrapperCol={{span: wrapperCol ? wrapperCol : 18}}
                form={forms ? forms : form}
                onFinish={submitAction ? submitAction : onCreate}
                initialValues={initialValues}
                size={size ? size : 'middle'}
                autoComplete="off">
                {/* *********** Forms Items *********** */}
                <Row>
                    <Controls.FormItems fields={fields} form={forms ? forms : form} isCreate={true}/>
                    {children}
                </Row>
                {/* *********** Cards Divider *********** */}
                <Divider plain/>
                {/* *********** Toolbar Actions *********** */}
                <Controls.FormActions form={forms ? forms : form} showNewButton={false} backToList={backToList}
                                      BackToUrl={BackToUrl}
                                      router={router} showSubmitSpace={showSubmitSpace}
                                      showResetBtn={true} submitTextLabel={submitTextLabel} submitIcon={submitIcon}/>
            </Form>
        </Controls.Cards>
    );
}

export default AddFormGroups;
