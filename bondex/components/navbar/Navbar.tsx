'use client';
import React, { useState } from 'react';
import logo from '../../public/navbar/logo.png';
import MenuIcon from '@mui/icons-material/Menu';
import Image from 'next/image';
import Hamburger from "../../components/navbar/Hamburger";
import Link from 'next/link';
import CommunityMenu from '../community/modal/communities';

export default function Navbar() {
  const [dropdown, setDropdown] = useState(false);
  const [communityMenuVisible, setCommunityMenuVisible] = useState(false);

  const toggleDropdown = () => {
    setDropdown((prevState) => !prevState);
  };

  const toggleCommunityMenu = () => {
    setCommunityMenuVisible((prevState) => !prevState);
  };

  return (
    <div>
      <div
        className="max-h-52 bg-[#073A45] w-full flex justify-items-center justify-between text-white py-[12px] px-[24px]"
      >
        <div>
          <Image
            src={logo}
            alt="logo"
            className="w-[130px] h-[50px] md:h-[60px] md:w-[140px]"
          />
        </div>
        <div className="hidden text-[25px] md:flex gap-6 items-center relative">
          <Link href="/homepage">
            <p className="hover:text-white text-[#78d1e1]">Home</p>
          </Link>
          <Link href="/about">
            <p className="hover:text-white text-[#78d1e1]">About</p>
          </Link>
          <Link href="/staking">
            <p className="hover:text-white text-[#78d1e1]">Staking</p>
          </Link>
          {/* Toggle Community Menu */}
          <div className="relative">
            <Link href="/">
              <p
                className="hover:text-white text-[#78d1e1] cursor-pointer"
                onClick={toggleCommunityMenu} 
              >
                Community
              </p>
            </Link>
            {communityMenuVisible && (
              <div className="absolute top-full left-0">
                <CommunityMenu />
              </div>
            )}
          </div>
        </div>
        <button className="hidden md:block bg-teal-500 hover:bg-teal-600 text-white px-2 md:px-8 py-2 rounded-2xl">
          Connect
        </button>
        <div className="block md:hidden cursor-pointer relative flex-col">
          hamburger
          <MenuIcon
            className="text-white h-[40px] w-[40px]"
            onClick={toggleDropdown}
          />
          {dropdown && (
            <div className="absolute right-0 top-12 bg-white shadow-lg rounded-md z-[2000]">
              <Hamburger />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
