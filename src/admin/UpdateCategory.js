import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { isAuthenticate } from "../auth/helper";
import Base from "../core/Base";
import { getCategory, updateCategory } from "./helper/adminapicall";

const UpdateCategory = ({ match }) => {
  const [values, setValues] = useState({
    name: "",
    loading: false,
    updatedCategory: "",
    getRedirect: false,
    error: "",
  });

  const { user, token } = isAuthenticate();

  const { name, loading, updatedCategory, getRedirect, error } = values;

  const preload = (categoryId) => {
    getCategory(categoryId).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          name: data.name,
        });
      }
    });
  };

  useEffect(() => {
    preload(match.params.categoryId);
  }, []);

  const goBack = () => {
    return (
      <div>
        <Link className="btn btn-warning mb-3 rounded" to="/admin/categories">
          Manage Category
        </Link>
      </div>
    );
  };

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false, loading: true });
    
    updateCategory(match.params.categoryId, user._id, token, {name}).then(
      (data) => {
        if (data.error) {
          setValues({ ...values, error: data.error, loading: false });
        } else {
          setValues({
            ...values,
            error: "",
            loading: false,
            name: "",
            updatedCategory: data.name,
          });
        }
      }
    );
  };

  const updateCategoryForm = () => {
    return (
      <div className="form-group">
        <h4 className="text-white">Enter the Category:</h4>
        <input
          type="text"
          className="form-control my-3"
          value={name}
          onChange={handleChange("name")}
          required
          autoFocus
          placeholder="For Ex. summer"
        />
        <button onClick={onSubmit} className="btn btn-outline-info rounded">
          Update Category
        </button>
      </div>
    );
  };

  const successMessage = () => {
    return (
      <div
        className="alert alert-success mt-3"
        style={{ display: updatedCategory ? "" : "none" }}
      >
        <h4>{updatedCategory} updated succesfully</h4>
      </div>
    );
  };

  const errorMessage = () => {
      console.log(error);
    return (
      <div
        className="alert alert-danger mt-3"
        style={{ display: error ? "" : "none" }}
      >
        <h4>Failed to update category</h4>
      </div>
    );
  };

  return (
    <Base
      title="Create a Category Here"
      description="Add a new Category for Product"
      className="container bg-info rounded p-4 rounded"
    >
      {goBack()}
      <div className="row bg-dark rounded">
        <div className="col-md-8 offset-md-2">
          {successMessage()}
          {errorMessage()}
          {updateCategoryForm()}
        </div>
      </div>
    </Base>
  );
};

export default UpdateCategory;
