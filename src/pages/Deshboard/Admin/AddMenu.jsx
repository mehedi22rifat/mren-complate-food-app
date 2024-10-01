import { useForm } from "react-hook-form";
import { FaUtensils } from "react-icons/fa";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const AddMenu = () => {
  
    const { register, handleSubmit, reset } = useForm();
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();

    // image hosting key
    const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
    // // image hosting api 
    const image_hosting_api = `https://api.imgbb.com/1/upload?expiration=600&key=${image_hosting_key}`
  
  
  
    const onSubmit  = async (data) => {

      const imageFile = {image: data.image[0]};
      const hostingImage = await axiosPublic.post(image_hosting_api,imageFile,{
        headers:{
          "content-type":"multipart/form-data"
        }

      })
      //  console.log(hostingImage.data)

      if(hostingImage.data.success){
        const menuItem = {
          name:data.name,
          category:data.category,
          price:parseFloat(data.price),
          recipe:data.recipe,
          image: hostingImage.data.data.display_url
        }

        // console.log(menuItem)
        const postMenuItem = await axiosSecure.post('/menu', menuItem);
        if(postMenuItem){
          reset();
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Item add successfully!",
            showConfirmButton: false,
            timer: 1500
          });

        }

      }

   }



  return (
    <div className="w-full md:w-[870px] px-4 mx-auto">
      <h2 className="text-2xl font-semibold my-4">
        Upload A New <span className="text-green">Menu Item</span>
      </h2>

      {/* from here */}

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text">Recipe Name*</span>
          </label>
          <input
            type="text"
            {...register("name", { required: true })}
            placeholder="Recipe Name"
            className="input input-bordered w-full"
          />
        </div>

        {/* 2nd row */}
        <div className="flex lg:flex-row flex-col items-center gap-4">
          {/* categories */}
          <div className="form-control w-full my-5">
            <label className="label">
              <span className="label-text">Category*</span>
            </label>
            <select
              {...register("category", { required: true })}
              className="select select-bordered"
              defaultValue="default"
            >
              <option disabled value="default">
                Select a category
              </option>
              <option value="salad">Salad</option>
              <option value="pizza">Pizza</option>
              <option value="soup">Soup</option>
              <option value="dessert">dessert</option>
              <option value="drinks">Drinks</option>
              <option value="popular">Popular</option>
            </select>
          </div>

          {/* prices */}
          <div className="form-control w-full my-4">
            <label className="label">
              <span className="label-text">Price*</span>
            </label>
            <input
              type="number"
              {...register("price", { required: true })}
              placeholder="Price"
              className="input input-bordered w-full"
            />
          </div>
        </div>

        {/* 3rd row */}
        <div className="form-control my-4">
          <label className="label">
            <span className="label-text">Recipe Details</span>
          </label>
          <textarea
            {...register("recipe", { required: true })}
            className="textarea textarea-bordered h-24"
            placeholder="Tell the worlds about your recipe"
          ></textarea>
        </div>

        {/* 4th row */}
        <div className="form-control max-w-md border rounded-md my-6">
          <input
            {...register("image", { required: true })}
            type="file"
            className="file-input w-full max-w-md border"
          />
        </div>

        <button className="btn bg-green text-white px-6">
          Add Item <FaUtensils />
        </button>
      </form>
    </div>
  );
};

export default AddMenu;
