/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useEffect, useState } from "react";
import { FaPaypal } from "react-icons/fa6";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from './../../hooks/useAxiosSecure';

// eslint-disable-next-line react/prop-types
const CheckoutForm = ({ price, cart }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [cardError, setCardError] = useState();
  const [clientSecret, setClientSecret] = useState("");
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();



  useEffect(() =>{
    // error fiexd
    if(typeof price !== 'number' || price<1){
      console.log('price is not a number or zeor')
      return;
    }
    axiosSecure.post(`/create-payment-intent`,{price})
    .then((res)=>{
      // console.log(res.data.clientSecret);
      setClientSecret(res.data.clientSecret)
    })
  },[price,axiosSecure])




  const handleSubmit = async (event) => {
    // Block native form submission.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    // Get a reference to a mounted CardElement. Elements knows how
    // to find your CardElement because there can only ever be one of
    // each type of element.
    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }

    // Use your card Element with other Stripe.js APIs
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.log("[error]", error);
      setCardError(error.message);
    } else {
      console.log("[PaymentMethod]", paymentMethod);
      setCardError("success");
    }

    const { paymentIntent, error:confirmError } = await stripe.confirmCardPayment(
        clientSecret,
         { 
            payment_method: {
          card: card,
          billing_details: {
            name: user?.displayName || "anonymous",
            email: user?.email || "nuknown",
          },
        },
      })
      .then(function (result) {
        // Handle result.error or result.paymentIntent
      });
  };

  return (
    <div className="flex flex-col sm:flex-row justify-center items-center gap-7">
      {/* left side div */}
      <div className="w-full md:w-1/2 space-y-3">
        <h1 className="font-bold text-lg">Order summary</h1>
        <p>Total Price: ${price}</p>
        <p>Number of Item: {cart.length}</p>
      </div>

      {/* right side div */}
      <div className="w-full md:w-1/3 space-y-3 card bg-base-100 max-w-sm shrink-0 shadow-2xl p-7">
        <h1 className="font-bold text-lg">Process Your Payment</h1>
        <p className="font-medium">Credit/Debit card</p>
        {/* payment from */}
        <form onSubmit={handleSubmit}>
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: "16px",
                  color: "#424770",
                  "::placeholder": {
                    color: "#aab7c4",
                  },
                },
                invalid: {
                  color: "#9e2146",
                },
              },
            }}
          />
          <button
            type="submit"
            disabled={!stripe}
            className="btn w-full btn-primary text-white font-bold mt-5"
          >
            Pay
          </button>
        </form>
        {cardError ? (
          <p className="text-red font-bold italic text-center">{cardError}</p>
        ) : (
          ""
        )}
        {/*  button with pay paybal */}
        <div className="text-center mt-5">
          <hr />
          <button
            type="submit"
            className="btn bg-orange-500 text-white font-bold mt-6 mb-5"
          >
            <FaPaypal /> Pay With Paypal
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutForm;
