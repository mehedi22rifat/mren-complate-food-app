/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Cards from './Cards';
import { FaAngleLeft } from "react-icons/fa";
import { FaAngleRight } from "react-icons/fa";


const SpecialDishes = () => {

const [recipes,setRecipes] =useState([])
const slider = React.useRef(null)

useEffect(() => {
  fetch("/menu.json")
    .then((res) => res.json())
    .then((data) => {
      const specials = data.filter((item) => item.category === "popular");
      // console.log(specials)
      setRecipes(specials);
    });
}, []);


// shiple next arror
const simpleNextArror = (props) =>{
  const {className,style,onClick} = props
  return(
    <div
      className={className}
      style={{...style,display:"block",background:"red"}}
      onClick={onClick}
    >
      Next
    </div>
  )
}

// simple prev arror
const simplePrevArror = (props) =>{
  const {className,style,onClick} = props;

  return(
    <div
      className={className}
      style={{...style,display:"block",background:"green"}}
      onClick={onclick}
    >
      Prev
    </div>
  )
}




  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    initialSlide: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ],
    nextArror:<simpleNextArror/>,
    prevArror:<simplePrevArror/>

  };


  

  return (
    <div className='secetion-container my-20 xl:px-24 relative'>
         <div className='text-left'>
            <p className='subtitle'>Special Dishes</p>
            <h2 className='title md:w-[520px]'>Standout Dishes Form Our Manu</h2> 
        </div>
        {/* ARROR ICON */}
        <div className='md:absolute right-3 top-8 mb-10 md:mr-24'>
          <button
          className='btn p-2 rounded-full ml-5'
          onClick={() => slider?.current?.slickPrev()}
          >
            <FaAngleLeft className='text-xl'/>
          </button>
          <button
           className='btn p-2 rounded-full ml-5 bg-green'
            onClick={() => slider?.current?.slickNext()}
          >
            <FaAngleRight className='text-xl'/>
          </button>
        </div>


        <Slider ref={slider} {...settings} className="overflow-hidden mt-10 gap-4">
     
   
        {recipes.map((item, index) => (
          <Cards className="" item={item} key={index}/>
        ))}
      
       
      </Slider>
     
     </div>
  )
}



export default SpecialDishes