export const RouteIndex = "/";
export const RouteSignin = "/signin";
export const RouteSignup = "/signup";
export const RouteLogout = "/signout";
export const RouteProfile = "/profile";
export const BlogLayout = "/bloglayout";

export const RouteBlog = "/blog";

export const RouteSingleBlogDetails = (id) => {
  if (!id) {
    return `/blog/singledetails/:id`;
  } else {
    return `/blog/singledetails/${id}`;
  }
};


export const RouteCreateBlog = "/create";
export const RouteComments = "/comments";
export const RouteUsers = "/users";
