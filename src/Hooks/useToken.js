import axios from "axios";
import { useEffect } from "react";
import { useState } from "react"
import useAuth from "./useAuth";
import { toast } from 'react-hot-toast';

const useToken = (uid) => {
    const [token, setToken] = useState('');
    const { logoutUser } = useAuth();
    useEffect(() => {
        if (uid) {
            axios({
                method: 'POST',
                data: { uid },
                url: `${process.env.REACT_APP_DEV_SERVER_URL}/jwt`
            }).then(res => {
                if (res.data.token) {
                    localStorage.setItem('cam-bazar-token', res.data.token);
                    setToken(res.data.token);
                }
            }).catch(err => {
                if (err.response.status === 403) {
                    logoutUser();
                    toast.error('Something went wrong!')
                }
            })
        }
    }, [logoutUser, uid])
    return token;
}

export default useToken;
