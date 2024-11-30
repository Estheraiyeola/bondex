import React from 'react';
import Navbar from "../../components/navbar/Navbar";
import Footer from '../../components/footer/footer';

export default function Staking() {
    return (
        <div className="bg-[#073A45] min-h-screen flex flex-col">
            <Navbar />
            <div className="flex-grow mx-[150px] px-10 py-10">
                <p className="md:text-3xl ml-[150px] font-extrabold text-[20px] whitespace-nowrap">Staking information</p>
                <div className="mx-[150px] py-10 mt-10 border-[#077B74] border-4">
                    <div className="mx-5">
                        <p className="text-[#077B74] mb-7 font-bold md:text-[16px] text-[8px]">
                            Select Details Carefully
                        </p>
                        <div className="flex gap-2">
                            <div className="justify-items-center p-2 rounded-3xl border-2 border-[#09A896] h-7 w-7">
                                <p className="rounded-2xl bg-[#09A896] w-3 h-3"></p>
                            </div>
                            <p>SUI</p>
                        </div>
                        <p className="px-5 w-[100px] whitespace-nowrap text-center md:w-[200px] bg-[#09A896] mt-5 mb-3 rounded-lg text-white py-2 md:text-[16px] text-[8px]">
                            Enter Token Amount
                        </p>
                        <p className="text-[#09A896] md:text-[16px] mb-10 text-[13px]">
                            Minimum amount to stake is 5 sui
                        </p>
                        <div className="flex justify-center">
                            <p className="md:w-[100px] w-[70px] bg-[#09A896] text-white px-5 py-2 text-center text-[8px] md:text-[16px] rounded-lg">
                                Stake
                            </p>
                        </div>
                    </div>
                </div>
                <p className="ml-[150px] font-bold text-[#09A896] md:text-[15px] text-[8px] my-4">
                    Disclaimer
                </p>
            </div>
            <Footer />
        </div>
    );
}
