import React from 'react';

interface CreateCommunityProps {
    communityName: string;
    amountPerContribution: string;
    duration: string;
    onCommunityNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onAmountPerContributionChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onDurationChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    onSubmit: () => void;
}

const CreateCommunity: React.FC<CreateCommunityProps> = ({
                                                             communityName,
                                                             amountPerContribution,
                                                             duration,
                                                             onCommunityNameChange,
                                                             onAmountPerContributionChange,
                                                             onDurationChange,
                                                             onSubmit,
                                                         }) => {
    return (
        <div className="bg-teal-900 p-6 rounded-lg w-80 mx-auto text-white">
            <h2 className="text-2xl font-bold mb-4">Create a Save Up Pool</h2>
            <p className="text-base mb-6">
                Select details carefully to ensure accuracy before submitting your community creation request:
            </p>
            <input
                type="text"
                value={communityName}
                onChange={onCommunityNameChange}
                placeholder="Enter Community Name"
                className="mt-1 block w-full p-2 mb-4 rounded bg-teal-700 border-none"
                required
            />
            <input
                type="text"
                value={amountPerContribution}
                onChange={onAmountPerContributionChange}
                placeholder="Amount Per Contribution"
                className="mt-1 block w-full p-2 mb-4 rounded bg-teal-700 border-none"
                required
            />
            <select
                value={duration}
                onChange={onDurationChange}
                className="mt-1 block w-full p-2 mb-4 rounded bg-teal-700 border-none"
                required
            >
                <option value="" disabled>
                    Select Duration
                </option>
                {/* Add more options here */}
            </select>
            <button
                onClick={onSubmit}
                className="block w-full p-2 rounded bg-teal-600 hover:bg-teal-500 font-bold"
            >
                Create Community
            </button>
        </div>
    );
}

export default CreateCommunity;
