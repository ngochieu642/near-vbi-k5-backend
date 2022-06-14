import {FormInstance} from 'antd'

export const useSignUp = (form: FormInstance) => {


    const onFinish = (values: string) => {
        console.log(values);
    };

    const onReset = () => {
        form.resetFields();
    };


    return {
        onReset,
        onFinish,
    }
}
