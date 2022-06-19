import {FormInstance} from 'antd'
import {useMutation} from 'react-query'
import {signup, verifier_signup} from '~services'
import {useLoginModal} from '~containers/useLoginModal'
import {useHomeForm} from '~containers/useHomeForm'
import {useHelper} from '~containers/useHelper'
import {NotificationType} from '~common/enum/notification'
import {useDispatch, useSelector} from 'react-redux'
import {setIsLoginVisible, setCurrentTab} from '~store/commonSlice'
import {AUTHEN_TAB, ROLE} from '~common/enum/login'
import {RootState} from '~store/store'

export const useSignUp = (form: FormInstance) => {

    const {setTabValue} = useLoginModal();
    const {openNotificationWithIcon} = useHelper();
    const dispatch = useDispatch();
    const role = useSelector((state: RootState) => state.common.role)

    const {isSuccess, isLoading, isError, error, mutate} = useMutation(
        async (user_info) => {
            switch (role) {
                case ROLE.Customer:
                    return await signup(user_info);
                case ROLE.Verifier:
                    return await verifier_signup(user_info);
            }
            return;
        },
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
