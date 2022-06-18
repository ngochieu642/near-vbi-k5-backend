import { createSlice } from '@reduxjs/toolkit'

export const commonSlice = createSlice({
    name: 'common',
    initialState: {
        isLoginVisible: false,
    },
    reducers: {
        setIsLoginVisible: (state, action) => {
            state.isLoginVisible = action.payload
        },
    },
})

// Action creators are generated for each case reducer function
export const { setIsLoginVisible } = commonSlice.actions;

const commonReducer = commonSlice.reducer;


export default commonReducer;
