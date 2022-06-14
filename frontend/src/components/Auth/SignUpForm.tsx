import {Button, Checkbox, DatePicker, Form, Input, Modal, Select} from 'antd';
import React, {useState} from 'react';
import {useSignUp} from '~containers/useSignUp';
import {useValidateMessages} from '~containers/useValidateMessages'
import {useLayout} from '~containers/useLayout'

const SignUpForm = () => {
    const [form] = Form.useForm();
    const {
        onFinish,
        onReset,
    } = useSignUp(form);

    const {
        validateMessages
    } = useValidateMessages();

    const {
        formItemLayout,
        tailFormItemLayout
    } = useLayout();

    return (
        <>
            <Form {...formItemLayout} form={form} name="control-hooks" onFinish={onFinish}
                  validateMessages={validateMessages}>
                <Form.Item name={['user', 'name']} label="Name" rules={[{required: true}]}>
                    <Input/>
                </Form.Item>
                <Form.Item
                    name={['user', 'email']}
                    label="Email"
                    rules={[
                        {
                            type: 'email',
                        },
                        {
                            required: true,
                        },
                    ]}>
                    <Input/>
                </Form.Item>
                <Form.Item
                    name={['user', 'password']}
                    label="Password"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your password!',
                        },
                    ]}
                    hasFeedback
                >
                    <Input.Password/>
                </Form.Item>
                <Form.Item
                    name="confirm"
                    label="Confirm Password"
                    dependencies={['password']}
                    hasFeedback
                    rules={[
                        {
                            required: true,
                            message: 'Please confirm your password!',
                        },
                        ({getFieldValue}) => ({
                            validator(_, value) {
                                if (!value || getFieldValue(['user', 'password']) === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error('The two passwords that you entered do not match!'));
                            },
                        }),
                    ]}
                >
                    <Input.Password/>
                </Form.Item>
                <Form.Item
                    name="agreement"
                    valuePropName="checked"
                    rules={[
                        {
                            validator: (_, value) =>
                                value ? Promise.resolve() : Promise.reject(new Error('Should accept agreement')),
                        },
                    ]}
                    {...tailFormItemLayout}
                >
                    <Checkbox>
                        I have read the <a href="">agreement</a>
                    </Checkbox>
                </Form.Item>
                <Form.Item {...tailFormItemLayout}>
                    <Button htmlType="button" onClick={onReset}>
                        Reset
                    </Button>
                    <Button className="ml-2" type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </>
    );
};
export default SignUpForm;

