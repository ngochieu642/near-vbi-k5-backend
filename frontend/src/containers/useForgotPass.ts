import {FormInstance} from 'antd'

export const useForgotPass = (form: FormInstance) => {
    const validateMessages = {
        types: {
            email: '${label} is not a valid email!',
        },
    };

    const onFinish = (values: string) => {
        console.log(values);
    };

    const onReset = () => {
        form.resetFields();
    };


    return {
        onReset,
        onFinish,
        validateMessages,
    }
}
