import React, { useState } from "react";
import { Redirect } from "react-router";
import { addItemToCart, removeItemFromCart } from "./helper/cartHelper";
import ImageHelper from "./helper/ImageHelper";

const Card = ({
  product,
  addToCart = true,
  removeFromCart = false,
  setReload = (f) => f,
  reload = undefined,
}) => {
  const [redirect, setRedirect] = useState(false);
  const [count, setCount] = useState(product.count);

  const addtoCart = () => {
    addItemToCart(product, () => setRedirect(true));
  };

  const getRedirect = (redirect) => {
    if (redirect) {
      return <Redirect to="/cart" />;
    }
  };

  const name = product ? product.name : "Product name not found";
  const description = product
    ? product.description
    : "Product description not found";
  const price = product ? product.price : "Product price not found";

  const showAddToCart = (addToCart) => {
    return (
      addToCart && (
        <button
          onClick={addtoCart}
          className="btn btn-block btn-outline-success mt-2 mb-2"
        >
          Add to Cart
        </button>
      )
    );
  };

  const showRemoveFromCart = (removeFromCart) => {
    return (
      removeFromCart && (
        <button
          onClick={() => {
            removeItemFromCart(product._id);
            setReload(!reload);
          }}
          className="btn btn-block btn-outline-danger mt-2 mb-2"
        >
          Remove from cart
        </button>
      )
    );
  };

  return (
    <div className="card text-white bg-dark  border border-info ">
      <div className="card-header text-capitalize font-weight-normal lead">
        {name}
      </div>
      {getRedirect(redirect)}
      <div className="card-body">
        <ImageHelper product={product} />
        <p className="lead bg-success text-capitalize font-weight-normal text-wrap">
          {description}
        </p>
        <p className="btn btn-success rounded  btn-sm px-4">&#8377; {price}</p>
        <div className="row">
          <div className="col-12">{showAddToCart(addToCart)}</div>
          <div className="col-12">{showRemoveFromCart(removeFromCart)}</div>
        </div>
      </div>
    </div>
  );
};

export default Card;
