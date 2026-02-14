import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import ProtectedRoute from "./components/ProtectedRoute";
import Signin from "./pages/Signin";
import {
  RouteCreateBlog,
  RouteIndex,
  RouteProfile,
  RouteSignin,
  RouteSignup,
  RouteSingleBlogDetails,
  RouteUsers,
} from "./helpers/RouteName";
import Layout from "./Layout/Layout";
import Profile from "./pages/Profile";
import SingleBlogDetails from "./pages/Blog/SingleBlogDetails";
import Users from "./pages/Users";
import AdminRouteProtection from "./components/AdminRouteProtection";
import CreateBlog from "./components/CreateBlog";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path={RouteIndex} element={<Layout />}>
          <Route index element={<Home />} />

          <Route element={<ProtectedRoute />}>
            <Route path={RouteProfile} element={<Profile />} />
            <Route path={RouteCreateBlog} element={<CreateBlog />} />
          </Route>

          <Route element={<AdminRouteProtection />}>
            <Route path={RouteUsers} element={<Users />} />
          </Route>

          <Route
            path={RouteSingleBlogDetails()}
            element={<SingleBlogDetails />}
          />
        </Route>

        <Route path={RouteSignin} element={<Signin />} />
        <Route path={RouteSignup} element={<Signup />} />
      </Routes>
    </Router>
  );
};

export default App;
