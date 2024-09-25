import React, { useContext, useState } from "react";
import useCard from "../../hooks/useCard";
import { FaTrash } from "react-icons/fa6";
import Swal from "sweetalert2";
import { AuthContext } from "../../context/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import toast, { Toaster } from "react-hot-toast";

const CardPage = () => {
  const [cart, refetch] = useCard();
  const { user } = useContext(AuthContext);
  const [cartItems, setCardItems] = useState([]);

  // total price count
  const handlePriceCount = (item) =>{
     return item.price * item.quantity;
  }

  // handleIncerement function
  const handleIncress = (item) => {
    fetch(`http://localhost:6001/cards/${item._id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify({ quantity: item.quantity + 1 }),
    })
      .then((res) => res.json())
      .then((data) => {
        const updatedCard = cartItems.map((itemCart) => {
          if (itemCart._id === item._id) {
            return {
              ...itemCart,
              quantity: itemCart + 1,
            };
          }
          return itemCart;
        });
        refetch();
        setCardItems(updatedCard);
      });
      refetch()
  };

  // handleDecress Function
  const handleDecress = (item) => {
    if(item.quantity > 1){
      fetch(`http://localhost:6001/cards/${item._id}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify({ quantity: item.quantity - 1 }),
      })
        .then((res) => res.json())
        .then((data) => {
          const updatedCard = cartItems.map((itemCart) => {
            if (itemCart._id === item._id) {
              return {
                ...itemCart,
                quantity: itemCart - 1,
              };
            }
            return itemCart;
          });
          refetch();
          setCardItems(updatedCard);
        });
        refetch()
    }
    else{
      toast.error("Item can't be zero" )
    }
  };


  // calclute the total price
  const subTotalPrice = cart.reduce((total,item) =>{
    return total + handlePriceCount(item)
  },0)
  const orderTotal= subTotalPrice;

  // delete ta item in card page
  const handleDelete = (item) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:6001/cards/${item._id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              refetch();
              Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success",
              });
            }
          });
      }
    });
  };

  return (
    <div className="">
      <div className=" secetion-container bg-gradient-to-r from-0% from-[#FAFAFA] to-[#FCFCFC] to-100%">
        <div className="py-36 flex flex-col items-center justify-between gap-8">
          {/* img */}
          {/* texts */}
          <div className="md:w-full text-center px-4 space-y-7">
            <h2 className="md:text-5xl text-4xl font-bold md:leading-snug leading-snug">
              Item Added To The <span className="text-green">Food</span>
            </h2>
          </div>
        </div>
      </div>

      {/* table */}
      <div className="secetion-container">
        <div className="overflow-x-auto">
          <table className="table mb-10">
            {/* head */}
            <thead className="bg-green text-white">
              <tr>
                <th>#</th>
                <th>Food</th>
                <th>Item Name</th>
                <th>Quentity</th>
                <th>Price</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {cart.map((item, index) => (
                <tr key={index}>
                  <th>
                    <label>
                      <h1>{index + 1}</h1>
                    </label>
                  </th>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle h-12 w-12">
                          <img
                            src={item.image}
                            alt="Avatar Tailwind CSS Component"
                          />
                        </div>
                      </div>
                      <div></div>
                    </div>
                  </td>
                  <td>
                    {item.name}
                    <br />
                  </td>
                  <td>
                    <button
                      onClick={() => handleDecress(item)}
                      className="btn btn-xs font-bold"
                    >
                      -
                    </button>
                    <input
                      type="number"
                      value={item.quantity}
                      className="text-center font-bold w-10 mx-2 overflow-hidden appearance-none"
                    />
                    <button
                      onClick={() => handleIncress(item)}
                      className="btn btn-xs font-bold"
                    >
                      +
                    </button>
                  </td>
                  <td>${handlePriceCount(item).toFixed(2)}</td>
                  <th>
                    <button
                      onClick={() => handleDelete(item)}
                      className="btn btn-ghost btn-xs text-red font-bold text-lg"
                    >
                      <FaTrash />{" "}
                    </button>
                  </th>
                </tr>
              ))}
            </tbody>
            {/* foot */}
          </table>
        </div>

        <div className="my-12 flex flex-col md:flex-row gap-10 justify-between items-start">
          <div className="md:w-1/2 space-y-3">
            <h1 className="text-lg font-bold">Customar Details</h1>
            <p>
              <span className="font-bold">Name:</span> {user.displayName}
            </p>
            <p>
              <span className="font-bold">Email:</span> {user.email}
            </p>
            <p>
              <span className="font-bold">User_id:</span> {user.uid}
            </p>
          </div>
          <div className="md:w-1/2 space-y-3">
            <h1 className="text-lg font-bold">Shoping Details</h1>
            <p>
              <span className="font-bold">Total Item:</span> {cart.length}
            </p>
            <p>
              <span className="font-bold">Total Price:</span> ${orderTotal.toFixed(2)}
            </p>
            <button className="btn bg-green text-white font-bold">
              Procceed ChekOut
            </button>
          </div>
        </div>
      </div>
      <Toaster/>
    </div>
  );
};

export default CardPage;
