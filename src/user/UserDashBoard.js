import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { isAuthenticate } from "../auth/helper";
import Base from "../core/Base";
import { getUser } from "./helper/userapicalls";

const UserDashBoard = () => {
  const [userdata, setUserdata] = useState({});
  const [purchases, setPurchases] = useState([]);

  const { user, token } = isAuthenticate();

  const preload = () => {
    getUser(user._id, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setUserdata(data);
        setPurchases(data.purchases);
      }
    });
  };

  useEffect(() => {
    preload();
  }, []);

  const userDetail = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left ">
          <form>
            <div className="form-group">
              <label className="text-light">Name:</label>
              <input
                type="text"
                className="form-control"
                value={userdata.name}
                readOnly
              />
            </div>
            <div className="form-group">
              <label className="text-light">LastName:</label>
              <input
                type="text"
                className="form-control"
                value={userdata.lastname}
                readOnly
              />
            </div>
            <div className="form-group">
              <label className="text-light">Email:</label>
              <input
                type="text"
                className="form-control"
                value={userdata.email}
                readOnly
              />
            </div>
            <div className="form-group">
              <label className="text-light">UserInfo:</label>
              <input
                type="text"
                className="form-control"
                value={userdata.userinfo}
                readOnly
              />
            </div>
            <div className="form-group">
              <label className="text-light">Product Purchases:</label>
              {purchases.length === 0 ? (
                <input
                  type="text"
                  className="form-control"
                  value="Empty Purchase List"
                  readOnly
                />
              ) : (
                purchases.map((prod, index) => (
                  <input
                    type="text"
                    key={index}
                    className="form-control"
                    value={prod.name}
                    readOnly
                  />
                ))
              )}
            </div>
          </form>
        </div>
      </div>
    );
  };

  return (
    <Base
      title="Welcome to User Dashboard"
      description="Manage your account here!"
      className="container bg-success rounded p-4"
    >
      <Link className="btn btn-warning rounded mb-3" to={`/`}>
        <span>Home</span>
      </Link>
      <Link
        className="btn btn-warning rounded mb-3 float-right"
        to={`/user/update`}
      >
        <span>Update User</span>
      </Link>
      <div className="row">
        <div className="col-12 bg-dark">{userDetail()}</div>
      </div>
    </Base>
  );
};

export default UserDashBoard;
