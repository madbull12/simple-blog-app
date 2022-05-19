import Link from "next/link"
import { useRouter } from "next/router";
import { useAuth } from "../context/UserAuthContext";


const Navbar = () => {
  const { user,logOut } = useAuth();
  const router = useRouter();
  return (
    <nav className="bg-white p-4 fixed w-full top-0 ">
        <main className="max-w-5xl mx-auto  flex justify-between">
        <div className="bg-purple-300 rounded-lg">
           <h1 className="text-white text-3xl py-2 px-4 font-black ">
               <Link href="/">FEEDZ</Link>
           </h1>
       </div>
       <div className="flex gap-2 ">
          {user ? (
            <>
              <button className="bg-slate-900 text-white font-semibold p-4 rounded-full" onClick={()=>router.push("/admin")}>
                Write Posts
              </button>
              <button className="bg-transparent border-2 rounded-full hover:border-0 hover:bg-purple-300 hover:text-white border-purple-300 text-lg px-6 font-semibold transition-all ease-in-out" onClick={logOut}>
                  Logout
              </button>
            </>
              
              
          ):(
              <button className="bg-transparent border-2 rounded-full hover:border-0 hover:bg-purple-300 hover:text-white border-purple-300 text-lg px-6 font-semibold transition-all ease-in-out">
                <Link href="/enter">Login</Link>
              </button>
          )}
        <div className="w-12 h-12 self-center overflow-hidden cursor-pointer">
          <Link href={`/user/${user?.uid}`} >
           <img src={user?.photoURL || "https://upload.wikimedia.org/wikimedia/id/8/80/Anonymous.png"} className="rounded-full" />
          
          </Link>
        </div>
       </div>

       
    
     
        </main>
     
    </nav>
  )
}

export default Navbar