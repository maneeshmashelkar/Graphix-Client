import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { isAuthenticate } from "../auth/helper";
import Base from "../core/Base";
import { getUser, updateUser } from "./helper/userapicalls";

const UpdateUser = () => {
  const [values, setValues] = useState({
    name: "",
    lastname: "",
    email: "",
    userinfo: "",
    error: "",
    success: false,
  });

  const { user, token } = isAuthenticate();

  const { name, email, lastname, userinfo, error, success } = values;

  const preload = () => {
    getUser(user._id, token).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
        console.log(data.error);
      } else {
        setValues({
          ...values,
          name: data.name,
          lastname: data.lastname,
          email: data.email,
          userinfo: data.userinfo,
        });
      }
    });
  };

  useEffect(() => {
    preload();
  }, []);

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false });

    const userData = {
      name: name,
      lastname: lastname,
      email: email,
      userinfo: userinfo,
    };

    updateUser(user._id, token, userData)
      .then((data) => {
        if (data.error) {
          setValues({ ...values, error: data.error, success: false });
        } else {
          setValues({
            ...values,
            error: false,
            success: true,
          });
        }
      })
      
  };

  const userDetail = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left ">
          <form>
            <div className="form-group">
              <label className="text-light">Name:</label>
              <input
                type="text"
                onChange={handleChange("name")}
                className="form-control"
                value={name}
              />
            </div>
            <div className="form-group">
              <label className="text-light">LastName:</label>
              <input
                type="text"
                className="form-control"
                onChange={handleChange("lastname")}
                value={lastname}
              />
            </div>
            <div className="form-group">
              <label className="text-light">Email:</label>
              <input
                type="text"
                className="form-control"
                onChange={handleChange("email")}
                value={email}
              />
            </div>
            <div className="form-group">
              <label className="text-light">UserInfo:</label>
              <input
                type="text"
                className="form-control"
                onChange={handleChange("userinfo")}
                value={userinfo}
              />
            </div>
            <button
              type="submit"
              onClick={onSubmit}
              className="btn btn-outline-success my-4  rounded"
            >
              Update User
            </button>
          </form>
        </div>
      </div>
    );
  };

  const successMessage = () => {
    return (
      <div
        className="alert alert-success mt-3 text-center"
        style={{ display: success ? "" : "none" }}
      >
        <h4>User updated succesfully</h4>
      </div>
    );
  };

  const errorMessage = () => {
    return (
      <div
        className="alert alert-danger mt-3 text-center"
        style={{ display: error ? "" : "none" }}
      >
        <h4>Failed to update User</h4>
      </div>
    );
  };

  return (
    <Base
      title="Welcome to User Dashboard"
      description="Manage your account here!"
      className="container bg-success rounded p-4"
    >
      <Link className="btn btn-warning rounded mb-3" to={`/user/dashboard`}>
        <span>User Dashboard</span>
      </Link>

      <div className="row">
        <div className="col-12 bg-dark">
        {successMessage()}
        {errorMessage()}
        {userDetail()}</div>
      </div>
    </Base>
  );
};

export default UpdateUser;
