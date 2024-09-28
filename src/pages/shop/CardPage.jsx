import React, { useContext, useState } from "react";
import useCard from "../../hooks/useCard";
import { FaTrash } from "react-icons/fa6";
import Swal from "sweetalert2";
import { AuthContext } from "../../context/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import toast, { Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";

const CardPage = () => {
  const [cart, refetch] = useCard();
  const { user } = useContext(AuthContext);
  const [cartItems, setCardItems] = useState([]);

  // total price count
  const calculateTotalPrice = (item) =>{
     return item.price * item.quantity;
  }

  // handleIncerement function
  const handleIncrease = (item) => {
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
  const handleDecrease = (item) => {
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
    return total + calculateTotalPrice(item)
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
            if (data) {
              console.log(data)
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
    <div className="max-w-screen-2xl container mx-auto xl:px-24 px-4">
      {/* banner */}
      <div className=" bg-gradient-to-r from-0% from-[#FAFAFA] to-[#FCFCFC] to-100%">
        <div className="py-28 flex flex-col items-center justify-center">
          {/* content */}
          <div className=" text-center px-4 space-y-7">
            <h2 className="md:text-5xl text-4xl font-bold md:leading-snug leading-snug">
              Items Added to The<span className="text-green"> Cart</span>
            </h2>
          </div>
        </div>
      </div>

      {/* cart table */}

      {
        (cart.length > 0) ? <div>
        <div className="">
          <div className="overflow-x-auto">
            <table className="table">
              {/* head */}
              <thead className="bg-green text-white rounded-sm">
                <tr>
                  <th>#</th>
                  <th>Food</th>
                  <th>Item Name</th>
                  <th>Quantity</th>
                  <th>Price</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                          <img
                            src={item.image}
                            alt="Avatar Tailwind CSS Component"
                          />
                        </div>
                      </div>
                    </td>
                    <td className="font-medium">{item.name}</td>
                    <td>
                      <button
                        className="btn btn-xs"
                        onClick={() => handleDecrease(item)}
                      >
                        -
                      </button>
                      <input
                        type="number"
                        value={item.quantity}
                        onChange={() => console.log(item.quantity)}
                        className="w-10 mx-2 text-center overflow-hidden appearance-none"
                      />
                      <button
                        className="btn btn-xs"
                        onClick={() => handleIncrease(item)}
                      >
                        +
                      </button>
                    </td>
                    <td>${calculateTotalPrice(item).toFixed(2)}</td>
                    <td>
                      <button
                        className="btn btn-sm border-none text-red bg-transparent"
                        onClick={() => handleDelete(item)}
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
              {/* foot */}
            </table>
          </div>
        </div>
        <hr />
        <div className="flex flex-col md:flex-row justify-between items-start my-12 gap-8">
          <div className="md:w-1/2 space-y-3">
            <h3 className="text-lg font-semibold">Customer Details</h3>
            <p>Name: {user?.displayName || "None"}</p>
            <p>Email: {user?.email}</p>
            <p>
              User_id: <span className="text-sm">{user?.uid}</span>
            </p>
          </div>
          <div className="md:w-1/2 space-y-3">
            <h3 className="text-lg font-semibold">Shopping Details</h3>
            <p>Total Items: {cart.length}</p>
            <p>
              Total Price:{" "}
              <span id="total-price">${orderTotal.toFixed(2)}</span>
            </p>
            <button className="btn btn-md bg-green text-white px-8 py-1">
              Procceed to Checkout
            </button>
          </div>
        </div>
      </div> : <div className="text-center my-28">
        <p>Cart is empty. Please add products.</p>
        <Link to="/menu"><button className="btn bg-green text-white mt-3">Back to Menu</button></Link>
      </div>
      }
      
    </div>
  );
};

export default CardPage;
