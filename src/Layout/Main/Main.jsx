import React, { useContext } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import "../../App.css";
import { AuthContext } from "../../context/AuthProvider";
import LoadingSpinner from "../../components/LoadingSpinner";

export const Main = () => {
  const { loading } = useContext(AuthContext);
  return (
    <div>
     {
      loading ? <div>
        <LoadingSpinner/>
      </div>:
      <div>
          <Navbar />
          <Outlet></Outlet>
          <Footer />
        </div>
     }
        
    
    </div>
  );
};
