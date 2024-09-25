/* eslint-disable react/prop-types */
import React, { createContext, useEffect, useState } from 'react'
import app from '../firebase/firebase.config'
import { createUserWithEmailAndPassword, getAuth, GithubAuthProvider, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile} from "firebase/auth";


 export const AuthContext = createContext()
 const auth = getAuth(app)
 const googleProvider = new GoogleAuthProvider()
 const githubProvider = new GithubAuthProvider()
//  const facebookProvider = new FacebookAuthProvider()

const AuthProvider = ({children}) => {

    const [user,setUser] = useState(null)
    const [loading,setLoading] = useState(true)


    // creat an account
    const creatUser = (email,password) =>{
       setLoading(true)
       return createUserWithEmailAndPassword(auth,email,password)
    }

    // login in with email and password
    const loginUser = (email,password) =>{
        return signInWithEmailAndPassword(auth,email,password)
    }

    // singUp with gmail
    const singUpWithGmail = () =>{
        // setLoading(true)
        return signInWithPopup(auth,googleProvider)
    }

    // singUp with github
    const singUpWithGithub = () =>{
        // setLoading(true)
        return signInWithPopup(auth,githubProvider)
    }

    // logOut
    const logOut = () =>{
        return signOut(auth)

    }

    // update Profile
    const userProfileUpdate = (name, photoURL) => {
        return  updateProfile(auth.currentUser, {
              displayName: name, photoURL: photoURL
            })
      }

    // check singind-user
    useEffect(() =>{
        const unSubscribe = onAuthStateChanged(auth,currentUser =>{
            console.log(currentUser)
            setUser(currentUser)
            setLoading(false)
            // if(currentUser){
            //     setUser(currentUser)
            //      setLoading(false)
            // }else{
            // //   
            // }
            

        })

        return () => {
            return unSubscribe();
        }
    },[])


 const authInfo ={
   user,
   loading,
   creatUser,
   singUpWithGmail,
   singUpWithGithub,
   loginUser,
   logOut,
   userProfileUpdate
 }


  return(
    <AuthContext.Provider value={authInfo}>
       {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider