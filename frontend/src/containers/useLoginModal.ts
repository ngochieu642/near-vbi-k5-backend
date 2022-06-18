import {FormInstance} from 'antd'
import {useState} from 'react'
import {useMutation} from 'react-query'
import {login} from '~services'
import { useSelector, useDispatch } from 'react-redux'
import {RootState} from '~store/store'
import {setIsLoginVisible} from '~store/commonSlice'
import {NotificationType} from '~common/enum/notification'
import {useHelper} from '~containers/useHelper'

export const useLoginModal = () => {
    const [visible, setVisible] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [modalText, setModalText] = useState('Content of the modal');
    const [tabValue, setTabValue] = useState("login");
    const {openNotificationWithIcon} = useHelper();


    const { isLoading, isError, error, mutate } = useMutation(
        (user_info) => login(user_info),
        {
            onSuccess: (data, variables, context) => {
                openNotificationWithIcon(NotificationType.SUCCESS, 'Login Success');
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
        )

    const isLoginVisible = useSelector((state: RootState) => state.common.isLoginVisible)
    const dispatch = useDispatch()


    const options = [
        { label: 'Login', value: 'login' },
        { label: 'Sign Up', value: 'signup'}
    ];

    const showModal = () => {
        dispatch(setIsLoginVisible(true));
    };

    const onFinish = (values: any) => {
        console.log('Received values of form: ', values);
        mutate(values);
    };

    const handleCancel = () => {
        console.log('Clicked cancel button');
        setVisible(false);
    };

    return {
        showModal,
        handleCancel,
        onFinish,
        setTabValue,
        setVisible,
        visible,
        confirmLoading,
        modalText,
        tabValue,
        options,
        isLoginVisible
    }
}
