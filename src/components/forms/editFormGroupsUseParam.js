import React, {useEffect} from 'react';
import {Divider, Form, message, Row} from "antd";
import Controls from "../index";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate, useParams} from "react-router-dom";
import {catchError, findById, update} from "../../redux/services/actions";
import ButtonsBar from "../elements/buttonsBar";

/**
 * Edit forms groups function component
 * @param title
 * @param fields
 * @param initialValues
 * @param router
 * @param size
 * @returns {*}
 * @constructor
 * @author Mohamed Ryadh BOUMENDJAS
 */
const EditFormGroupsUseParam = ({
                                    title,
                                    fields,
                                    forms,
                                    initialValues,
                                    router,
                                    size,
                                    submitAction,
                                    backToList,
                                    BackToUrl,
                                    disabledReset,
                                    bordered,
                                    newBtnRedirect,
                                    showResetBtn,
                                    showCancelBtn,
                                    showNewButton,
                                    showSubmitSpace,
                                    labelCol,
                                    wrapperCol
                                }) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const save = (value) => dispatch(update(value, router));

    const [form] = Form.useForm();

    const {id} = useParams();

    useEffect(() => {
        const dataFetch = async () => {
            await dispatch(findById(id, router));
        }
        dataFetch().catch((error) => {
            dispatch(catchError(error, navigate));
        })
    }, [dispatch, id, router]);

    const {selected, loading} = useSelector(state => state.common);

    if (forms) {
        forms.setFieldsValue(selected);
    } else {
        form.setFieldsValue(selected);
    }

    const onUpdate = async value => {
        try {
            const editValue = {
                id: id,
                ...value
            }
            await save(editValue);
            navigate(router);
        } catch (error) {
            message.error(`${error.message}.`);
        }
    }

    return (

        <Controls.Cards title={`${title} N°: ${id}`} bordered={bordered ? bordered : false}
                        loading={loading}
                        extra={<Controls.CloseButton router={router}/>}>
            <Form
                labelCol={{span: labelCol ? labelCol : 3}}
                wrapperCol={{span: wrapperCol ? wrapperCol : 18}}
                form={forms ? forms : form}
                onFinish={submitAction ? submitAction : onUpdate}
                initialValues={initialValues}
                size={size ? size : 'middle'}
                autoComplete="off">
                {/* *********** Forms Items *********** */}
                <Row>
                    <Controls.FormItems fields={fields} form={forms ? forms : form} isCreate={false}/>
                </Row>
                {/* *********** Cards Divider *********** */}
                <Divider plain/>
                {/* *********** Toolbar Actions *********** */}
                <Controls.FormActions form={forms ? forms : form}
                                      showNewButton={showNewButton}
                                      router={router} BackToUrl={BackToUrl}
                                      showSubmitSpace={showSubmitSpace}
                                      newBtnRedirect={newBtnRedirect}
                                      backToList={backToList} disabledReset={disabledReset} showResetBtn={true}/>
            </Form>

        </Controls.Cards>
    );
}

ButtonsBar.defaultProps = {
    showResetBtn: true,
    showCancelBtn: true,
    showNewButton: true,
    showSubmitSpace: true
};

export default EditFormGroupsUseParam;
