
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
          path:'/card-page',
          element:<CardPage/>
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
    }
      ])

export default router;