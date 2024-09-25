import React, { useContext, useEffect, useState } from "react";
import logo from "../../public/logo.png";
import { FiAward, FiPhoneCall } from "react-icons/fi";
import { FaUser } from "react-icons/fa6";
import Login from "./Login";
import { AuthContext } from "../context/AuthProvider";
import Profile from './Profile';
import { Link } from "react-router-dom";
import useCard from "../hooks/useCard";


const Navbar = () => {
    const [stacky,setStacky] = useState(false)
    const {user} = useContext(AuthContext)

    // get use query
    const [cart,refetch] = useCard()

    // console.log(cart)
    
    
    // handle scroll function
    useEffect(() =>{
      const handleScroll =() =>{
        const offset = window.scrollY;
      if(offset >0){
        setStacky(true)
      }
      else{
        setStacky(false)
      }
      }
     return () => {
      window.addEventListener("scroll",handleScroll)
     }
    },[])


  const navItem = (
    <>
      <li>
        <a href="/">Home</a>
      </li>
      <li>
        <details>
          <summary>Manu</summary>
          <ul className="p-2">
            <li>
              <a href="/menu">All</a>
            </li>
            <li>
              <a>Salad</a>
            </li>
            <li>
              <a>Pizza</a>
            </li>
          </ul>
        </details>
      </li>
      <li tabIndex={0}>
        <details>
          <summary>Services</summary>
          <ul className="p-2">
            <li>
              <a>Online Order</a>
            </li>
            <li>
              <a>Table Booking</a>
            </li>
            <li>
              <a>Order Tracking</a>
            </li>
          </ul>
        </details>
      </li>
      <li>
        <a>Offers</a>
      </li>
    </>
  );

  return (
    <header className="max-w-screen-2xl fixed top-0 bg-slate-50 z-30 left-0 right-0 container mx-auto transition-all duration-300 ease-in-out">
      <div className={`navbar lg:px-24 ${stacky ? 'shadow-xl bg-base-100 transition-all duration-300 ease-in-out ':''}`}>
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              {navItem}
            </ul>
          </div>
          <a>
            <img src={logo} alt="logo png" />
          </a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{navItem}</ul>
        </div>
        <div className="navbar-end">
            {/* search icon */}
          <button className="btn btn-ghost btn-circle hidden lg:flex">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>
          {/* add product icon */}
         <Link to={'card-page'}>
         <label
            tabIndex={0}
            className="btn btn-ghost btn-circle hidden lg:flex items-center justify-center mr-3"
          >
            <div className="indicator">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg> 
              <span className="badge badge-sm indicator-item">{cart.length || 0}</span>
            </div>
          </label>
         </Link>
          {/* contact btn */}
         {
          user ? <Profile user={user} />: <a 
          onClick={()=>document.getElementById('my_modal_3').showModal()}
         className="btn bg-green mx-3 rounded-full text-white font-bold">
           <FaUser/> Login
         </a>
         }
          <Login/>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
