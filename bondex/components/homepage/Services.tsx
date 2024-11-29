import React from 'react';
import Image from 'next/image';
import { ServiceProps } from "../../types/Types";

const Services: React.FC<ServiceProps> = ({ image, text1, text2, text3, text4, onClick }) => {
    return (
        <div className={'mb-8 overflow-auto justify-items-center left-0 py-5 text-center'} style={{ backgroundColor: '#09A896' }}>
            <Image src={image} alt={'ourServiceImage'} className={'mx-auto'} />
            <div className={'md:text-[16px] text-[12px]'}>
                <p className={'whitespace-nowrap mb-2 font-extrabold text-xl text-[#085B5D]'}>{text1}</p>
                <p className={'text-white'}>{text2}</p>
                <p className={'text-white mb-2'}>{text3}</p>
            </div>
            <button
                onClick={onClick}
                className={'whitespace-nowrap text-[15px] md:text-[20px] rounded-3xl px-4 md:px-6 py-2 justify-center items-center text-white bg-[#085B5D] hover:bg-[#07A896] hover:shadow-lg transition duration-300 ease-in-out'}
            >
                {text4}
            </button>
        </div>
    );
}

export default Services;
