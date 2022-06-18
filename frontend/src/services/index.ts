import axiosInstance from '~services/axiosInstance'
import {COMPANY_LOGIN_URL, USER_LOGIN_URL, USER_SIGN_UP_URL, VERIFIER_LOGIN_URL} from '~services/url'


export const login = async (user_info: any) => {
    return await axiosInstance.post(USER_LOGIN_URL, user_info)
}
export const user_login = async (user_info: any) => {
    return await axiosInstance.post(USER_LOGIN_URL, user_info)
}
export const verifier_login = async (user_info: any) => {
    return await axiosInstance.post(VERIFIER_LOGIN_URL, user_info)
}
export const company_login = async (user_info: any) => {
    return await axiosInstance.post(COMPANY_LOGIN_URL, user_info)
}

export const signup = async (user_info: any) => {
    return await axiosInstance.post(USER_SIGN_UP_URL, user_info)
}
