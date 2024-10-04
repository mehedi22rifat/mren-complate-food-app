
import {
    createBrowserRouter,
  } from "react-router-dom";
import { Main } from "../Layout/Main/Main";
import { ErrorElement } from "../components/ErrorElement";
import { Home } from "../pages/Home";
import Manu from "../pages/shop/Manu";
import Register from "../components/Register";
import ProvateRoute from "../privateRoute/ProvateRoute";
import UpdateUserProfile from "../pages/Deshboard/UpdateUserProfile";
import CardPage from "../pages/shop/cardPage";
import DeshboardLayout from "../Layout/Main/DeshboardLayout/DeshboardLayout";
import Deshboard from "../pages/Deshboard/Admin/Deshboard";
import Users from "../pages/Deshboard/Admin/Users";
import AddMenu from "../pages/Deshboard/Admin/AddMenu";
import ManageItem from "../pages/Deshboard/Admin/ManageItem";
import UpdateMenu from "../pages/Deshboard/Admin/UpdateMenu";
import Payment from "../pages/shop/Payment";
import Order from "../pages/shop/Order";



const router = createBrowserRouter([
    {
      path: "/",
      element:<Main />,
      errorElement:<ErrorElement />,
      children:[
        {
            path:'/',
            element:<Home/>
        },
        {
          path:'/menu',
          element: <Manu/>
        },
        {
          path:'/cardPage',
          element:<ProvateRoute><CardPage/> </ProvateRoute>
        },
        {
          path:"/update-profile",
          element:<UpdateUserProfile/>
        },
        {
          path:'/process-chekout',
          element:<Payment/>
        },
        {
          path:'/order',
          element:<Order/>
        }
      ]
    },
    {
      path:'/singUp',
      element:<Register/>
    },{
      path:'deshboard',
      element:<ProvateRoute><DeshboardLayout/></ProvateRoute>,
      children:[
        {
          path:'',
          element:<Deshboard/>
        },
        {
          path:'users',
          element:<Users/>
        },
        {
          path:'add-menu',
          element:<AddMenu/>
        },
        {
          path:"manage-item",
          element:<ManageItem/>
        },
        {
          path:'update-menu/:id',
          element:<UpdateMenu/>,
          loader: ({params}) => fetch(`http://localhost:6001/menu/${params.id}`)
        }
      ]
    }



      ])

export default router;