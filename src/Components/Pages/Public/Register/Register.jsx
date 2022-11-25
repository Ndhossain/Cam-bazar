import React, { useState } from 'react';
import Dropzone from 'react-dropzone';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import useAuth from '../../../../Hooks/useAuth';
import useToken from '../../../../Hooks/useToken';
import SocialLogin from '../../../Common/SocialLogin/SocialLogin';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom'

const Register = () => {
    const [userImage, setUserImage] = useState(null);
    const [imageError, setImageError] = useState(null);
    const [error, setError] = useState('');
    const [currentUserUid, setCurrentUserUid] = useState('');
    const {register, handleSubmit,  formState: { errors }} = useForm();
    const {registerUser} = useAuth();
    const token = useToken(currentUserUid);
    const navigate = useNavigate();
    
    useEffect(() => {
        if (token) {
            toast.success('Successfully registered');
            navigate('/');
        }
    }, [navigate, token])

    const onsubmit = async (data) => {
        if (!userImage) {
            return setImageError('Can not keep this field empty')
        };
        try {
            const formdata = new FormData();
            formdata.append('image', userImage[0]);
            const res = await axios({
                method: 'POST',
                url: process.env.REACT_APP_IMAGE_HOSTING_API,
                data: formdata,
            });
            const userRegisterRes = await registerUser(data.email, data.password, data.name, res.data.data.display_url);
            await axios({
                method: 'POST',
                data: {
                    name: userRegisterRes.user.displayName,
                    email: userRegisterRes.user.email,
                    role: data.accountType,
                    uid: userRegisterRes.user.uid,
                    image: userRegisterRes.user.photoURL,
                },
                url: `${process.env.REACT_APP_DEV_SERVER_URL}/user`
            });
            setCurrentUserUid(userRegisterRes.user.uid);
        } catch (err) {
            setError(err.message);
        }
    }
    return (
        <main className='max-w-[1480px] mx-auto px-3'>
            <form className='sm:w-1/2 mx-auto p-5 mt-5 sm:mt-10 shadow-2xl' onSubmit={handleSubmit(onsubmit)}>
                <h1 className='mb-5 font-black text-primary text-3xl text-center'>Register</h1>
                {error && <p className='text-danger text-sm mb-5' role="alert">{error}</p>}
                <div className="relative z-0 mb-6 w-full group">
                    <input 
                        type="text"
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-primary focus:outline-none focus:ring-0 focus:border-primary peer" 
                        placeholder=" " 
                        required 
                        {...register('name')}
                    />
                    <label 
                    htmlFor="floating_name" 
                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-primary peer-focus:dark:text-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >Full name</label>
                    {errors.name && <p className='text-danger text-sm' role="alert">{errors.name?.message}</p>}
                </div>
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
                <div className="relative z-0 mb-6 w-full group">
                    <label htmlFor="underline_select" className="sr-only">Underline select</label>
                    <select 
                        className="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
                        {...register('accountType')}
                        required
                    >
                        <option value="buyer">Buyer</option>
                        <option value="seller">Seller</option>
                    </select>
                    {errors.confirmPassword && <p className='text-danger text-sm' role="alert">{errors.confirmPassword?.message}</p>}
                </div>
                <div className='mb-6'>
                    {
                        userImage && <img className='h-[200px] w-[200px] mx-auto' src={userImage[0].preview} alt="user" />
                    }
                </div>
                <Dropzone
                    maxFiles={1}
                    accept={{'image/jpeg': ['.jpeg', '.png']}} 
                    onDrop={acceptedFiles => {
                        console.log(acceptedFiles[0]);
                        setUserImage(acceptedFiles.map(file => Object.assign(file, {
                            preview: URL.createObjectURL(file)
                          })))
                    }}
                >
                    {({getRootProps, getInputProps}) => (
                        <div className="flex items-center justify-center w-full mb-6">
                            <label
                                {...getRootProps()}
                                htmlFor="dropzone-file" 
                                className="flex flex-col items-center justify-center w-full h-20 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                            >
                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                                </div>
                                <input {...getInputProps()} type="file" className="hidden" />
                            </label>
                        </div>
                    )}
                </Dropzone>
                {imageError && <p className='text-danger text-sm mb-6' role="alert">{imageError}</p>}
                <p className='text-sm mb-5'>Already have an account? <Link className='underline' to='/login'>Login</Link> now.</p>
                <div>
                    <button type="submit" className="text-primary border border-primary hover:bg-primary hover:text-white focus:outline-none font-medium text-sm w-full px-5 py-2.5 text-center">REGISTER</button>
                </div>
                <div className="inline-flex justify-center items-center w-full">
                    <hr className="my-8 h-px bg-primary border-0 w-full" />
                    <span className="absolute left-1/2 px-3 font-medium text-gray-900 bg-white -translate-x-1/2 dark:text-white dark:bg-gray-900">
                        Or
                    </span>
                </div>
                <SocialLogin />
            </form>
        </main>
    );
};

export default Register;