import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { isAuthenticate } from "../auth/helper";
import Base from "../core/Base";
import {getOrders} from "./helper/adminapicall";

const ManageOrders = () => {
  const [orders, setOrders] = useState([]);

  const { user, token } = isAuthenticate();

  const preload = () => {
    getOrders(user).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setOrders(data);
      }
    });
  };
 
  useEffect(() => {
    preload();
  }, []);

  return (
    <Base
      title="Welcome admin"
      description="Manage Orders here"
      className="container bg-info rounded p-4"
    >
      <Link className="btn btn-warning rounded mb-3" to={`/admin/dashboard`}>
        <span>Admin Home</span>
      </Link>
      <h2 className="mb-4">All orders:</h2>
      <div className="row  bg-dark rounded">
        <div className="col-12">
          <h2 className="text-center text-white my-3">
            Total {orders.length} Orders
          </h2>
          <div className="row text-white text-center text-warning">
              <div className="col-3"><h4>UserId</h4></div>
              <div className="col-3"><h4>UserName</h4></div>
              <div className="col-3"><h4>OrderStatus</h4></div>
              <div className="col-3"><h4>UpdateStatus</h4></div>
          </div>
          {orders.map((order, index) => {
            
            return (
              <div key={index} className="row text-center mb-2 ">
                <div className="col-3">
                  <h4 className="text-white ">{order.user._id}</h4>
                </div>
                <div className="col-3">
                <h4 className="text-white">{order.user.name}</h4>
                </div>
                <div className="col-3">
                <h4 className="text-white">{order.status}</h4>
                </div>
                <div className="col-3">
                  <Link
                    className="btn btn-success rounded"
                    to={`/admin/order/update/${order._id}`}
                  >
                    <span>Update</span>
                  </Link>
                </div>
               
              </div>
            );
          })}
        </div>
      </div>
    </Base>
  );
};

export default ManageOrders;
