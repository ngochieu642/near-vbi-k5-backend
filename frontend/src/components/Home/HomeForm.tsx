import {Button, DatePicker, Form, Input, InputNumber, Radio, Select} from 'antd';
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
        isDisableSubmit
    } = useHomeForm(form);

    return (
        <Form {...layout_8_16} form={form} name="control-hooks" onFinish={onFinish}>
            <Form.Item name={'name'} label="Name" rules={[{required: true}]}>
                <Input/>
            </Form.Item>
            <Form.Item name={'gender'} label="Gender" rules={[{required: true}]}>
                <Radio.Group
                    options={sex_options}
                >
                </Radio.Group>
            </Form.Item>
            <Form.Item name={'dob'} label="Birthday" rules={[{required: true}]}>
                <DatePicker/>
            </Form.Item>
            <Form.Item name={'ccid'} label="CCID">
                <Input/>
            </Form.Item>
            <Form.Item {...tailFormItemLayout}>
                <Button htmlType="button" onClick={onReset}>
                    Reset
                </Button>
                <Button className="ml-3 mr-3" disabled={isDisableSubmit()} type="primary" htmlType="submit">
                    Submit
                </Button>
                <Button htmlType="button" onClick={onFill}>
                    Fill
                </Button>
            </Form.Item>
        </Form>
    );
};

export default HomeForm;
