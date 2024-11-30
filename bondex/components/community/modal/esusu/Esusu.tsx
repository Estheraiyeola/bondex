import React from 'react';
import TAC from '../../../community/T&C';

export default function EsusuCommunity() {
    return (
        <div className="min-h-screen bg-[#073A45] flex flex-col items-center justify-center">
            <p className="pb-6 w-full text-center font-bold text-[13px] md:text-lg text-white">Esusu</p>
            <div className="w-full max-w-2xl px-4 bg-[#001F3F] text-white rounded-lg">
                <TAC
                    header="Terms and Conditions"
                    buttonText="Proceed"
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
            </div>
        </div>
    );
}
