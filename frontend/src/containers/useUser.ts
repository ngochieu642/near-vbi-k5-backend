import {useState} from 'react'

export const useUser = () => {
    const [user, setUser] = useState({});

    return {
        setUser,
        user
    }
}
