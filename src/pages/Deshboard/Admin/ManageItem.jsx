import useMenu from "../../../hooks/useMenu"
import { Link } from 'react-router-dom';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useState } from "react";


const ManageItem = () => {
   
  const [menu,loading,refetch] = useMenu();
  //  console.log(menu)

   const axiosSecure = useAxiosSecure()
  //  pagaination
  const [items, setItems] = useState([]); // State to store the JSON data
  const [currentPage, setCurrentPage] = useState(0); // Pagination state
  const itemsPerPage = 10; // Number of items per page

  console.log(menu)
   // Calculate the start and end index based on the current page
   const startIndex = currentPage * itemsPerPage;
   const endIndex = startIndex + itemsPerPage;

    // Get the items for the current page
  const currentItems = menu.slice(startIndex, endIndex);

  // Function to go to the next page
  const handleNext = () => {
    if ((currentPage + 1) * itemsPerPage < menu.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Function to go to the previous page
  const handlePrev = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };


//  handleDelete item
 const handleDeleteItem = (item) =>{
    //  console.log(item._id)
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then( async (result) => {
      if (result.isConfirmed) {
        const res = await axiosSecure.delete(`/menu/${item._id}`)
        if(res){
          refetch();
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success"
          });
        }
      }
    });
 }


  return (
    <div className="w-full md:w-[870px] px-4 mx-auto">
    <h2 className="text-2xl font-semibold my-4">
      Manage All <span className="text-green">Menu Items</span>
    </h2>
    {/* menu item table */}
    <div>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Image</th>
              <th>Item Name</th>
              <th>Price</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
           {
             currentItems.map((item, index) => (
              <tr key={index}>
                <th>{index + 1}</th>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img src={item.image} alt="" />
                      </div>
                    </div>
                  </div>
                </td>
                <td>{item.name}</td>
                <td>${item.price}</td>
                <td>
                  <Link to={`/deshboard/update-menu/${item._id}`}>
                    <button className="btn btn-ghost btn-xs bg-orange-500 text-white">
                      <FaEdit />
                    </button>
                  </Link>
                </td>
                <td>
                  <button
                    onClick={() => handleDeleteItem(item)}
                    className="btn btn-ghost btn-xs text-red"
                  >
                    <FaTrashAlt />
                  </button>
                </td>
              </tr>
             ))
           }
           {/* <div className="grid grid-cols-1 gap-3 w-1/2 text-center mb-5">
        {currentItems.map((item) => (
          <div key={item._id} className="p-4 bg-gray-100 rounded-md shadow-md">
            {item.name}
          </div>
        ))}
      </div> */}
          </tbody>
        </table>
      </div>
    </div>
{/*                  */}
    <div>
    <div className="flex flex-col items-center py-10">

      <div className="flex space-x-4">
        <button
          onClick={handlePrev}
          disabled={currentPage === 0}
          className={`px-4 py-2 bg-green text-white font-semibold rounded-md transition ${
            currentPage === 0 ? 'opacity-50 cursor-not-allowed' : 'bg-green'
          }`}
        >
          Prev
        </button>
        <button
          onClick={handleNext}
          disabled={(currentPage + 1) * itemsPerPage >= menu.length}
          className={`px-4 py-2 bg-green text-white font-semibold rounded-md transition ${
            (currentPage + 1) * itemsPerPage >= menu.length
              ? 'opacity-50 cursor-not-allowed'
              : 'hover:bg-green'
          }`}
        >
          Next
        </button>
      </div>
    </div>

    </div>
  </div>


  )
}

export default ManageItem