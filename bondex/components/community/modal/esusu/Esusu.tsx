'use client';
import React, { useState } from 'react';
import TAC from '../../../community/T&C';
import Link from 'next/link';

export default function EsusuCommunity() {
    const [isChecked, setIsChecked] = useState(false);

    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center" style={{ backgroundColor: '#6FE2CE' }}>
            <div className="relative w-full max-w-2xl py-4 px-8 bg-[#001F3F] text-white rounded-lg">
                <p className="pb-6 w-full text-center md:font-extrabold font-bold text-[13px] md:text-xl text-white">Esusu</p>
                <TAC
                    header="Terms and Conditions"
                    content={` 
                        Contribution Amount: Each member is required to contribute a minimum of 50 SUI per cycle.

                        Interest Rate: Members earn an interest rate of 1.5% per year on their contributions.

                        Contribution Frequency: Contributions are made monthly.

                        Withdrawal Policy: Members can only withdraw their funds at the end of the stipulated time.

                        Community Rules:
                        Respect all members and maintain a positive environment.
                        No spamming, harassment, or abusive behavior.
                        Follow the specific rules set by the community.

                        Security Measures: The platform uses advanced encryption and blockchain technology to ensure the security of all transactions.

                        Dispute Resolution: Any disputes will be resolved through arbitration.

                        Privacy Policy: The platform collects and uses personal data in accordance with its privacy policy.
                    `}
                />
                <div className={'flex justify-between   mt-5 '}>
                    <div className="flex justify-items-center justify-center mb-6">
                        <input
                            type="checkbox"
                            id="terms-checkbox"
                            className="mr-2 w-6 h-6"
                            checked={isChecked}
                            onChange={handleCheckboxChange}
                        />
                        <label htmlFor="terms-checkbox" className="text-sm md:text-base">
                            I agree to the Terms and Conditions
                        </label>
                    </div>
                    {/*provide the link to esusu page*/}
                    <Link href={'/community/esusu/createCommunity'}>
                        <div className="flex justify-end">
                            <button
                                disabled={!isChecked}
                                className={`px-5 py-2 rounded text-white md:text-[15px] text-[12px] ${
                                    isChecked ? 'bg-[#09A896] cursor-pointer' : 'bg-gray-400 cursor-not-allowed'
                                }`}>
                                Proceed
                            </button>
                        </div>
                    </Link>

                </div>

            </div>
        </div>
    );
}
