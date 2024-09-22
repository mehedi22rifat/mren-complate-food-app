
import {
    createBrowserRouter,
  } from "react-router-dom";
import { Main } from "../Layout/Main/Main";
import { ErrorElement } from "../components/ErrorElement";
import { Home } from "../pages/Home";
import Manu from "../pages/shop/Manu";



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
        }
      ]
    }
      ])

export default router;