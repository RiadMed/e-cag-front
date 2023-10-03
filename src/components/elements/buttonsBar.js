import React from 'react';
import Controls from "../index";
import {ArrowLeftOutlined, CheckOutlined, CloseOutlined, PlusOutlined} from "@ant-design/icons";
import {Divider, Space} from "antd";
import {useNavigate} from "react-router-dom";

const ButtonsBar = ({
                        form,
                        backToList,
                        BackToUrl,
                        router,
                        disabledReset,
                        showNewButton,
                        newBtnRedirect,
                        submitTextLabel,
                        submitIcon,
                        notSubmit,
                        showResetBtn,
                        showCancelBtn,
                        showSubmitSpace,
                        size,
                        children
                    }) => {

    const navigate = useNavigate();

    let newButton = '';

    if (showNewButton) {
        newButton =
            <>
                <Controls.Buttons
                    color="primary"
                    type="button"
                    icon={<PlusOutlined/>}
                    onClick={() => {
                        if (newBtnRedirect)
                            navigate(`${newBtnRedirect}`);
                        else
                            navigate(`${router}/add`);
                    }}
                    title="Nouveau"
                    size={size ? size : "small"}>
                </Controls.Buttons>
                <Divider type="vertical" style={{borderColor: "#d0d0d0"}}/>
            </>

    }

    return (
        <Space size="large">
            {showCancelBtn ?
                <>
                    <Controls.Buttons
                        type="button"
                        icon={<ArrowLeftOutlined/>}
                        onClick={() => {
                            if (BackToUrl) {
                                navigate('/' + BackToUrl, {replace: true});
                            } else {
                                navigate(router, {replace: true});
                            }
                        }}
                        title="Retour"
                        size={size ? size : "small"}>
                    </Controls.Buttons>
                    <Divider type="vertical" style={{borderColor: "#d0d0d0"}}/>
                </>
                : <></>
            }

            {showSubmitSpace ?
                <>
                    <Space size="small">
                        <Controls.Buttons
                            color="primary"
                            icon={submitIcon ? submitIcon : <CheckOutlined/>}
                            type={notSubmit ? 'button' : 'submit'}
                            title={submitTextLabel ? submitTextLabel : 'Valider'}
                            size={size ? size : "small"}>
                        </Controls.Buttons>
                        {showResetBtn ?
                            <Controls.Buttons
                                type="button"
                                disabled={disabledReset}
                                icon={<CloseOutlined/>}
                                onClick={() => form.resetFields()}
                                title="Reset"
                                size={size ? size : "small"}>
                            </Controls.Buttons>
                            :
                            <></>
                        }

                        {newButton}
                    </Space>


                </>
                : <></>}

            {children}
        </Space>
    );


}


export default ButtonsBar;

ButtonsBar.defaultProps = {
    showNewButton: true,
    showSubmitSpace: true,
    showResetBtn: true
};
