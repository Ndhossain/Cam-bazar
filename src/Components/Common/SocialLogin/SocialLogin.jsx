import React from 'react';
import { FcGoogle } from 'react-icons/fc'

const SocialLogin = () => {
    return (
        <div className='flex justify-center gap-3'>
            <button>
                <FcGoogle size={40} />
            </button>
        </div>
    );
};

export default SocialLogin;