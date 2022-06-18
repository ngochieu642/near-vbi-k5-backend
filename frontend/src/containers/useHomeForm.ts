import {FormInstance, notification} from 'antd'
import {wallet} from '~utils/near'

export const useHomeForm = (form: FormInstance) => {
    const sex_options = [
        {label: 'Male', value: 'male'},
        {label: 'Female', value: 'female'},
        {label: 'Other', value: 'other'}
    ];


    const isDisableSubmit = () => {
        return !wallet.isSignedIn();
    }


    const onFinish = (values: string) => {
        console.log(values);
    };


    const onReset = () => {
        form.resetFields();
    };

    const onFill = () => {
        form.setFieldsValue({
            note: 'Hello world!',
            gender: 'male',
        });
    };


    return {
        onFill,
        onReset,
        onFinish,
        sex_options,
        isDisableSubmit,
    }
}
