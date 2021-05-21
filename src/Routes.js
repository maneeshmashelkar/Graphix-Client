import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./core/Home";
import SignIn from "./user/Signin";
import SignUp from "./user/Signup";
import AdminDashBoard from "./user/AdminDashBoard";
import UserDashBoard from "./user/UserDashBoard";
import AdminRoutes from "./auth/helper/AdminRoutes";
import PrivateRoutes from "./auth/helper/PrivateRoutes";
import AddCategory from "./admin/AddCategory";
import AddProduct from "./admin/AddProduct";
import ManageCategories from "./admin/ManageCategories";
import ManageProduct from "./admin/ManageProducts";
import ManageOrders from "./admin/ManageOrders";
import UpdateProduct from "./admin/UpdateProduct";
import UpdateCategory from "./admin/UpdateCategory";
import Cart from "./core/Cart";
import UpdateOrder from "./admin/UpdateOrder";
import UpdateUser from "./user/UpdateUser";

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/signin" exact component={SignIn} />
        <Route path="/signup" exact component={SignUp} />
        <Route path="/cart" exact component={Cart} />
        <PrivateRoutes path="/user/dashboard" exact component={UserDashBoard} />
        <PrivateRoutes path="/user/update" exact component={UpdateUser} />
        <AdminRoutes path="/admin/dashboard" exact component={AdminDashBoard} />
        <AdminRoutes
          path="/admin/create/category"
          exact
          component={AddCategory}
        />
        <AdminRoutes
          path="/admin/categories"
          exact
          component={ManageCategories}
        />
        <AdminRoutes
          path="/admin/create/product"
          exact
          component={AddProduct}
        />
        <AdminRoutes
          path="/admin/products"
          exact
          component={ManageProduct}
        />
        <AdminRoutes
          path="/admin/product/update/:productId"
          exact
          component={UpdateProduct}
        />
        <AdminRoutes
          path="/admin/category/update/:categoryId"
          exact
          component={UpdateCategory}
        />
        <AdminRoutes
          path="/admin/orders"
          exact
          component={ManageOrders}
        />
        <AdminRoutes
          path="/admin/order/update/:orderId"
          exact
          component={UpdateOrder}
        />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
