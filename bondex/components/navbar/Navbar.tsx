'use client';
import React, { useState } from 'react';
import logo from '../../public/navbar/logo.png';
import Image from 'next/image';
import { Icon } from "@iconify/react";
import Hamburger from "../../components/navbar/Hamburger";
import Link  from 'next/link';

export default function Navbar() {
    const [dropdown, setDropdown] = useState(false);

    const toggleDropdown = () => {
        setDropdown((prevState) => !prevState);
    };

    return (
        <div>
            <div
                className={'overflow-hidden bg-[#073A45] w-full flex justify-items-center justify-between text-white py-[12px] px-[24px]'}>
                <div className="">
                    <Image src={logo} alt={'logo'} className={'w-[130px] h-[50px] md:h-[60px] md:w-[140px]'}/>
                </div>
                <div className={'hidden text-[25px] md:flex gap-6 items-center'}>
                    <Link href={'/homepage'}>
                        <p  className="hover:text-white text-[#78d1e1]">Home</p>
                    </Link>
                    <Link href={'/about'}>
                        <p className="hover:text-white text-[#78d1e1]">About</p>
                    </Link>
                    <Link href={'/staking'}>
                        <p className="hover:text-white text-[#78d1e1]">Staking</p>
                    </Link>
                    <Link href={'/community'}>
                        <p className="hover:text-white text-[#78d1e1]">Community</p>
                    </Link>
                </div>
                <button className={'hidden md:block bg-teal-500  hover:bg-teal-600 text-white px-2 md:px-8 py-2 rounded-2xl'}>Connect</button>
                <div className={'block md:hidden  cursor-pointer relative flex-col'}>
                    <Icon icon="ci:hamburger-lg" className={'text-white h-[40px] w-[40px]'} onClick={toggleDropdown}/>
                    {dropdown && (
                        <div className="absolute right-0 top-12 bg-white shadow-lg rounded-md z-[2000 ">
                            <Hamburger/>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
