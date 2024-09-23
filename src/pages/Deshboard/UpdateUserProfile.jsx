import { useContext } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../context/AuthProvider";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";



const UpdateUserProfile = () => {

    const {userProfileUpdate} = useContext(AuthContext)

    const location = useLocation()
    const navigate = useNavigate()
    const from = location.state?.from?.pathname || "/";

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
      } = useForm();

      const onSubmit = (data) => {
        const name = data.name;
        const photoURL = data.photoURL;
        // console.log(name,photoURL)
        userProfileUpdate(name,photoURL)
        .then(() =>{
            toast.success('update profile success full')
            navigate(from,{replace:true})
        }) 
        .catch((error) =>{
            // some text here
            console.log(error)
        })
      }




  return (
    <div className='flex items-center justify-center h-screen'>
    <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
  <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
    <h3 className='font-bold'>Update Your Profile</h3>
    <div className="form-control">
      <label className="label">
        <span className="label-text">Name</span>
      </label>
      <input {...register("name")} type="text" placeholder="your name" className="input input-bordered" required />
    </div>
    <div className="form-control">
      <label className="label">
        <span className="label-text">Upload Photo</span>
      </label>

      <input type="text" {...register("photoURL")} placeholder="photoURL" className="input input-bordered" required />
      
      {/* TODO: Uplodaing image will be later */}
      {/* <input type="file" className="file-input w-full max-w-xs" /> */}
    </div>
    <div className="form-control mt-6">
      <button className="btn bg-green text-white">Update</button>
    </div>
  </form>
</div>
</div>
  )
}

export default UpdateUserProfile