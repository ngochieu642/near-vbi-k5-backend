import axiosInstance from '~services/axiosInstance'
import {COMPANY_LOGIN_URL, USER_LOGIN_URL, USER_SIGN_UP_URL, VERIFIER_LOGIN_URL} from '~services/url'
import {useSelector} from 'react-redux'
import {RootState} from '~store/store'


export const login = async (user_info: any) => {
    const { data } = await axiosInstance.post(USER_LOGIN_URL, user_info);
    return data
}
export const user_login = async (user_info: any) => {
    const { data } = await axiosInstance.post(USER_LOGIN_URL, user_info);
    return data
}
export const verifier_login = async (user_info: any) => {
    const { data } = await axiosInstance.post(VERIFIER_LOGIN_URL, user_info);
    return data
}
export const company_login = async (user_info: any) => {
    const { data } = await axiosInstance.post(COMPANY_LOGIN_URL, user_info);
    return data
}

export const signup = async (user_info: any) => {
    const { data } = await axiosInstance.post(USER_SIGN_UP_URL, user_info);
    return data
}
