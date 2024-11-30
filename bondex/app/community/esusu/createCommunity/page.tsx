'use client';
import React, { useState } from 'react';
import CreateCommunity from '../../../../components/community/createCommunity';
import Navbar from "../../../../components/navbar/Navbar";

export default function Page(){
    const [communityName, setCommunityName] = useState('');
    const [amountPerContribution, setAmountPerContribution] = useState('');
    const [duration, setDuration] = useState('');

    const handleCommunityNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCommunityName(e.target.value);
    };

    const handleAmountPerContributionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAmountPerContribution(e.target.value);
    };

    const handleDurationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setDuration(e.target.value);
    };

    const handleSubmit = () => {
        // Handle form submission logic here
        console.log('Community Created:', { communityName, amountPerContribution, duration });
    };

    return (

        <div className={'bg-[#073A45]'}>
            <Navbar/>
            <CreateCommunity
                communityName={communityName}
                amountPerContribution={amountPerContribution}
                duration={duration}
                onCommunityNameChange={handleCommunityNameChange}
                onAmountPerContributionChange={handleAmountPerContributionChange}
                onDurationChange={handleDurationChange}
                onSubmit={handleSubmit}
            />
        </div>

    );
}

