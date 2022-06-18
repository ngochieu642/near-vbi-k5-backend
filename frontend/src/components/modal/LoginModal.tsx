import {Button, Checkbox, Form, Input, Modal, Radio, Tabs} from 'antd';
import React, {useState} from 'react';
import {useLoginModal} from '~containers/useLoginModal'
import LoginForm from '~components/Auth/LoginForm'
import SignUpForm from '~components/Auth/SignUpForm'
import {AUTHEN_TAB} from '~common/enum/login'
import TestForm from '~components/Auth/TestForm'

const LoginModal = () => {
    const {
        showModal,
        handleCancel,
        setTabValue,
        visible,
        confirmLoading,
        currentTab,
        options,
        isLoginVisible,
        role,
    } = useLoginModal();

    const {TabPane} = Tabs;

    return (
        <>
            <Button onClick={() => showModal()}
                    className={"flex justify-center items-center ant-button-hover-white"}
                    shape="round">
                <div className={"flex justify-center items-center"}>
                    <span className={"mr-3 ml-2"}>
                        Login
                    </span>
                </div>
            </Button>
            <Modal
                title="Authentication"
                visible={isLoginVisible}
                confirmLoading={confirmLoading}
                onCancel={handleCancel}
                footer={null}
            >
                <div className={"bg-black bg-opacity-20 rounded-xl p-1 mb-5"}>
                    <Radio.Group
                        className={"radio-stake"}
                        options={options}
                        onChange={(e) => {
                            setTabValue(e.target.value)
                        }}
                        value={currentTab}
                        optionType="button"
                    />

                </div>
                <Tabs activeKey={currentTab} className="staking-tabs">
                    <TabPane key={AUTHEN_TAB.Login}>
                        <LoginForm/>
                    </TabPane>
                    <TabPane key={AUTHEN_TAB.SignUp}>
                        <SignUpForm/>
                    </TabPane>
                </Tabs>
            </Modal>
        </>
    );
};
export default LoginModal;
