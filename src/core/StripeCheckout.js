import React, { useState } from "react";
import { Link } from "react-router-dom";
import { isAuthenticate } from "../auth/helper";
import StripeCheckoutButton from "react-stripe-checkout";
import { API } from "../backend";
import { emptyCart } from "./helper/cartHelper";
import { createOrder } from "./helper/orderHelper";

const StripeCheckout = ({
  products,
  setReload = (f) => f,
  reload = undefined,
}) => {
  const [data, setData] = useState({
    error: false,
    success: false,
  });

  const { error, success } = data;

  const userId = isAuthenticate() && isAuthenticate().user._id;
  const atoken = isAuthenticate() && isAuthenticate().token;

  const getTotalAmount = () => {
    let amount = 0;
    products.map((product) => {
      amount += product.price;
    });
    return amount;
  };

  const makePayment = (token) => {
    const body = {
      token,
      products,
    };

    const headers = {
      Accept:"application/json",
      "Content-Type":"application/json",
    };

    return fetch(`${API}/stripepayment`, {
      method: "POST",
      headers,
      body: JSON.stringify(body),
    })
      .then((response) => {
        console.log("RESPONSE:",response);

        const orderData = {
          products: products,
          transaction_id: response.id,
          amount: getTotalAmount(),          
        };
        console.log(orderData);
        createOrder(userId, atoken, orderData);

        emptyCart(() => {
          console.log("all ok");
        });

        setData({ error: false, success: true });

        setReload(!reload);
      })
      .catch((error) => {
        console.log(error);
        setData({ error: true, success: false });
      });
  };

  const successMessage = () => {
    return (
      <div className="row">
        <div className="col-6 mt-5 offset-sm-3 text-center">
          <div
            className="alert alert-success"
            style={{ display: success ? "" : "none" }}
          >
            Payment Successfull
          </div>
        </div>
      </div>
    );
  };

  const errorMessage = () => {
    return (
      <div className="row">
        <div className="col-6 mt-5 offset-sm-3 text-center">
          <div
            className="alert alert-danger"
            style={{ display: error ? "" : "none" }}
          >
            Payment Failed
          </div>
        </div>
      </div>
    );
  };

  const showPayButton = () => {
    return isAuthenticate() ? (
      <StripeCheckoutButton
        amount={getTotalAmount() * 100}
        shippingAddress
        billingAddress
        currency="INR"
        stripeKey={process.env.REACT_APP_STRIPEKEY}
        token={makePayment}
        name="Graphix"
      >
        <button className="btn btn-success rounded">Pay with stripe</button>
        {successMessage()}
        {errorMessage()}
      </StripeCheckoutButton>
    ) : (
      <Link to="/signin" className="btn btn-warning rounded ">
        Sign-In
      </Link>
    );
  };

  return (
    <div>
      <h2 className="mb-5">Stripe Checkout </h2>
      <h3 className="mb-3">Total amount: &#8377;{getTotalAmount()}</h3>
      {showPayButton()}
    </div>
  );
};

export default StripeCheckout;
