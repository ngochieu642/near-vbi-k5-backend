import {FormInstance} from 'antd'

export const useHomeForm = (form: FormInstance) => {
    const sex_options = [
        {label: 'Male', value: 'male'},
        {label: 'Female', value: 'female'},
        {label: 'Other', value: 'other'}
    ];

    const phone_options = [
        {label: '+86', value: '86'},
        {label: '+87', value: '87'},
    ];


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


    const onGenderChange = (value: string) => {
        switch (value) {
            case 'male':
                form.setFieldsValue({
                    note: 'Hi, man!',
                });
                return;

            case 'female':
                form.setFieldsValue({
                    note: 'Hi, lady!',
                });
                return;

            case 'other':
                form.setFieldsValue({
                    note: 'Hi there!',
                });
        }
    };


    return {
        onFill,
        onReset,
        onFinish,
        onGenderChange,
        sex_options,
        phone_options
    }
}
