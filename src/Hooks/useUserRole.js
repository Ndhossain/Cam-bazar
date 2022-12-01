import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import useAuth from "./useAuth";

const useUserRole = (uid) => {
    const [isAdmin, setIsAdmin] = useState();
    const [isSeller, setIsSeller] = useState();
    const [isVerifiedSeller, setIsVerifiedSeller] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const {logoutUser, currentUser} = useAuth();
    
    useEffect(() => {
        if (uid) {
            axios({
                method: 'GET',
                headers: {
                    authorization: `bearer ${localStorage.getItem('cam-bazar-token')}`
                },
                url: `${process.env.REACT_APP_PROD_SERVER_URL}/user/role/${uid}?uid=${currentUser?.uid}`
            }).then((res) => {
                setIsAdmin(res.data?.isAdmin);
                setIsSeller(res.data?.isSeller);
                setIsVerifiedSeller(res.data?.isVerifiedSeller)
                setIsLoading(false);
            }).catch((err) => {
                if (err.response.status === 403 || err.response.status === 401) {
                    logoutUser();
                    toast.error(err.response.data.message);
                }
                setIsLoading(false);
            })
        }
    }, [currentUser?.uid, logoutUser, uid]);

    return { isAdmin, isLoading, isSeller, isVerifiedSeller }
};

export default useUserRole;