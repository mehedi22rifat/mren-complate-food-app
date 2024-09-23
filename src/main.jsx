
import { createRoot } from 'react-dom/client'
import './index.css'
import {
  RouterProvider,
} from "react-router-dom";
import router from './router/Router';
import AuthProvider from './context/AuthProvider';

createRoot(document.getElementById('root')).render(
 <AuthProvider>
   <RouterProvider router={router} />
 </AuthProvider>
)
