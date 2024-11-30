import React from 'react';
import Link from 'next/link';

export default function CommunityMenu() {
    return (
        <div className="relative bg-[#14B8A6] text-lg z-[50] w-full md:w-auto">
            {/* Dropdown Menu */}
            <div
                className="absolute left-0 mt-2 w-full md:w-48 bg-white shadow-md rounded-md z-[100]"
                style={{ zIndex: 100 }}
            >
                {/* Dropdown Header */}
                <div className="bg-gray-100 px-4 text-[#14B8A6] py-2 font-bold hover:text-[#073A45] text-[14px] md:text-[16px]">
                    Communities
                </div>
                <ul className="flex font-bold flex-col text-[#073A45] md:text-[15px] text-[12px]">
                    <li className="hover:bg-gray-200 px-4 py-2 cursor-pointer">
                        <Link href="/community/esusu">Esusu</Link>
                    </li>
                    <li className="hover:bg-gray-200 px-4 py-2 cursor-pointer">
                        <Link href="/community/save-up">Save up</Link>
                    </li>
                    <li className="hover:bg-gray-200 px-4 py-2 cursor-pointer">
                        <Link href="/community/vault-race">Vault Race</Link>
                    </li>
                </ul>
            </div>
        </div>
    );
}
