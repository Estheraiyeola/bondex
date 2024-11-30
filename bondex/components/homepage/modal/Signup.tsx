'use client'
import React from 'react';
import {SignUpModalProps} from "@/types/Types";
import GoogleIcon from '@mui/icons-material/Google';

const SignUpModal: React.FC<SignUpModalProps> = ({ onClose }) => {
    // const [email, setEmail] = useState('');
    //
    // const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    //     setEmail(e.target.value);
    // };
    //
    // const handleEmailSubmit = (e: FormEvent<HTMLFormElement>) => {
    //     e.preventDefault();
    //     // Handle email signup logic here
    //     console.log('Email submitted:', email);
    //     onClose(); // Close the modal after submission
    // };

    const handleGoogleSignIn = () => {
        // Handle Google sign-in logic here
        console.log('Google sign-in');
        onClose();
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-100">
            <div className="bg-[#1F363E] p-5 md:p-10 rounded-lg shadow-lg w-[270px] md:w-[450px]">
                <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
                {/*<form onSubmit={handleEmailSubmit}>*/}
                {/*    <div className="mb-4">*/}
                {/*        <label htmlFor="email" className="block text-sm font-medium text-white">Email</label>*/}
                {/*        <input type="email" id="email" value={email} onChange={handleEmailChange}*/}
                {/*               className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"*/}
                {/*            required*/}
                {/*        />*/}
                {/*    </div>*/}
                {/*    /!*<button*!/*/}
                {/*    /!*    type="submit"*!/*/}
                {/*    /!*    className="w-full bg-[#09A896] text-white py-2 px-4 rounded-md hover:bg-[#073A45]  focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"*!/*/}
                {/*    /!*>*!/*/}
                {/*    /!*    Sign Up with Email*!/*/}
                {/*    /!*</button>*!/*/}
                {/*</form>*/}
                <div className="mt-4 text-center">
                    <p className="text-sm text-white">or</p>
                    <button
                        onClick={handleGoogleSignIn}
                        className="mt-2 w-full flex whitespace-nowrap gap-5 items-center justify-center bg-[#073A45] text-white py-2 px-4 rounded-md hover:bg-[#09A896] focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2">
                        Sign In with Google
                        <GoogleIcon className={'w-6 h-6'}/>
                    </button>
                </div>
                <button
                    onClick={onClose}
                    className="mt-4 w-full bg-gray-600 text-white py-2 px-4 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                >
                    Close
                </button>
            </div>
        </div>
    );
};

export default SignUpModal;
