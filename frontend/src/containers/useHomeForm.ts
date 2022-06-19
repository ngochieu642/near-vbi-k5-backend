import {FormInstance, notification} from 'antd'
import {wallet} from '~utils/near'
import {useSelector} from 'react-redux'
import {RootState} from '~store/store'
import { useMutation } from 'react-query'
import {user_register} from '~services'
import {NotificationType} from '~common/enum/notification'
import {setIsLogin} from '~store/commonSlice'
import {useHelper} from '~containers/useHelper'

export const useHomeForm = (form: FormInstance) => {
    const {openNotificationWithIcon} = useHelper();
    const userId = useSelector((state: RootState) => state.common.userId)
    const {isLoading, isError, error, mutate} = useMutation(
        async (user_info) => user_register(user_info),
        {
            onSuccess: (data, variables, context) => {
                openNotificationWithIcon(NotificationType.SUCCESS, 'Register Success');
            },
            onError: (error, variables, context) => {
                // An error happened!
                console.log(error);
                openNotificationWithIcon(NotificationType.ERROR, 'Something went wrong');
            },
            onSettled: (data, error, variables, context) => {
                // Error or success... doesn't matter!
            },
        }
    )
    const sex_options = [
        {label: 'Male', value: 'male'},
        {label: 'Female', value: 'female'},
        {label: 'Other', value: 'other'}
    ];


    const isDisableSubmit = () => {
        return !wallet.isSignedIn();
    }


    const onFinish = (values: any) => {
        const user_id = userId +"";
        const payload = {
            ...values,
            userId: user_id,
            dob: new Date().toISOString(),
            faceVector: [
                [1, 2],
                [3, 4]
            ]
        }
        mutate(payload);
        console.log(payload);
    };


    const onReset = () => {
        form.resetFields();
    };

    const onFill = () => {
        form.setFieldsValue({
            name: 'Dam Quang Khoa',
            gender: 'male',
            ccid: '123456789123'
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
