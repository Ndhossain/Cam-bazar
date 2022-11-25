import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import PulseLoader from 'react-spinners/PulseLoader';
import useAuth from '../../../../Hooks/useAuth';
import useToken from '../../../../Hooks/useToken';
import SocialLogin from '../../../Common/SocialLogin/SocialLogin';

const Login = () => {
    const {register, handleSubmit,  formState: { errors }} = useForm();
    const [currentUserUid, setCurrentUserUid] = useState('');
    const {loginUser, loading, setLoading} = useAuth();
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const token = useToken(currentUserUid);
    
    useEffect(() => {
        if (token) {
            toast.success('Successfully logged in');
            navigate('/');
        }
    }, [navigate, token])

    const onsubmit = async (data) => {
        try {
            setError('');
            const res = await loginUser(data.email, data.password)
            setCurrentUserUid(res.user.uid);
        } catch (err) {
            if (err.message.includes('wrong-password')) {
                setError('Email adress or password is not matching.');
            } else {
                setError('Something went wrong!');
            }
            toast.error('Something went wrong!');
            setLoading(false);
        }
    }

    return (
        <main className='max-w-[1480px] mx-auto px-3'>
            <form className='sm:w-1/2 mx-auto p-5 mt-5 sm:mt-10 shadow-2xl' onSubmit={handleSubmit(onsubmit)}>
                <h1 className='mb-5 font-black text-primary text-3xl text-center'>Log In</h1>
                {error && <p className='text-danger text-sm mb-5' role="alert">{error}</p>}
                <div className="relative z-0 mb-6 w-full group">
                    <input 
                        type="email"
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-primary focus:outline-none focus:ring-0 focus:border-primary peer" 
                        placeholder=" " 
                        required 
                        {...register('email')}
                    />
                    <label 
                        htmlFor="floating_email" 
                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-primary peer-focus:dark:text-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >Email address</label>
                    {errors.email && <p className='text-danger text-sm' role="alert">{errors.email?.message}</p>}
                </div>
                <div className="relative z-0 mb-6 w-full group">
                    <input 
                        type="password" 
                        name="repeat_password" id="floating_repeat_password" 
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-primary focus:outline-none focus:ring-0 focus:border-primary peer" 
                        placeholder=" " 
                        required 
                        {...register('password')}
                    />
                    <label 
                        htmlFor="floating_password" 
                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-primary peer-focus:dark:text-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >Password</label>
                    {errors.password && <p className='text-danger text-sm' role="alert">{errors.password?.message}</p>}
                </div>
                <p className='text-sm mb-5'>Don't have an account? <Link className='underline' to='/register'>Register</Link> now.</p>
                <div>
                    <button
                        type="submit" 
                        className="text-primary border border-primary hover:bg-primary hover:text-white focus:outline-none text-sm w-full px-5 py-2.5 text-center font-bold"
                        disabled={loading}
                    >
                        {
                            loading ? 
                                <PulseLoader
                                    color="#222" 
                                    loading={loading} 
                                    size={16} 
                                    aria-label="Loading Spinner" 
                                    data-testid="loader" 
                                /> : 
                                'Log In'
                        }
                    </button>
                </div>
                <div className="inline-flex justify-center items-center w-full">
                    <hr className="my-8 h-px bg-primary border-0 w-full" />
                    <span className="absolute left-1/2 px-3 font-medium text-gray-900 bg-white -translate-x-1/2 dark:text-white dark:bg-gray-900">
                        Or
                    </span>
                </div>
                <SocialLogin setError={setError} />
            </form>
        </main>
    );
};

export default Login;