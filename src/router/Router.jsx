
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
          element:<Manu/>
        },
        {
          path:'/cardPage',
          element:<ProvateRoute><CardPage/></ProvateRoute>
        },
        {
          path:"/update-profile",
          element:<UpdateUserProfile/>
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
        }
      ]
    }



      ])

export default router;