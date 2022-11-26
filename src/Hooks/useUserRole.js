import axios from "axios";
import { useEffect } from "react";
import { useState } from "react"
import toast from "react-hot-toast";
import useAuth from "./useAuth";

const useUserRole = (uid) => {
    const [isAdmin, setIsAdmin] = useState();
    const [isSeller, setIsSeller] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const {logoutUser} = useAuth();
    
    useEffect(() => {
        if (uid) {
            axios({
                method: 'GET',
                headers: {
                    authorization: `bearer ${localStorage.getItem('cam-bazar-token')}`
                },
                url: `${process.env.REACT_APP_DEV_SERVER_URL}/users?uid=${uid}`
            }).then((res) => {
                setIsAdmin(res.data.isAdmin);
                setIsSeller(res.data.isSeller);
                setIsLoading(false);
            }).catch((err) => {
                if (err.response.status === 403 || err.response.status === 401) {
                    logoutUser();
                    toast.error(err.response.data.message);
                }
                setIsLoading(false);
            })
        }
    }, [logoutUser, uid]);

    return { isAdmin, isLoading, isSeller }
};

export default useUserRole;