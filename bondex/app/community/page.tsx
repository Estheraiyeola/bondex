'use client';
import React, { useState } from 'react';
import Navbar from "../../components/navbar/Navbar";
import Leaderboard from "../../components/community/Community";

export default function Page() {
    const [link, setLink] = useState('');
    const [joined, setJoined] = useState(false);

    const handleJoin = () => {
        if (link) {
            setJoined(true);
        }
    };

    return (
        <div className="bg-[#073A45] min-h-screen flex flex-col">
            <Navbar />
            {!joined ? (
                <div className="px-10 mt-10 text-center">
                    <p className="md:text-[16px] text-[12px] text-white">
                        <span className="text-[#086665]">Bondex</span> offers a revolutionary approach to finance,
                        empowering individuals and communities to take control of their financial destinies.
                        Create your own decentralized community, collaborate with like-minded individuals, and
                        unlock the power of blockchain technology. With <span className="text-[#086665]">Bondex</span>, you can
                    </p>
                    <div className="mt-10 flex flex-col items-center">
                        <p className="text-[10px] md:text-[16px] text-white rounded-2xl p-2 bg-[#07A896]">Create a community</p>
                        <div className="flex items-center gap-2 bg-teal-700 rounded-full p-1 w-fit mt-5">
                            <input type="text" placeholder="Enter community link" className="bg-transparent text-gray-300 px-3 py-2 w-[200px] focus:outline-none placeholder:text-gray-400" value={link}
                                onChange={(e) => setLink(e.target.value)}
                            />
                            <button className={`px-4 py-2 rounded-full ${link ? 'bg-teal-500 hover:bg-teal-600 text-white' : 'bg-gray-500 text-gray-300 cursor-not-allowed'}`}
                                    disabled={!link}
                                onClick={handleJoin}>
                                Join
                            </button>
                        </div>
                    </div>
                </div>
            ) : (
                <Leaderboard />
            )}
        </div>
    );
}
