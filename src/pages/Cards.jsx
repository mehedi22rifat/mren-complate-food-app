import React, { useContext, useState } from "react";
import PropTypes from "prop-types"; // ES6
import { Link, useLocation, useNavigate } from "react-router-dom";
import {FaHeart} from 'react-icons/fa'
import Swal from 'sweetalert2'
import useCard from "../hooks/useCard"
import axios from "axios";
import useAuth from "../hooks/useAuth";



const Cards = ({ item }) => {
  const {_id,price,name,recipe,category,image} = item;

const [isHeartFillter,setHeartFilter] = useState(false)
const {user} = useAuth()
const navigate = useNavigate()
const location = useLocation()
const [refetch] = useCard()



// add to card
const handleAddToCard = item =>{
  // console.log(item)
  if(user && user?.email){
    const cardItem = {menuItemId:_id,name,price,recipe,quantity:1,category,email:user.email,image}
    // console.log(cardItem)
   axios.post('http://localhost:6001/cards', cardItem)
    .then(response=>{
      // console.log(response);
      Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Food added on the cart.',
          showConfirmButton: false,
          timer: 1500
        })
      refetch();
    })
    .catch(error =>{
      const errorMessage = error.response.data.message;
      // console.log(errorMessage)
      Swal.fire({
        position: 'center',
        icon: 'error',
        title:`${errorMessage}`,
        showConfirmButton: false,
        timer: 1500
      })
    })
   
  }
  else{
    Swal.fire({
      title: "Please Login!",
      text: "Without an account no not add to card!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sing Up Now!"
    }).then((result) => {
      if (result.isConfirmed) {
         navigate('/singUp',{state:{from:location}})
      }
    });
  }
}

const handleHeartClick = () =>{
    setHeartFilter(!isHeartFillter)
}

return (
    <div to={`/menu/${item._id}`} className="card shadow-xl relative mr-5 md:my-5">
      <div
        className={`rating gap-1 absolute right-2 top-2 p-4 heartStar bg-green ${
          isHeartFillter ? "text-rose-500" : "text-white"
        }`}
        onClick={handleHeartClick}
      >
        <FaHeart className="w-5 h-5 cursor-pointer" />
      </div>
      <Link to={`/menu/${item._id}`}>
        <figure>
          <img src={item.image} alt="Shoes" className="hover:scale-105 transition-all duration-300 md:h-72" />
        </figure>
      </Link>
      <div className="card-body">
       <Link to={`/menu/${item._id}`}><h2 className="card-title">{item.name}!</h2></Link>
        <p>Description of the item</p>
        <div className="card-actions justify-between items-center mt-2">
          <h5 className="font-semibold">
            <span className="text-sm text-red">$ </span> {item.price}
          </h5>
          <button className="btn bg-green text-white" onClick={() =>handleAddToCard(item)}>Add to Cart </button>
        </div>
      </div>
    </div>
  );
};

Cards.propTypes = {
  item: PropTypes.object,
};

export default Cards;
