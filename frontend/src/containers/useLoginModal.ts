import {useMutation} from 'react-query'
import {company_login, user_login, verifier_login} from '~services'
import {useSelector, useDispatch} from 'react-redux'
import {RootState} from '~store/store'
import {setCurrentTab, setIsLogin, setIsLoginVisible, setRole} from '~store/commonSlice'
import {NotificationType} from '~common/enum/notification'
import {useHelper} from '~containers/useHelper'
import {AUTHEN_TAB, ROLE} from '~common/enum/login'
import {useState} from 'react'
import {RadioChangeEvent} from 'antd'

export const useLoginModal = () => {
    const [visible, setVisible] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [modalText, setModalText] = useState('Content of the modal');
    const {openNotificationWithIcon} = useHelper();
    const isLoginVisible = useSelector((state: RootState) => state.common.isLoginVisible)
    const currentTab = useSelector((state: RootState) => state.common.currentTab)
    const role = useSelector((state: RootState) => state.common.role)
    const dispatch = useDispatch()
    const options = [
        {label: 'Login', value: AUTHEN_TAB.Login},
        {label: 'Sign Up', value: AUTHEN_TAB.SignUp}
    ];

    const roleOptions = [
        {label: 'Customer', value: ROLE.Customer},
        {label: 'Verifier', value: ROLE.Verifier},
        {label: 'Company', value: ROLE.Company}
    ];

    const {isLoading, isError, error, mutate} = useMutation(
        async (user_info) => {
            switch (role) {
                case ROLE.Customer:
                    await user_login(user_info);
                    break;
                case ROLE.Verifier:
                    await verifier_login(user_info);
                    break;
                case ROLE.Company:
                    await company_login(user_info);
                    break;
            }
            return;
        },
        {
            onSuccess: (data, variables, context) => {
                dispatch(setIsLogin(true));
                openNotificationWithIcon(NotificationType.SUCCESS, 'Login Success');
            },
            onError: (error, variables, context) => {
                // An error happened!
                console.log(error);
                dispatch(setIsLogin(false));
                openNotificationWithIcon(NotificationType.ERROR, 'Something went wrong');
            },
            onSettled: (data, error, variables, context) => {
                // Error or success... doesn't matter!
                dispatch(setIsLoginVisible(false));
            },
        }
    )

    const showModal = () => {
        dispatch(setIsLoginVisible(true));
    };

    const onFinish = (values: any) => {
        console.log('Received values of form: ', values);
        mutate(values);
    };

    const handleCancel = () => {
        console.log('Clicked cancel button');
        dispatch(setIsLoginVisible(false));
    };

    const handleRoleChange = (role: RadioChangeEvent) => {
        dispatch(setRole(role.target.value));
    };

    const setTabValue = (tab: string) => {
        dispatch(setCurrentTab(tab));
    }

    return {
        showModal,
        handleCancel,
        onFinish,
        setTabValue,
        setVisible,
        handleRoleChange,
        visible,
        confirmLoading,
        modalText,
        options,
        isLoginVisible,
        currentTab,
        roleOptions,
        role
    }
}
