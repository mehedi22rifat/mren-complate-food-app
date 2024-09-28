import React from "react";
import { Link, Outlet } from "react-router-dom";
import { MdDashboard, MdDashboardCustomize } from "react-icons/md";
import { FaEdit, FaQuestionCircle, FaShoppingBag, FaUser } from "react-icons/fa";
import { FaCartShopping, FaFolderPlus, FaLocationArrow, FaRegUser, FaUsers } from "react-icons/fa6";
import logo from '../../../../public/logo.png'


const DeshboardLayout = () => {

    const sharedLinks = (
        <>
          <li className="mt-3">
            <Link to="/">
              <MdDashboard /> Home
            </Link>
          </li>
          <li>
              <Link to="/menu"><FaCartShopping/> Menu</Link>
          </li>
          <li>
              <Link to="/menu"><FaLocationArrow/> Orders Tracking</Link>
          </li>
          <li>
              <Link to="/menu"><FaQuestionCircle/> Customer Support</Link>
          </li>
        </>
      );


  return (
    <div>
      <div className="drawer sm:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col sm:items-start sm:justify-start my-2">
          {/* Page content here */}
          <div className="flex items-center justify-between mx-4">
          <label
            htmlFor="my-drawer-2"
            className="btn btn-primary drawer-button lg:hidden md:hidden"
          >
            <MdDashboardCustomize />
          </label>
          <button className="btn rounded-full px-6 bg-green flex items-center gap-2 text-white sm:hidden">
            <FaRegUser /> Logout
          </button>
        </div>
          {/* OUT LET HERE */}
        <div className="mt-5 md:mt-2 mx-4">
            <Outlet/>
        </div>

        </div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer-2"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
            {/* Sidebar content here */}
            <li>
            <Link to={'/deshboard'} className="flex justify-start mb-2">
               <img src={logo} className="w-20" alt="" />
               <span className="badge badge-primary">Admin</span>
            </Link>
            </li>
            <hr />
            <li className="mt-3">
            <Link to={'/deshboard'}><MdDashboard/> Deshboard</Link>
            </li>
             <li>
            <Link to={'/deshboard'}><FaShoppingBag /> Manage Booking</Link>
            </li>
             <li>
            <Link to={'/deshboard'}><FaFolderPlus /> Add Menu</Link>
            </li>
             <li>
            <Link to={'/deshboard'}><FaEdit /> Manage Item</Link>
            </li>
            <li>
              <Link to={'/deshboard/users'}><FaUsers /> All Users</Link>
            </li>
            <hr />
            {/* haared nav links */}
            {
                sharedLinks
            }
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DeshboardLayout;
