'use client';
import React, { useState } from 'react';
import Image from "next/image";
import heroImage from "../../public/hero/heroImage.png";
import Services from "../../components/homepage/Services";
import equity1 from "../../public/hero/equity1.png";
import viralMarketing from '../../public/hero/viralMarketing.png';
import OverlayMessage from "@/components/homepage/OverlayMessage";
import shield from '../../public/hero/shield.png';
import transparency from '../../public/hero/transparency.png';
import security from '../../public/hero/security.png';
import logo from '../../public/navbar/logo.png';
import together from '../../public/hero/together.png';
import Footer from '../footer/footer';
import SignUpModal from '../../components/homepage/modal/Signup';

export default function Hero() {
    const [showSignUpModal, setShowSignUpModal] = useState<boolean>(false);

    const handleShowModal = () => {
        setShowSignUpModal(true);
    };

    const handleCloseModal = () => {
        setShowSignUpModal(false);
    };

    return (
        <div className={'overflow-hidden px-[30px] z-10'} style={{ backgroundColor: '#073A45' }}>
            <div className={"overflow-hidden px-[30px] justify-between sm:px-[24px] flex flex-col md:flex-row sm:items-center"}>
                <div className={'mt-[90px] mb-[40px] font-bold sm:mt-[70px] sm:w-full text-center md:text-left sm:mr-0 sm:items-center sm:justify-center'}>
                    <p className={'text-[20px] md:text-[40px]'}>Empowering <span style={{ color: '#72DDD1' }} className={'font-bold'}>Communities</span>,</p>
                    <p className={"text-[20px] md:text-[40px]"}>Securing the <span style={{ color: '#72DDD1' }}>Future</span></p>
                    <p className={'text-[15px]  md:text-[25px] mt-5'}>Redefining Community Finance, Empowering</p>
                    <p className={"text-[15px]  md:text-[25px]"}>Financial Inclusion</p>
                </div>
                <Image src={heroImage} alt={'heroimage'} className={'w-[200px] h-[200px] md:w-[400px] md:h-[400px]'} />
            </div>
            <div className={'px-6'}>
                <p className={'whitespace-nowrap md:text-[16px] text-[12px]'} style={{ color: '#72DDD1' }}>what we offer</p>
                <p className={"whitespace-nowrap  text-[20px] md:text-2xl md:font-extrabold text-white"}>Our Services</p>
            </div>
            <div className={'mx-[60px] mt-5'}>
                <Services image={equity1} text1={'Staking'}
                          text2={'Stake to Earn:- Lock up your crypto assets to support the network and earn rewards in '}
                          text3={'return'}
                          text4={'Stake'} onClick={handleShowModal} />
            </div>
            <div className={'mx-[60px] mt-7 '}>
                <Services image={viralMarketing} text1={'Community Pool'}
                          text2={'Users can create personal savings, join rotating savings communities, or collectively pool funds until a specified end date, providing flexible and collaborative financial solutions.'}
                          text4={'Join'}  onClick={handleShowModal} />
            </div>
            <div className={'relative flex overflow-hidden'}>
                <p className={'relative ml-[60px] h-[50px] md:h-[100px] mt-8 w-[50px] md:w-[100px] mb-10 bg-[#075055] rounded-[50px]'}></p>
                <p className={'relative z-10 py-[50px] text-[14px] font-bold md:font-extrabold md:text-2xl text-white'}>
                    <span className={'absolute left-[-28px] md:left-[-50px] '}>Bon</span>dex is safe and secure
                </p>
            </div>

            <div className={'flex flex-col md:flex-row justify-evenly '}>
                <OverlayMessage image={shield}
                                message={'We leverage on the power of blockchain technology to ensure the security and transparency of all transactions.'} />
                <OverlayMessage image={security}
                                message={'We leverage on the power of blockchain technology to ensure the security and transparency of all transactions.'} />
                <OverlayMessage image={transparency}
                                message={'We leverage on the power of blockchain technology to ensure the security and transparency of all transactions.'} />
            </div>

            <div className={'my-[40px]'}>
                <div className={'flex justify-center'}>
                    <Image src={logo} alt={'theLogo'} className={'relative'} />
                </div>
                <div className={'justify-items-center items-center mt-6 text-white text-[13px] md:text-[16px] flex flex-col md:gap-2 md:flex-row'}>
                    <p className={'text-center md:text-left'}>Bondex is a decentralized platform designed to
                        revolutionize community-based finance. By leveraging blockchain technology, we empower
                        individuals to participate in transparent, secure, and efficient financial transactions.</p>
                    <Image src={together} alt={'togetherImage'} className={'mx-auto'} />
                </div>
            </div>
            <Footer />
            {showSignUpModal && <SignUpModal onClose={handleCloseModal} />}
        </div>
    );
}
