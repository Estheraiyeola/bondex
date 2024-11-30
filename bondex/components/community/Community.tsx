import React from 'react';
import winner from '../../public/comunity/winner.png';
import firstPlaceImage from '../../public/comunity/goldMedal.png';
import secondPlaceImage from '../../public/comunity/silverMedal.png';
import thirdPlaceImage from '../../public/comunity/bronzeMedal.png';
import Image from 'next/image';
import {LeaderboardEntry} from "@/types/Types";



const leaderboardData: LeaderboardEntry[] = [
    { name: 'Person1', wallet: '0x01234...def01234', deposits: '10 SUI', position: { text: '1st', image: firstPlaceImage }, reward: '50%' },
    { name: 'Person2', wallet: '0x01234...def01235', deposits: '10 SUI', position: { text: '2nd', image: secondPlaceImage }, reward: '30%' },
    { name: 'Person3', wallet: '0x01234...def01236', deposits: '10 SUI', position: { text: '3rd', image: thirdPlaceImage }, reward: '20%' },
    { name: 'Person4', wallet: '0x01234...def01237', deposits: '10 SUI', position: { text: '4th', image: null }, reward: '' },
    { name: 'Person5', wallet: '0x01234...def01238', deposits: '10 SUI', position: { text: '5th', image: null }, reward: '' },
    { name: 'Person6', wallet: '0x01234...def01239', deposits: '10 SUI', position: { text: '6th', image: null }, reward: '' },
    { name: 'Person7', wallet: '0x01234...def01240', deposits: '10 SUI', position: { text: '7th', image: null }, reward: '' },
];

export default function Leaderboard() {
    return (
        <div>
            <div className={'flex ml-[180px] gap-3'}>
                <div className={'rounded-lg text-[13px] items-center bg-[#09A896] flex gap-2 mt-10 px-6 py-2'}>
                    <h1 className="text-white md:text-3xl">Leaderboard</h1>
                    <Image src={winner} alt={'winnerImage'} className={'w-6 h-6'} />
                </div>
                <div className={'bg-[#09A896] mt-10 text-center py-1 rounded-lg px-3 flex items-center'}>
                    {/*pass an icon*/}
                    {/*<Icon icon={'ic:baseline-arrow-drop-up'} className={'text-center text-white h-8 w-8'} />*/}
                </div>
            </div>
            <div className="bg-[#073A45] min-h-screen flex flex-col items-center">
                <div className="mt-6 w-full max-w-4xl overflow-x-auto">
                    <table className="min-w-full bg-[#09A896]">
                        <thead className="hidden md:table-header-group">
                        <tr>
                            <th className="py-2 text-black px-4 border-b">Name</th>
                            <th className="py-2 px-4 text-black border-b">Wallet Address</th>
                            <th className="py-2 px-4 text-black border-b">Deposits</th>
                            <th className="py-2 px-4 text-black border-b">Position</th>
                            <th className="py-2 px-4 border-b text-black">Reward</th>
                        </tr>
                        </thead>
                        <tbody className="block md:table-row-group">
                        {leaderboardData.map((user, index) => (
                            <tr key={index} className="block md:table-row mb-4 md:mb-0">
                                <td className="py-2 px-4 border-b md:border-none">
                                    <span className="block md:hidden font-bold">Name:</span> {user.name}
                                </td>
                                <td className="py-2 px-4 border-b md:border-none">
                                    <span className="block md:hidden font-bold">Wallet Address:</span> {user.wallet}
                                </td>
                                <td className="py-2 px-4 border-b md:border-none">
                                    <span className="block md:hidden font-bold">Deposits:</span> {user.deposits}
                                </td>
                                <td className="py-2 px-4 border-b md:border-none">
                                    <span className="block md:hidden font-bold">Position:</span>
                                    {user.position.image ? (
                                        <Image src={user.position.image} alt={`${user.position.text} image`} width={30} height={30} />
                                    ) : (
                                        user.position.text
                                    )}
                                </td>
                                <td className="py-2 px-4 border-b md:border-none">
                                    <span className="block md:hidden font-bold">Reward:</span> {user.reward}
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
