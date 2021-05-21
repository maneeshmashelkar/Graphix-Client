import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { isAuthenticate } from "../auth/helper";
import Base from "../core/Base";
import { getOrder, updateStatus } from "./helper/adminapicall";

const UpdateOrder = ({ match }) => {
  const [values, setValues] = useState({
    status: "",
    products: [],
    error: "",
    success: false,
  });

  const { status, products, error, success } = values;

  const { user, token } = isAuthenticate();

  const statusArr = [
    "Cancelled",
    "Delivered",
    "Shipped",
    "Processing",
    "Recieved",
  ];

  const preload = (orderId) => {
    getOrder(orderId).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          status: data.status,
          products: data.products,
        });
      }
    });
  };

  useEffect(() => {
    preload(match.params.orderId);
  }, []);

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: "" });

    const orderData = {
      orderId: match.params.orderId,
      status: status,
    };

    updateStatus(match.params.orderId, user._id, token, orderData).then(
      (data) => {
        if (data.error) {
          setValues({ ...values, error: data.error });
          console.log(data.error);
        } else {
          setValues({
            ...values,
            error: false,
            success: true,
          });
        }
      }
    );
  };

  const updateOrderForm = () => (
    <form className="bg-dark rounded">
      <div className="form-group">
        <div className="row text-white text-center text-warning">
          <div className="col-4">
            <h4>ProductId</h4>
          </div>
          <div className="col-4">
            <h4>ProductName</h4>
          </div>
          <div className="col-4">
            <h4>ProductPrice</h4>
          </div>
        </div>
        {products &&
          products.map((prod, index) => (
            <div className="row text-center mb-2" key={index}>
              <div className="col-4">
                <h4 className="text-white ">{prod._id}</h4>
              </div>
              <div className="col-4">
                <h4 className="text-white ">{prod.name}</h4>
              </div>
              <div className="col-4">
                <h4 className="text-white">{prod.price}</h4>
              </div>
            </div>
          ))}
      </div>
      <div className="form-group  m-4">
        <select
          onChange={handleChange("status")}
          className="form-control"
          placeholder="Status"
          value={status}
        >
          {statusArr.map((statusName, index) => {
            return (
              <option value={statusName} key={index}>
                {statusName}
              </option>
            );
          })}
        </select>
      </div>
      <button
        type="submit"
        onClick={onSubmit}
        className="btn btn-outline-success mb-4 ml-3 rounded"
      >
        Update Order Status
      </button>
    </form>
  );

  const successMessage = () => {
    // performRedirect();
    return (
      <div
        className="alert alert-success mt-3"
        style={{ display: success ? "" : "none" }}
      >
        <h4>Order status updated succesfully</h4>
      </div>
    );
  };

  const errorMessage = () => {
    return (
      <div
        className="alert alert-danger mt-3"
        style={{ display: error ? "" : "none" }}
      >
        <h4>Failed to update order status</h4>
      </div>
    );
  };

  return (
    <Base
      title="Update Order Here"
      description="Update The Order Status"
      className="container bg-info rounded p-4"
    >
      <Link
        className="btn btn-warning rounded mb-3 rounded"
        to={`/admin/orders`}
      >
        <span>Manage Order</span>
      </Link>
      {successMessage()}
      {errorMessage()}
      {updateOrderForm()}
    </Base>
  );
};

export default UpdateOrder;
