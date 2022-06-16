import {FormInstance} from 'antd'
import {useState} from 'react'
import {useMutation} from 'react-query'
import {login} from '~services'

export const useLoginModal = () => {
    const [visible, setVisible] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [modalText, setModalText] = useState('Content of the modal');
    const [tabValue, setTabValue] = useState("login");
    const { isLoading, isError, error, mutate } = useMutation((user_info) => login(user_info))

    const options = [
        { label: 'Login', value: 'login' },
        { label: 'Sign Up', value: 'signup' }
    ];

    const showModal = () => {
        setVisible(true);
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
        visible,
        confirmLoading,
        modalText,
        tabValue,
        options
    }
}
