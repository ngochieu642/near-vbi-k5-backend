import {FormInstance} from 'antd'
import {useState} from 'react'

export const useLoginModal = () => {
    const [visible, setVisible] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [modalText, setModalText] = useState('Content of the modal');

    const showModal = () => {
        setVisible(true);
    };

    const onFinish = (values: any) => {
        console.log('Received values of form: ', values);
    };

    const handleCancel = () => {
        console.log('Clicked cancel button');
        setVisible(false);
    };

    return {
        showModal,
        handleCancel,
        onFinish,
        visible,
        confirmLoading,
        modalText
    }
}
