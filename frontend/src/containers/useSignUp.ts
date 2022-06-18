import {FormInstance} from 'antd'
import {useMutation} from 'react-query'
import {signup} from '~services'
import {useLoginModal} from '~containers/useLoginModal'
import {useHomeForm} from '~containers/useHomeForm'
import {useHelper} from '~containers/useHelper'
import {NotificationType} from '~common/enum/notification'
import {useDispatch} from 'react-redux'
import {setIsLoginVisible, setCurrentTab} from '~store/commonSlice'
import {AUTHEN_TAB} from '~common/enum/login'

export const useSignUp = (form: FormInstance) => {

    const {setTabValue} = useLoginModal();
    const {openNotificationWithIcon} = useHelper();
    const dispatch = useDispatch();
    const {isSuccess, isLoading, isError, error, mutate} = useMutation(
        (user_info) => signup(user_info),
        {
            onSuccess: (data, variables, context) => {
                dispatch(setCurrentTab(AUTHEN_TAB.Login));
                openNotificationWithIcon(NotificationType.SUCCESS, 'Register Success');
            },
            onError: (error, variables, context) => {
                // An error happened!
                console.log(error);
                openNotificationWithIcon(NotificationType.ERROR, 'Something went wrong');
                dispatch(setIsLoginVisible(false));
            },
            onSettled: (data, error, variables, context) => {
                // Error or success... doesn't matter!
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
