import React, { useEffect, useState } from "react";
import { API } from "../backend";
import "../styles.css";
import Base from "./Base";
import Card from "./Card";
import { loadCart } from "./helper/cartHelper";
import StripeCheckout from "./StripeCheckout";

const Cart = () => {
  const [products, setProducts] = useState([]);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    setProducts(loadCart());
  }, [reload]);

  const loadCartProduct = () => {
    return (
      <div>
        <h2>Cart</h2>
        <div className="row">
          {products.map((product, index) => (
            <div key={index} className="col-6 mb-4">
              <Card
                key={index}
                product={product}
                addToCart={false}
                removeFromCart={true}
                reload={reload}
                setReload={setReload}
              />
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <Base title="Cart Page" description="Ready to checkout">
      <div className="row text-center">
        <div className="col-6">{loadCartProduct()}</div>
        <div className="col-6">
          <StripeCheckout
            products={products}
            reload={reload}
            setReload={setReload}
          />
        </div>
      </div>
    </Base>
  );
};

export default Cart;
