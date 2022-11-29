import React from 'react';
import { useForm } from 'react-hook-form';
import PulseLoader from 'react-spinners/PulseLoader';

const BookingModal = ({modal, setModal, productName, currentUser, loading, price, onsubmit}) => {
    const {register, handleSubmit} = useForm({defaultValues: {
        buyerEmail: currentUser.email,
        productName: productName,
        productPrice: price,
        buyerPhoneNo: '',
        meetAdress: '',
    }});

    return (
        <div id="authentication-modal" tabIndex="-1" aria-hidden="true" className={`${!modal ? 'hidden' : ''} overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 p-4 w-full md:inset-0 h-modal md:h-full flex justify-center items-center bg-primary/60`}>
            <div className="relative w-full max-w-md h-full md:h-auto">
                <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    <button 
                        type="button" 
                        className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white" 
                        data-modal-toggle="authentication-modal"
                        onClick={() => setModal(false)}
                    >
                        <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                        <span className="sr-only">Close modal</span>
                    </button>
                    <div className="py-6 px-6 lg:px-8">
                        <h3 className="mb-4 text-xl font-bold text-secondary">Booking Informations</h3>
                        <form className="space-y-6" onSubmit={handleSubmit(onsubmit)}>
                            <div className="relative z-0 mb-6 w-full group">
                                <input 
                                    type="email"
                                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-primary focus:outline-none focus:ring-0 focus:border-primary peer" 
                                    placeholder=" " 
                                    required
                                    disabled
                                    {...register('buyerEmail')}
                                />
                                <label 
                                    htmlFor="floating_email" 
                                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-primary peer-focus:dark:text-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                                >User Email</label>
                            </div>
                            <div className="relative z-0 mb-6 w-full group">
                                <input 
                                    type="text" 
                                    name="repeat_password" id="floating_repeat_password" 
                                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-primary focus:outline-none focus:ring-0 focus:border-primary peer" 
                                    placeholder=" " 
                                    required
                                    disabled
                                    {...register('productName')}
                                />
                                <label 
                                    htmlFor="floating_password" 
                                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-primary peer-focus:dark:text-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                                >Product Name</label>
                            </div>
                            <div className="relative z-0 mb-6 w-full group">
                                <input 
                                    type="text" 
                                    name="repeat_password" id="floating_repeat_password" 
                                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-primary focus:outline-none focus:ring-0 focus:border-primary peer" 
                                    placeholder=" " 
                                    required
                                    disabled
                                    {...register('productPrice')}
                                />
                                <label 
                                    htmlFor="floating_password" 
                                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-primary peer-focus:dark:text-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                                >Product Price</label>
                            </div>
                            <div className="relative z-0 mb-6 w-full group">
                                <input 
                                    type="text" 
                                    name="repeat_password" id="floating_repeat_password" 
                                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-primary focus:outline-none focus:ring-0 focus:border-primary peer" 
                                    placeholder=" " 
                                    required
                                    {...register('buyerPhoneNo')}
                                />
                                <label 
                                    htmlFor="floating_password" 
                                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-primary peer-focus:dark:text-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                                >User Phone No</label>
                            </div>
                            <div className="relative z-0 mb-6 w-full group">
                                <input 
                                    type="text" 
                                    name="repeat_password" id="floating_repeat_password" 
                                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-primary focus:outline-none focus:ring-0 focus:border-primary peer" 
                                    placeholder=" " 
                                    required
                                    {...register('meetAdress')}
                                />
                                <label 
                                    htmlFor="floating_password" 
                                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-primary peer-focus:dark:text-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                                >Meeting Adress</label>
                            </div>
                            <div>
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
                                            'Confirm Booking'
                                    }
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div> 
    );
};

export default BookingModal;