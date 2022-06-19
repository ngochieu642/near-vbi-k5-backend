import {Button, Checkbox, Form, Input, Modal, Select} from 'antd';
import React, {useState} from 'react';
import {useLoginModal} from '~containers/useLoginModal'
import {UserOutlined, LockOutlined} from '@ant-design/icons'
import {ROLE} from '~common/enum/login'
import { Radio } from 'antd';


const LoginForm = () => {
    const [form] = Form.useForm();

    const {
        onFinish,
        handleRoleChange,
        roleOptions
    } = useLoginModal();
    return (
        <>
            <Form
                name="normal_login"
                className="login-form"
                initialValues={{role: ROLE.Customer}}
                onFinish={onFinish}
                form={form}
            >
                <Form.Item name="role" rules={[{required: true}]}>
                    <Radio.Group
                        options={roleOptions}
                        onChange={handleRoleChange}
                    >
                    </Radio.Group>
                </Form.Item>
                <Form.Item
                    name="username"
                    rules={[
                        {
                            required: true,
                        },
                    ]}>
                    <Input prefix={<UserOutlined className="site-form-item-icon"/>} placeholder="Username"/>
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[{required: true, message: 'Please input your Password!'}]}
                >
                    <Input
                        prefix={<LockOutlined className="site-form-item-icon"/>}
                        type="password"
                        placeholder="Password"
                    />
                </Form.Item>
                <Form.Item>
                    <Form.Item name="remember" valuePropName="checked" noStyle>
                        <Checkbox>Remember me</Checkbox>
                    </Form.Item>

                    <a className="float-right" href="">
                        Forgot password
                    </a>
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" className="mr-3">
                        Log in
                    </Button>
                    Or <a href="">register now!</a>
                </Form.Item>
            </Form>
        </>
    );
};
export default LoginForm;

