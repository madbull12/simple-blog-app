import { NextPage } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import GoogleButton from 'react-google-button'
import { FcGoogle } from 'react-icons/fc'
import { useAuth } from '../context/UserAuthContext';

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

const SignInPage:NextPage= () => {
  const { user,signIn,signinWithGoogle } = useAuth();
  console.log(user)
  const[email,setEmail] = useState("");
  const[password,setPassword] = useState("");
  const router = useRouter();
  const[error,setError] = useState<any>(null);

  
  const handleSignin = async(e:any)=>{
    e.preventDefault();

    try {
        await signIn(email,password);
        router.push("/");
    } catch(err:any) {
        console.log(err)
        setError(err.code);
    }
    console.log(email,password)
}
  
  if(user) {
    router.push("/");
  }

  return (
    <main className="pt-28">
        {/* <button className="bg-purple-300 font-bold text-white whitespace-nowrap hover:bg-purple-400 py-2 px-4 shadow-sm rounded-sm transition ease-in flex items-center space-x-2">

          <span>Sign In with</span> 
          <FcGoogle className="text-lg" />

        </button> */}
          <div className='border max-w-md  mx-auto border-slate-200 p-6 shadow-md space-y-4'>
            <h1 className="text-4xl font-semibold">Log In</h1>
            <p className="text-gray-400">Enter your credentials to access your account.</p>
        
            {/* <button className="w-full flex items-center gap-2 font-semibold shadow-sm border border-gray-300 rounded-lg py-2 px-4 justify-center ">
              <FcGoogle />
              Login with google
            </button> */}
            <ErrorMessage error={error} />
            <GoogleButton
   
              style={{width:"100%"}}
              onClick={()=>{
                signinWithGoogle();
              
              }}
            />
            <div className='flex items-center gap-2'>
              <div className='flex-1 h-[1px] bg-slate-200'></div>
              <span className='text-gray-400'>or</span>
              <div className='flex-1 h-[1px] bg-slate-200'></div>
            </div>
            <form className="space-y-4">
                <div className='space-y-2'>
                  <p>Email address</p>
              
                  <input type="text" required placeholder="name@company.com" className='input-style' onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className='space-y-2'>
                  <p>Password</p>
                  <input type="password" required placeholder="your password" className='input-style' onChange={(e) => setPassword(e.target.value)} />
                </div>
                <button onClick={handleSignin} className="bg-slate-900 font-bold text-white w-full py-2 px-4 shadow-sm cursor-pointer">Sign in</button>
                <p >Not a member? <span className="text-purple-500"><Link href="/sign-up" >Sign up</Link></span>  </p>
            </form>
        </div>
        
    </main>
  )
}

export default SignInPage