import { FaFacebookF, FaGithub, FaGoogle } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form"
import {useState } from "react";
import toast, { Toaster } from 'react-hot-toast';
import axios from "axios";
import useAxiosPublic from "../hooks/useAxiosPublic";
import useAuth from "../hooks/useAuth";

const Login = () => {

    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm()

    const {singUpWithGmail,loginUser} = useAuth();
    const [errorsMessage,setErrprsMessage] = useState('')

    // location
    const location = useLocation()
    const navigate = useNavigate()
    const from = location.state?.from?.pathname || "/";
    const axiosPublic = useAxiosPublic();

    
      const onSubmit = (data) => {
        const email = data.email;
        const password = data.password;
        // console.log(email,password)
        loginUser(email,password)
        .then(result =>{
            const user = result.user;
            console.log(user)
            const userInfo ={
              name:data.name,
              email:data.email,
            }
            axiosPublic.post('/users',userInfo)
            .then((response) => {
              // console.log(response);
              toast.success("Creat User Successfull!");
              navigate(from, { replace: true });
            });
        })
        .catch(error =>{
            const errorsMessage = error.message;
            toast.error(errorsMessage)
            setErrprsMessage("Provide a correct email and password!")
        })
      }



    //   google login
    const handleLogin = () => {
        singUpWithGmail()
        .then((result) => {
          const user = result.user;
          // console.log(user)
          const userInfo = {
            name:result?.user?.displayName,
            email:result?.user?.email
          }
          axiosPublic.post('/users',userInfo)
          .then((response) =>{
           toast.success('Login successfull!')
           document.getElementById('my_modal_3').close();
           navigate(from,{replace:true})
          })
        })
        .catch((error) => {
            toast.error(error)
            console.log(error)
        })
        
      }


  return (
    <div>
      <dialog id="my_modal_3" className="modal modal-middle mt-0">
        <div className=" modal-box">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
            <form onSubmit={handleSubmit(onSubmit)} className="card-body" method="dialog">
                <h1 className="font-bold text-lg text-center">Please Login!</h1>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                {/* email */}
                <input
                  type="email"
                  placeholder="email"
                  className="input input-bordered"
                  {...register("email")}
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                {/* password */}
                <input
                  type="password"
                  placeholder="password"
                  className="input input-bordered"
                  {...register("password")}
                />
                <label className="label mt-1">
                  <a href="#" className="label-text-alt link link-hover">
                    Forgot password?
                  </a>
                </label>
              </div>
              <div className="form-control mt-6">
                <input type="submit" value={'Login'}  className="btn bg-green text-white font-bold"/>
              </div>
              <p className="text-center my-2">
              Donot have an account?{" "}
              <Link to="/singUp" className="underline text-red ml-1">
                Signup Now
              </Link>{" "}
            </p>

              {
                errorsMessage ? <p className="text-red font-bold text-center italic">{errorsMessage}</p> : ""
              }
            </form>
            {/* sing in with social account */}
            <div className="text-center space-x-3 mb-5">
            <button onClick={handleLogin} className="btn btn-circle hover:bg-green hover:text-white">
              <FaGoogle />
            </button>
            <button className="btn btn-circle hover:bg-green hover:text-white">
              <FaFacebookF />
            </button>
            <button className="btn btn-circle hover:bg-green hover:text-white">
            <FaGithub />
            </button>
          </div>
        </div>
      </dialog>
      <Toaster />
    </div>
  );
};

export default Login;
