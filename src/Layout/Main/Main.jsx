import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import '../../App.css'

export const Main = () => {
  return (
    <div>
        <Navbar/>
        <div className=''>
         <Outlet></Outlet>
        </div>
        <Footer/>
    </div>
  )
}
