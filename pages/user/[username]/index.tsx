import { NextPage } from 'next'
import React from 'react'
import { useAuth } from '../../../context/UserAuthContext';

const UserProfilePage:NextPage = () => {
    const { user } = useAuth();
  return (
    <div className='pt-28'>
        <main className="max-w-5xl mx-auto flex items-center space-y-4 flex-col">
            <div className="w-24 h-24 overflow-hidden">
                <img src={user?.photoURL || "https://upload.wikimedia.org/wikimedia/id/8/80/Anonymous.png"} className="rounded-full" />
            </div>
            <p className="text-gray-400">{user?.email}</p>
            <h1 className='text-4xl font-bold'>{user?.displayName || "Unknown"}</h1>
        </main>

    </div>
  )
}

export default UserProfilePage