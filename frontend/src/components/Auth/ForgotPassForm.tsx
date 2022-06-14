import {Button, Checkbox, Form, Input, Modal} from 'antd';
import React, {useState} from 'react';
import {useLoginModal} from '~containers/useLoginModal'
import {useForgotPass} from '~containers/useForgotPass'
import {useLayout} from '~containers/useLayout'

const ForgotPassForm = () => {
    const [form] = Form.useForm();
    const {
        onFinish
    } = useForgotPass(form);

    const {
        layout_8_16,
        tailFormItemLayout
    } = useLayout();

    return (
        <>
            <Form
                name="normal_login"
                onFinish={onFinish}
                form={form}
                {...layout_8_16}
            >
                <Form.Item
                    name={['user', 'email']}
                    label="Email"
                    rules={[
                        {
                            type: 'email',
                            message: 'The input is not valid E-mail!',
                        },
                        {
                            required: true,
                            message: 'Please input your E-mail!',
                        },
                    ]}
                >
                    <Input/>
                </Form.Item>
                <Form.Item {...tailFormItemLayout}>
                    <Button type="primary" htmlType="submit" className="mr-3">
                        Resend To Email
                    </Button>
                </Form.Item>
            </Form>
        </>
    );
};
export default ForgotPassForm;

