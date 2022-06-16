import {FormInstance} from 'antd'
import {useMutation} from 'react-query'
import {signup} from '~services'

export const useSignUp = (form: FormInstance) => {

    const {isLoading, isError, error, mutate} = useMutation((user_info) => signup(user_info))

    const onFinish = (values: any) => {
        console.log(values);
        mutate(values);
    };

    const onReset = () => {
        form.resetFields();
    };


    return {
        onReset,
        onFinish,
    }
}
