import React from 'react';
export default function Hamburger() {
    return (
        <div className="font-bold text-lg items-center flex flex-col text-black p-4 gap-2 cursor-pointer bg-teal-500 bg-opacity-25">
            <div className="hover:text-teal-500 hover:-translate-y-1 transition-all">
                <h1>Home</h1>
            </div>
            <div className="hover:text-teal-500 hover:-translate-y-1 transition-all">
                <h1>About</h1>
            </div>
            <div className="hover:text-teal-500 hover:-translate-y-1 transition-all">
                <h1>Staking</h1>
            </div>
            <div className="hover:text-teal-500 hover:-translate-y-1 transition-all">
                <h1>Community</h1>
            </div> </div>
    );
}