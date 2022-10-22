import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

// Routes
import pagesRoutes from "./routes";

// scroll
import Scroll from "../components/ScrollToTop/ScrollToTop";

function Router() {
  return (
    <BrowserRouter>
      <Scroll />
      <Toaster />
      <Routes>
        {pagesRoutes.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            element={<route.component />}
          />
        ))}
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
