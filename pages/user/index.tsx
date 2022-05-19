import { NextPage } from 'next'
import React from 'react'
import { useAuth } from '../../context/UserAuthContext'

const UserProfilePage:NextPage = () => {
    const { user } = useAuth();
  return (
    <div>
        
    </div>
  )
}

export default UserProfilePage