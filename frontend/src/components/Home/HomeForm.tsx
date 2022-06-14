import {Button, DatePicker, Form, Input, InputNumber, Select} from 'antd';
import React from 'react';
import {useHomeForm} from '~containers/useHomeForm'
import {useLayout} from '~containers/useLayout'



const HomeForm: React.FC = () => {
    const [form] = Form.useForm();
    const {tailFormItemLayout, layout_8_16} = useLayout();
    const {
        onFinish,
        onReset,
        onFill,
        sex_options,
        phone_options
    } = useHomeForm(form);

    const prefixSelector = (
        <Form.Item name="prefix" noStyle>
            <Select options={phone_options} style={{ width: 70 }}/>
        </Form.Item>
    );

    return (
        <Form {...layout_8_16} form={form} name="control-hooks" onFinish={onFinish}>
            <Form.Item name={['user', 'name']} label="Name" rules={[{required: true}]}>
                <Input/>
            </Form.Item>
            <Form.Item name={['user', 'gender']} label="Gender" rules={[{required: true}]}>
                <Select
                    placeholder="Select a option and change input text above"
                    allowClear
                    options={sex_options}
                >
                </Select>
            </Form.Item>
            <Form.Item name={['user', 'email']} label="Email" rules={[{required: true, type: 'email'}]}>
                <Input/>
            </Form.Item>
            <Form.Item name={['user', 'dob']} label="DatePicker" rules={[{required: true}]}>
                <DatePicker/>
            </Form.Item>
            <Form.Item
                name="phone"
                label="Phone Number"
                rules={[{ required: true, message: 'Please input your phone number!' }]}
            >
                <Input addonBefore={prefixSelector} style={{ width: '100%' }} />
            </Form.Item>
            <Form.Item name={['user', 'website']} label="Website">
                <Input/>
            </Form.Item>
            <Form.Item name={['user', 'introduction']} label="Introduction">
                <Input.TextArea/>
            </Form.Item>
            <Form.Item {...tailFormItemLayout}>
                <Button htmlType="button" onClick={onReset}>
                    Reset
                </Button>
                <Button className="ml-3" type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
    );
};

export default HomeForm;
