import React from 'react'
import CheckoutForm from './CheckoutForm'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js';
import useCard from '../../hooks/useCard';




const stripePromise = loadStripe(import.meta.env.VITE_spripe_pk);
const Payment = () => {

    const [cart] = useCard();

    // calclute total price
    const totalPrice = cart.reduce((sum,item) => sum+ item.quantity * item.price,0)
    const totalCartPrice = parseFloat(totalPrice.toFixed(2))


  return (
    <div className='secetion-container min-h-screen my-32'>
        {/* <h1 className='text-2xl font-bold text-green text-center'>Payment chekout</h1> */}
       <Elements stripe={stripePromise}>
           <CheckoutForm price={totalCartPrice} cart={cart}/>
      </Elements>
  </div>
  )
}

export default Payment