
import {
    createBrowserRouter,
  } from "react-router-dom";
import { Main } from "../Layout/Main/Main";
import { ErrorElement } from "../components/ErrorElement";
import { Home } from "../pages/Home";



const router = createBrowserRouter([
    {
      path: "/",
      element:<Main />,
      errorElement:<ErrorElement />,
      children:[
        {
            path:'/',
            element:<Home/>
        }
      ]
    }
      ])

export default router;