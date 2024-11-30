"use client";
import React, { useState } from "react";
interface CreateCommunityProps{
    communityname: string;
}
const CreateCommunity: React.FC<CreateCommunityProps>=({communityname})=>{
    const [communityName, setCommunityName] = useState("");
    const [contributionAmount, setContributionAmount] = useState("");
    const [duration, setDuration] = useState("");

    const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log({ communityName, contributionAmount, duration });
        alert("Community creation request submitted!");
    };

    return (
        <div className="bg-[#113A47] min-h-screen flex flex-col items-center justify-center">
            <h1 className="text-2xl font-bold mb-6 mt-6">Community name: {communityname}</h1>
            <div className="border-2 border-[#16D7A6] rounded-[8px] w-full max-w-md mx-[60px] p-8 bg-[#113A47] text-white shadow-lg">
                <p className="text-[#72ddd1] mb-6">
                    Select details carefully to ensure accuracy before submitting your community creation request:-
                </p>
                <form onSubmit={handleFormSubmit} className="space-y-4">
                    <div>
                        <input
                            id="communityName"
                            type="text"
                            value={communityName}
                            onChange={(e) => setCommunityName(e.target.value)}
                            placeholder="Enter Community Name"
                            className="mt-1 block w-full p-2 bg-[#1c7974] rounded-md focus:outline-none focus:ring focus:ring-teal-500"
                            required
                        />
                    </div>

                    <div>
                        <input
                            id="contributionAmount"
                            type="text"
                            value={contributionAmount}
                            onChange={(e) => setContributionAmount(e.target.value)}
                            placeholder="Enter Amount per contribution"
                            className="mt-1 block w-full p-2 bg-[#1c7974] rounded-md focus:outline-none focus:ring focus:ring-teal-500"
                            required
                        />
                    </div>

                    <div>
                        <select
                            id="duration"
                            value={duration}
                            onChange={(e) => setDuration(e.target.value)}
                            className="mt-1 block w-full p-2 bg-[#1c7974] rounded-md focus:outline-none focus:ring focus:ring-teal-500"
                            required
                        >
                            <option value="" disabled>
                                Select Duration
                            </option>
                            <option value="1 Month">1 Month</option>
                            <option value="3 Months">3 Months</option>
                            <option value="6 Months">6 Months</option>
                            <option value="1 Year">1 Year</option>
                        </select>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-[#16D7A6] text-white font-bold py-2 px-4 rounded-md hover:bg-[#0EAF8B] transition"
                    >
                        Create Community
                    </button>
                </form>
            </div>
        </div>
    );
}

export default CreateCommunity;
