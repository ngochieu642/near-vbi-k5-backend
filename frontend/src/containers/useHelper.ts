import {notification} from 'antd'
export const useHelper = () => {

    const openNotificationWithIcon = (type: any, message: String = "") => {
        notification[type]({
            message
        });
    };
    return {
        openNotificationWithIcon
    }
}
