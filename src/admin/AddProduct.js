import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { isAuthenticate } from "../auth/helper";
import Base from "../core/Base";
import { createProduct, getCategories } from "./helper/adminapicall";

const AddProduct = ({ history }) => {
  const { user, token } = isAuthenticate();

  const [values, setValues] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    photo: "",
    categories: [],
    category: "",
    loading: false,
    createProduct: "",
    getRedirect: false,
    error: "",
    formData: "",
  });

  const {
    name,
    description,
    stock,
    price,
    category,
    categories,
    createdProduct,
    loading,
    formData,
    error,
    getRedirect,
  } = values;

  const preload = () => {
    getCategories().then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({ ...values, categories: data, formData: new FormData() });
        // console.log(data);
      }
    });
  };

  useEffect(() => {
    preload();
  }, []);

  const handleChange = (name) => (event) => {
    const value = name === "photo" ? event.target.files[0] : event.target.value;
    formData.set(name, value);
    setValues({ ...values, [name]: value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: "", loading: true });

    createProduct(user._id, token, formData).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error, loading: false });
        console.log(data.error);
      } else {
        setValues({
          ...values,
          name: "",
          error: "",
          stock: "",
          description: "",
          category: "",
          price: "",
          photo: "",
          loading: false,
          getRedirect: true,
          createdProduct: data.name,
        });
      }
    });
  };

  const createProductForm = () => (
    <form>
      <h4>Post photo</h4>
      <div className="form-group">
        <label className="btn btn-block rounded btn-success">
          <input
            onChange={handleChange("photo")}
            type="file"
            name="photo"
            accept="image"
            placeholder="choose a file"
          />
        </label>
      </div>
      <div className="form-group">
        <input
          onChange={handleChange("name")}
          name="photo"
          className="form-control"
          placeholder="Name"
          value={name}
        />
      </div>
      <div className="form-group">
        <textarea
          onChange={handleChange("description")}
          name="photo"
          className="form-control"
          placeholder="Description"
          value={description}
        />
      </div>
      <div className="form-group">
        <input
          onChange={handleChange("price")}
          type="number"
          className="form-control"
          placeholder="Price"
          value={price}
        />
      </div>
      <div className="form-group">
        <select
          onChange={handleChange("category")}
          className="form-control"
          placeholder="Category"
        >
          <option>Select</option>
          {categories &&
            categories.map((cate, index) => (
              <option value={cate._id} key={index}>
                {cate.name}
              </option>
            ))}
        </select>
      </div>
      <div className="form-group">
        <input
          onChange={handleChange("stock")}
          type="number"
          className="form-control"
          placeholder="stock"
          value={stock}
        />
      </div>

      <button
        type="submit"
        onClick={onSubmit}
        className="btn btn-outline-success mb-4 rounded"
      >
        Create Product
      </button>
    </form>
  );

  const performRedirect = () => {
    if (getRedirect) {
      setTimeout(() => {
        history.push("/admin/dashboard");
      }, 2000);
    }
  };

  const successMessage = () => {
    performRedirect();
    return (
      <div
        className="alert alert-success mt-3"
        style={{ display: createdProduct ? "" : "none" }}
      >
        <h4>{createdProduct} created succesfully</h4>
      </div>
    );
  };

  const errorMessage = () => {
    return (
      <div
        className="alert alert-danger mt-3"
        style={{ display: error ? "" : "none" }}
      >
        <h4>Failed to create product</h4>
      </div>
    );
  };

  return (
    <Base
      title="Add a product here!"
      description="Welcome to Product creation section"
      className="container bg-info rounded p-4 rounded"
    >
      <Link
        to="/admin/dashboard"
        className="btn btn-md rounded btn-warning mb-3"
      >
        Admin Home
      </Link>

      <div className="row bg-dark text-white rounded">
        <div className="col-md-8 offset-md-2">
          {successMessage()}
          {errorMessage()}
          {createProductForm()}
        </div>
      </div>
    </Base>
  );
};

export default AddProduct;
