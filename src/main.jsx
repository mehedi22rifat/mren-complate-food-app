
import { createRoot } from 'react-dom/client'
import './index.css'
import {
  RouterProvider,
} from "react-router-dom";
import router from './router/Router';
import AuthProvider from './context/AuthProvider';


// tanstack query
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
// import { getTodos, postTodo } from '../my-api'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(
 <AuthProvider>
    <QueryClientProvider client={queryClient}>
    <RouterProvider router={router} />
    </QueryClientProvider>
 </AuthProvider>
)
