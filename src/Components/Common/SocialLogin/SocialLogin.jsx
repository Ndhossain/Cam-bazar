import axios from 'axios';
import { GoogleAuthProvider } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { FcGoogle } from 'react-icons/fc';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../../Hooks/useAuth';
import useToken from '../../../Hooks/useToken';

const SocialLogin = ({ setError, from }) => {
    const googleProvider = new GoogleAuthProvider();
    const {providerLogin, loading, setLoading} = useAuth();
    const [currentUserUid, setCurrentUserUid] = useState('');
    const navigate = useNavigate();
    const token = useToken(currentUserUid);
    
    useEffect(() => {
        if (token) {
            toast.success('Successfully logged in');
            navigate(from, {replace: true});
        }
    }, [from, navigate, token])

    const googleLogin = async () => {
        try {
            setError(null);
            const res = await providerLogin(googleProvider);
            await axios({
                method: 'POST',
                data: {
                    name: res.user.displayName,
                    email: res.user.email,
                    role: 'buyer',
                    uid: res.user.uid,
                    image: res.user.photoURL,
                },
                url: `${process.env.REACT_APP_PROD_SERVER_URL}/user`
            });
            setCurrentUserUid(res.user.uid);
        } catch (err) {
            setError(err.message);
            toast.error('Something went wrong!');
            setLoading(false);
        }
    };

    return (
        <div className='flex justify-center gap-3'>
            <button
                type='button'
                onClick={() => googleLogin()}
                disabled={loading}
            >
                <FcGoogle size={40} />
            </button>
        </div>
    );
};

export default SocialLogin;