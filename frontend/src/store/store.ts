import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './counterSlice';
import {useDispatch} from 'react-redux'
import commonReducer from '~store/commonSlice'


const store = configureStore({
    reducer: {
        counter: counterReducer,
        common: commonReducer,
    },
})
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch // Export a hook that can be reused to resolve types

export default store;

