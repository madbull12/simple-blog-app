import { NextPage } from 'next'
import React, { useState } from 'react'
import { doc, setDoc } from "firebase/firestore"; 
import { db } from '../../libs/firebase';
import { useAuth } from '../../context/UserAuthContext';
import { useRouter } from 'next/router';

const AdminPage:NextPage = () => {
    const [title,setTitle] = useState<string>("");
    const { user } = useAuth();
    const router = useRouter();
    const slugGenerator = (_title:string) => {
        return _title.replace(/\s/g, "-");
    }
    
    if(!user) { 
        router.push("/enter")
    }

    const createNewPost = () => {
        
    }
  return (
    <section className='pt-28 max-w-5xl mx-auto space-y-4'>
        <h1 className="text-4xl font-semibold ">Manage your Posts</h1>
        <input type="text" placeholder="Type a title for your article" className='outline-none px-2 py-4 w-full shadow-md text-lg' onChange={(e)=>setTitle(e.target.value)} />
        <button className={`rounded-sm bg-purple-300 p-4 text-white font-bold text-lg  shadow-md ${title.length < 4 && "cursor-not-allowed"}`} disabled={title.length < 4} onClick={()=>console.log("shit")} >Create new post</button>
    </section>
  )
}

export default AdminPage