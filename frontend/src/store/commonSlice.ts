import { createSlice } from '@reduxjs/toolkit'
import {AUTHEN_TAB, ROLE} from '~common/enum/login'

export const commonSlice = createSlice({
    name: 'common',
    initialState: {
        isLogin: false,
        isLoginVisible: false,
        currentTab: AUTHEN_TAB.Login,
        role: ROLE.Customer
    },
    reducers: {
        setIsLoginVisible: (state, action) => {
            state.isLoginVisible = action.payload
        },
        setIsLogin: (state, action) => {
            state.isLogin = action.payload
        },
        setCurrentTab: (state, action) => {
            state.currentTab = action.payload
        },
        setRole: (state, action) => {
            state.role = action.payload
        },
    },
})

// Action creators are generated for each case reducer function
export const { setIsLoginVisible, setCurrentTab, setRole, setIsLogin} = commonSlice.actions;

const commonReducer = commonSlice.reducer;


export default commonReducer;
