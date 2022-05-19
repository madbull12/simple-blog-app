import { createContext,ReactNode,useContext, useEffect, useState } from "react";
import {signInWithPopup,GoogleAuthProvider, onAuthStateChanged,createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth, db, googleProvider } from "../libs/firebase";
import { User } from "../typings";
import { useRouter } from "next/router";
import { doc, setDoc } from "firebase/firestore"; 

export const UserAuthContext = createContext({});

export const useAuth = () => useContext<any>(UserAuthContext);

export const UserAuthContextProvider = ({
     children,
}:{
    children:ReactNode
})=>{
    const [user,setUser] = useState<any>(null);
    const [loading,setLoading] = useState<boolean>(false);
    const router = useRouter();

    const signinWithGoogle = async() => {
        try {
            await signInWithPopup(auth,googleProvider);
            router.push("/")
        }catch(err:any) {
            console.log(err);
        } 
    }

    const signUp = (email:string,password:string) => {
        try {
            const signedUpUser = createUserWithEmailAndPassword(auth,email,password);
        
            return signedUpUser
        } catch (err:any) {
            console.error(err);
            
        }

 
    }
    const signIn = (email:string,password:string) => {
        try {
            const signedInUser = signInWithEmailAndPassword(auth,email,password);
            return signedInUser
        } catch (err) {
            console.error(err);
        }
    }
    
    const logOut = async() => {
        setUser(null);
        await signOut(auth);
    }
    useEffect(()=>{
        let unsubscribe = onAuthStateChanged(auth,(user)=>{
            setLoading(true);
            if(user) {
                setUser(user);
                const createDoc = async()=>{
                    try {
                        await setDoc(doc(db,"users",user.uid),{
                            displayName:user.displayName,
                            email:user.email,
                            photoURL:user.photoURL
                            
                        });
                    } catch(err) {
                        console.log(err);
                    }
                   
                }
                createDoc();
              
            } else {
                setUser(null);
            }
            setLoading(false);
        })

        return () => unsubscribe()
    },[]);

    return <UserAuthContext.Provider value={{user,signIn,signUp,logOut,loading,setUser,signinWithGoogle}}>{children}</UserAuthContext.Provider>
}