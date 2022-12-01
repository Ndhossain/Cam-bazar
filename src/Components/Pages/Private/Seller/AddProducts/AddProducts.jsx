import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useState } from 'react';
import Dropzone from 'react-dropzone';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import PulseLoader from 'react-spinners/PulseLoader';
import useAuth from '../../../../../Hooks/useAuth';

const AddProducts = () => {
    const [productImage, setProductImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const {handleSubmit, register} = useForm();
    const { currentUser, logoutUser } = useAuth();
    const navigate = useNavigate();
    const {data: categories, isLoading} = useQuery({
        queryKey: ['categories'],
        queryFn: async () => {
            try {
                const res = await axios({
                    method: 'get',
                    url: `${process.env.REACT_APP_PROD_SERVER_URL}/categories`
                })
                return res;
            } catch (err) {
                console.log(err);
            }
        }
    })

    const onsubmit = async (data) => {
        if (!productImage) {
            return toast.error('Add atleast one image for your product')
        };
        try {
            setLoading(true);
            const imageRes = await axios.all(productImage.map(image => {
                const formData = new FormData();
                formData.append(`image`, image);
                return axios({
                    method: 'POST',
                    data: formData,
                    url: process.env.REACT_APP_IMAGE_HOSTING_API,
                });
            }))
            data.sellerName = currentUser.displayName;
            data.category = data.category || 'DSLR Camera';
            data.sellerEmail = currentUser.email;
            data.uid = currentUser.uid;
            data.productImage = imageRes?.map(res => res.data.data.display_url);
            data.status = 'unsold';
            data.advertise = 'false';
            const { _id } = categories.data?.find((category) => category.name === data.category)
            data.categoryId = _id;
            await axios({
                method: 'POST',
                data,
                headers: {
                    authorization: `bearer ${localStorage.getItem('cam-bazar-token')}`
                },
                url: `${process.env.REACT_APP_PROD_SERVER_URL}/products?uid=${currentUser.uid}`
            })
            toast.success('Successfully addeded');
            navigate('/dashboard/myproducts')
            setLoading(false);
        } catch (err) {
            console.log(err)
            if (err.response.status === 403 || err.response.status === 401) {
                logoutUser();
                toast.error(err.response.data.message);
            } else {
                toast.error('Something Went Wrong')
            }
            setLoading(false);
        }
    }

    return (
        <main className='w-full p-3'>
            <h1 className='font-bold text-primary text-center text-3xl'>Add a product</h1>
            <form className='mt-5' onSubmit={handleSubmit(onsubmit)}>
                <div className="relative z-0 mb-6 w-full group">
                    <input 
                        type="Name" 
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-primary peer" 
                        placeholder=" " 
                        required
                        {...register('productName')}
                    />
                    <label htmlFor="floating_email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-primary peer-focus:dark:text-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Product Name</label>
                </div>

                <div className="relative z-0 mb-6 w-full group">
                    <input 
                        type="text"
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-primary peer" 
                        placeholder=" " 
                        required
                        {...register('sellerAdress')}
                    />
                    <label htmlFor="adress" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-primary peer-focus:dark:text-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Adress</label>
                </div>

                <div className="relative z-0 mb-6 w-full group">
                    <input 
                        type="tel"
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-primary peer" 
                        placeholder=" " 
                        required
                        {...register('phoneNo')}
                    />
                    <label htmlFor="Phoneno" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-primary peer-focus:dark:text-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Phone No.</label>
                </div>

                <div className="grid md:grid-cols-3 md:gap-6">
                    <div className="relative z-0 mb-6 w-full group">
                        <input 
                            type="text"
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-primary peer" 
                            placeholder=" " 
                            required
                            {...register('productBrand')}
                        />
                        <label htmlFor="brand" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-primary peer-focus:dark:text-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Brand</label>
                    </div>
                    <div className="relative z-0 mb-6 w-full group">
                        <input 
                            type="text"
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-primary peer" 
                            placeholder=" " 
                            required
                            {...register('productModel')}
                        />
                        <label htmlFor="model" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-primary peer-focus:dark:text-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Model</label>
                    </div>

                    
                    <div className="relative z-0 mb-6 w-full group">
                        <input
                            type="number" 
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-primary peer"
                            placeholder=" " 
                            required
                            min={0}
                            {...register('usage')}
                        />
                        <label htmlFor="usage" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-primary peer-focus:dark:text-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Usage</label>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 md:gap-6">
                    <div className="relative z-0 mb-6 w-full group">
                        <input 
                            type="number"
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-primary peer"
                            placeholder=" "
                            min={1}
                            required
                            {...register('sellingPrice')}
                        />
                        <label htmlFor="price" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-primary peer-focus:dark:text-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Selling Price</label>
                    </div>
                    <div className="relative z-0 mb-6 w-full group">
                        <input 
                            type="number"
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-primary peer"
                            placeholder=" "
                            min={1}
                            required
                            {...register('newPrice')}
                        />
                        <label htmlFor="price" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-primary peer-focus:dark:text-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Brand new price</label>
                    </div>
                </div>
                <div className="grid md:grid-cols-2 md:gap-6">
                    <div className="relative z-0 mb-6 w-full group flex items-center gap-3">
                        <span className='text-sm text-gray-500'>Condition: </span>
                        <label htmlFor="condition" className="sr-only">Underline select</label>
                        <select 
                            id="condition" 
                            className="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
                            required
                            {...register('condition')}
                        >
                            <option value="Excellent">Excellent</option>
                            <option value="Good">Good</option>
                            <option value="Fair">Fair</option>
                        </select>
                    </div>
                    <div className="relative z-0 mb-6 w-full group flex items-center gap-3">
                        <span className='text-sm text-gray-500'>Category: </span>
                        <label htmlFor="category" className="sr-only">Underline select</label>
                        <select 
                            id="category" 
                            className="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
                            required
                            {...register('category')}
                        >
                            {
                                !isLoading && categories?.data?.length > 0 && categories?.data.map((category) => <option key={category._id} value={category.name}>{category.name}</option>)
                            }
                        </select>
                    </div>
                </div>
                <div className='mb-6'>
                    <textarea 
                        rows="4" 
                        className="block p-2.5 w-full text-sm text-primary border border-gray-300 focus:ring-primary focus:border-primary resize-none" 
                        placeholder="Product Description..."
                        required
                        {...register('description')}
                    />
                </div>
                    {
                        productImage && <div className='grid grid-cols-3 md:grid-cols-6 gap-2 mb-6 p-3 bg-gray-100 border border-gray-300'>
                                {
                                    productImage.map((image, id) => 
                                        <img key={id} src={image.preview} alt='product' />
                                    )
                                }
                        </div>
                    }
                <Dropzone
                    maxFiles={10}
                    accept={{'image/jpeg': ['.jpeg', '.png']}} 
                    onDrop={acceptedFiles => {
                        setProductImage(acceptedFiles.map(file => Object.assign(file, {
                            preview: URL.createObjectURL(file)
                          })))
                    }}
                >
                    {({getRootProps, getInputProps}) => (
                        <div className="flex items-center justify-center w-full mb-6">
                            <label
                                {...getRootProps()}
                                htmlFor="dropzone-file" 
                                className="flex flex-col items-center justify-center w-full h-28 border-2 border-gray-300 border-dashed cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                            >
                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x800px)</p>
                                </div>
                                <input {...getInputProps()} type="file" className="hidden" />
                            </label>
                        </div>
                    )}
                </Dropzone>
                <button
                    type="submit"
                    className="hover:text-primary border border-primary bg-primary hover:bg-white  text-white focus:outline-none font-bold text-sm w-full px-5 py-2.5 text-center"
                    disabled={loading}
                >
                    {
                        loading ? 
                            <PulseLoader 
                                color="#FF3D3D" 
                                loading={loading} 
                                size={16} 
                                aria-label="Loading Spinner" 
                                data-testid="loader" 
                            /> : 
                            'Add Product'
                    }
                </button>
            </form>
        </main>
    );
};

export default AddProducts;