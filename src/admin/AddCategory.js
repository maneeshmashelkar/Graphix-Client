import React, { useState } from "react";
import { Link } from "react-router-dom";
import { isAuthenticate } from "../auth/helper";
import Base from "../core/Base";
import { createCategory } from "./helper/adminapicall";

const AddCategory = () => {
  const [name, setName] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const { user, token } = isAuthenticate();

  const goBack = () => {
    return (
      <div>
        <Link className="btn btn-warning mb-3 rounded" to="/admin/dashboard">
          Admin Home
        </Link>
      </div>
    );
  };

  const handleChange = (event) => {
    setError("");
    setName(event.target.value);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setError("");
    setSuccess(false);

    createCategory(user._id, token, { name }).then((data) => {
      if (data.error) {
        setError(true);
      } else {
        setSuccess(true);
        setName("");
      }
    });
  };

  const myFormCategory = () => {
    return (
      <div className="form-group">
        <h4 className="text-white">Enter the Category:</h4>
        <input
          type="text"
          className="form-control my-3"
          value={name}
          onChange={handleChange}
          required
          autoFocus
          placeholder="For Ex. summer"
        />
        <button onClick={onSubmit} className="btn btn-outline-info rounded">
          Create Category
        </button>
      </div>
    );
  };

  

  const successMessage = () => {
    if (success) {
      return <h4 className="text-success">Category created successfully</h4>;
    }
  };

  const errorMessage = () => {
    if (error) {
      return <h4 className="text-danger">Failed to create category</h4>;
    }
  };

  return (
    <Base
      title="Create a Category Here"
      description="Add a new Category for Product"
      className="container bg-info p-4 rounded" 
    >{goBack()}
      <div className="row bg-dark rounded">
        <div className="col-md-8 offset-md-2">
          {successMessage()}
          {errorMessage()}
          {myFormCategory()}
          
        </div>
      </div>
    </Base>
  );
};

export default AddCategory;
