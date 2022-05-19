import { createUserWithEmailAndPassword } from 'firebase/auth';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React,{ FormEvent, useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import { useAuth } from '../context/UserAuthContext';
import { auth } from '../libs/firebase';

interface IMessage {
    error:string
}

const ErrorMessage = ({ error}:IMessage) => {
    const [msg,setMsg] = useState<string>("");
    useEffect(()=>{
        switch(error) { 
            case "auth/email-already-in-use":
                setMsg("Email's exist");
                break;
            case "auth/invalid-email":
                setMsg("Invalid Email");
                break;
            case "auth/weak-password":
                setMsg("Password's too weak")
        }

    },[error])
   
    
    return (
        <p className="text-center text-red-500">
            {msg}
        </p>
    )
}


const SignUpPage = () => {
    const { user,signUp } = useAuth();
    const router = useRouter();

    const[email,setEmail] = useState<string>("");
    const[password,setPassword] = useState<string>("");

    const[error,setError] = useState<any>(null);

    const handleSignup = async(e:any)=>{
        e.preventDefault();

        try {
            await signUp(email,password);
            setError(null);
     
            router.push("/enter");
            console.log(user);
            
        } catch(err:any) {
            console.log(err.code);
            setError(err.code);
        }
        console.log(email,password)
    }
  return (
    <main className="pt-28">
        <div className=' max-w-md border border-slate-200 p-6 shadow-md drop-shadow-sm mx-auto space-y-4'>
        <h1 className='text-4xl'>Sign up with your email</h1>
        <p className='text-gray-400'>Already have an account? <span className="text-purple-500"><Link href="/enter">Sign in</Link></span></p>
        <ErrorMessage error={error} />
        <form className='space-y-4'>
            {/* <div className="space-y-2">
                <p>First name</p>
                <input type="text" required placeholder="ex: John" className='input-style' />
            </div>
            <div className="space-y-2">
                <p>Last name</p>
                <input type="text" required placeholder="ex: Doe" className='input-style'  />
            </div> */}
            <div className="space-y-2">
                <p>Email address</p>
                <input type="text" required placeholder="name@company.com" className='input-style' onChange={(e)=>setEmail(e.target.value)} />
            </div>
            <div className="space-y-2">
                <p>Password</p>
                <input type="password" required placeholder="your password" className='input-style' onChange={(e)=>setPassword(e.target.value)} />
            </div>
            <button onClick={handleSignup} className="bg-slate-900 cursor-pointer font-bold text-white w-full py-2 px-4 shadow-sm">Sign up</button>
            
        </form>
        </div>
        
    </main>
  )
}

export default SignUpPage;