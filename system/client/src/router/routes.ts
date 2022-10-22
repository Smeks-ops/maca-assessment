import Home from "../pages/Home/Home";
import FormPage from "../pages/FormPage/FormPage";
import UploadsPage from "../pages/UploadsPage/UploadsPage";

const pagesRoutes = [
  {
    path: "/",
    component: Home,
    meta: {
      redirectUrl: "/",
      protectedRoute: false,
    },
  },
  {
    path: "/form",
    component: FormPage,
    meta: {
      redirectUrl: "/",
      protectedRoute: true,
    },
  },
  {
    path: "/uploads",
    component: UploadsPage,
    meta: {
      redirectUrl: "/",
      protectedRoute: false,
    },
  },
];

export default pagesRoutes;
