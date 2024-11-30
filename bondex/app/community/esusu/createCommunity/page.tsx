'use client';
import React  from 'react';
import CreateCommunity from '../../../../components/community/createCommunity';

export default function page(){

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <CreateCommunity communityname={'Esusu'}/>
        </div>
    );
};

