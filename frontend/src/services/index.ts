import axiosInstance from '~services/axiosInstance'
import {USER_LOGIN_URL, USER_SIGN_UP_URL} from '~services/url'


export const login = async (user_info: any) => {
    const { data } = await axiosInstance.post(USER_LOGIN_URL, user_info);
    return data
}

export const signup = async (user_info: any) => {
    const { data } = await axiosInstance.post(USER_SIGN_UP_URL, user_info);
    return data
}
