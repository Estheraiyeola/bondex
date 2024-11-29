import React from 'react';
import {OverlayProps} from "@/types/Types";
import Image from 'next/image';
const OverlayMessage:React.FC<OverlayProps>=({image,message})=>{
    return(
        <div className={'mb-5 md:mb-0 items-center text-center justify-items-center text-white md:text-[20px] text-[13px]'}>
            <Image src={image} alt={'messageImage'}/>
            <p>{message}</p>
        </div>
    );
}

export default OverlayMessage;