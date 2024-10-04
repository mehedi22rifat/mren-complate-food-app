import React from 'react'
import useAuth from '../../hooks/useAuth'
import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import { FaTrash } from 'react-icons/fa6'

export default function Order() {


    const {user} = useAuth()
    // console.log(user)
    const token = localStorage.getItem('access-token')

    const {refetch,data:orders = []} = useQuery({
        queryKey: ['orders', user?.email],
        queryFn: async () => {
            const res = await fetch(`http://localhost:6001/payments?email=${user?.email}`,{
              // for token
              headers:{
                authorization:`Bearer ${token}`
              }
            })
            return res.json()
          },
    })

    console.log(orders)

  const formateDate = (createdAt)=>{
      const createdDate = new Date(createdAt);
      return createdDate.toLocaleDateString()
  }





   return (
    <div className="max-w-screen-2xl container my-20 mx-auto xl:px-24 px-4">
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

      {/* table */}

      {
        (orders.length > 0 ) ? <div className="">
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead className="bg-green text-white rounded-sm">
              <tr>
                <th>#</th>
                <th>Order Data</th>
                <th>TransitionId</th>
                <th>price</th>
                <th>stasus</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>
                    {formateDate(item.createdAt)}
                  </td>
                  <td className="font-medium">{item.transactionId}</td>
                  <td>
                   ${item.price}
                  </td>
                  <td>{item.status}</td>
                  <td>
                    
                   <h1 className=' text-orange-600'>Contact</h1>
                  </td>
                </tr>
              ))}
            </tbody>
            {/* foot */}
          </table>
        </div>
      </div> : <div className="text-center my-28">
        <p>Order is empty. Please add products.</p>
        <Link to="/menu"><button className="btn bg-green text-white mt-3">Back to Menu</button></Link>
      </div>
      }

     </div>
   )
}
