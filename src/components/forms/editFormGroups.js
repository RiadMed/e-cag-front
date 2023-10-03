import React from 'react';
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import {update} from "../../redux/services/actions";
import {Form, message, Row, Skeleton} from "antd";
import Controls from "../index";
import ButtonsBar from "../elements/buttonsBar";

function EditFormGroups({
                            selected,
                            param,
                            title,
                            fields,
                            forms,
                            initialValues,
                            router,
                            submitAction,
                            showResetBtn,
                            showCancelBtn,
                            showNewButton,
                            showSubmitSpace,
                            size,
                            backToList
                        }) {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const save = (value) => dispatch(update(value, router));

    const [form] = Form.useForm();

    if (forms) {
        forms.setFieldsValue(selected);
    } else {
        form.setFieldsValue(selected);
    }

    const onUpdate = async value => {
        try {
            const editValue = {
                id: param,
                ...value
            }
            await save(editValue);
            navigate(router);
        } catch (error) {
            message.error(`${error.message}.`);
        }
    }

    return (

        <div>
            {selected ? (
                <Form
                    labelCol={{span: 3}}
                    wrapperCol={{span: 18}}
                    form={forms ? forms : form}
                    onFinish={submitAction ? submitAction : onUpdate}
                    initialValues={initialValues}
                    size={size ? size : 'middle'}
                    autoComplete="off">
                    {/* *********** Forms Items *********** */}
                    <Row>
                        <Controls.FormItems fields={fields} form={forms ? forms : form} isCreate={false}/>
                    </Row>

                    {/* *********** Toolbar Actions *********** */}
                    <Controls.FormActions form={forms ? forms : form}
                                          router={router}
                                          showNewButton={showNewButton}
                                          showCancelBtn={showCancelBtn}
                                          showResetBtn={showResetBtn}
                                          showSubmitSpace={showSubmitSpace}
                                          backToList={backToList}/>
                </Form>
            ) : (
                <Skeleton active/>
            )}

        </div>
    );
};

ButtonsBar.defaultProps = {
    showResetBtn: true,
    showCancelBtn: true,
    showNewButton: true,
    showSubmitSpace: true
};

export default EditFormGroups;
