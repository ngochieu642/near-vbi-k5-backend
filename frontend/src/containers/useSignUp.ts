import {FormInstance} from 'antd'
import {useMutation} from 'react-query'
import {signup} from '~services'
import {useLoginModal} from '~containers/useLoginModal'
import {useHomeForm} from '~containers/useHomeForm'
import {useHelper} from '~containers/useHelper'
import {NotificationType} from '~common/enum/notification'
import {useDispatch} from 'react-redux'
import {setIsLoginVisible} from '~store/commonSlice'

export const useSignUp = (form: FormInstance) => {

    const {setTabValue} = useLoginModal();
    const {openNotificationWithIcon} = useHelper();
    const dispatch = useDispatch();
    const {isSuccess, isLoading, isError, error, mutate} = useMutation(
        (user_info) => signup(user_info),
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
                dispatch(setIsLoginVisible(false));
            },
        }
    );

    const onFinish = async (values: any) => {
        console.log(values);
        mutate(values);
    };

    const onReset = () => {
        form.resetFields();
    };


    return {
        onReset,
        onFinish,
        isSuccess,
        isLoading,
        isError,
        error
    }
}
