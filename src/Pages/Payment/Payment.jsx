import React, { useContext, useState } from 'react';
import LayOut from '../../Components/LayOut/LayOut';
import classes from './Payment.module.css';
import { DataContext } from '../../Components/DataProvider/DataProvider';
import ProductCard from '../../Components/Product/ProductCard';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import CurrencyFormat from '../../Components/CurrencyFormat/CurrencyFormat';
import { axiosInstance } from '../../Api/axios';
import ClipLoader from 'react-spinners/ClipLoader'; 
import {db} from "../../Utility/firebase"
import { useNavigate } from 'react-router-dom';
import { Type } from '../../Utility/action.type';




function Payment() {
  const [{ user, basket }, dispatch] = useContext(DataContext);
  const totalItem = basket?.reduce((amount, item) => item.amount + amount, 0);

  const [cardError, setCardError] = useState(null);
  const [processing, setProcessing] = useState(false);


  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate()

  const handleChange = (e) => {
    e.error?.message ? setCardError(e.error.message) : setCardError("");
  };

  const total = basket?.reduce((total, item) => total + item.price * item.amount, 0); // Calculate total

  const handlePayment = async (e) => {
    e.preventDefault();

    try {
        setProcessing(true);
        const response = await axiosInstance({
            method: "POST",
            url: `/payment/create?total=${total * 100}`, // Use the calculated total
        });

        console.log(response.data);
        const clientSecret = response.data?.clientSecret;

        // Confirm the payment on the client side
        const confirmation = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement),
            },
        });

        // Check if payment was successful
        if (confirmation.error) {
            setCardError(confirmation.error.message);
            setProcessing(false);
            return; // Exit if there was an error
        }

        const paymentIntent = confirmation.paymentIntent; // Get paymentIntent from confirmation

        // Store order details in Firestore
        await db
            .collection("users")
            .doc(user.uid)
            .collection("orders")
            .doc(paymentIntent.id) // Use the ID of the paymentIntent for the document
            .set({
                basket: basket,
                amount: paymentIntent.amount,
                created: paymentIntent.created,
            });
            // empty the cart or basket
            dispatch({type:Type.EMPTY_BASKET})

        setProcessing(false);
        navigate("/orders",{state: {msg:"You have place a new Order !"}})
    } catch (error) {
        console.log(error);
        setProcessing(false);
    }
};


  return (
    <LayOut>
      <div className={classes.payment_header}>Checkout ({totalItem}) items</div>
      <section className={classes.payment}>
        <div className={classes.flex}>
          <h3>Delivery Address</h3>
          <div>
            <div>{user?.email}</div>
            <div>123 Main St</div>
            <div>Nashville, TN</div>
          </div>
        </div>
        <hr />

        <div className={classes.flex}>
          <h3>Review items and delivery</h3>
          <div>
            {basket?.map((item) => (
              <ProductCard key={item.id} product={item} flex={true} /> // Add key prop for list
            ))}
          </div>
        </div>
        <hr />

        <div className={classes.flex}>
          <h3>Payment methods</h3>
          <div className={classes.payment_card_container}>
            <div className={classes.payment_details}>
              <form onSubmit={handlePayment}>
                {cardError && <small style={{ color: "red" }}>{cardError}</small>}
                <CardElement onChange={handleChange} />

                <div className={classes.payment_price}>
                  <div>
                    <span style={{ display: "flex", gap: "10px" }}>
                      <p>Total Order |</p> <CurrencyFormat amount={total} />
                    </span>
                  </div>
                  <button type="submit" disabled={processing}>
                    {processing ? (
                      <div className={classes.loading}>
                        <ClipLoader color="gray" size={12} />
                        <p>Please wait ... </p>
                      </div>
                    ) : "Pay Now"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </LayOut>
  );
}

export default Payment;
