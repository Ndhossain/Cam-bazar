import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from 'react-hot-toast';
import useAuth from "./useAuth";

const useToken = (uid) => {
    const [token, setToken] = useState('');
    const { logoutUser } = useAuth();
    useEffect(() => {
        if (uid) {
            axios({
                method: 'POST',
                data: { uid },
                url: `${process.env.REACT_APP_PROD_SERVER_URL}/jwt`
            }).then(res => {
                if (res.data.token) {
                    localStorage.setItem('cam-bazar-token', res.data.token);
                    setToken(res.data.token);
                }
            }).catch(err => {
                if (err.response.status === 403) {
                    logoutUser();
                    toast.error(err.response.data.message)
                }
            })
        }
    }, [logoutUser, uid])
    return token;
}

export default useToken;
