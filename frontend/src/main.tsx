import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Card from "./components/card/Card";
import Login from "./pages/login/Login";
import Basket from "./pages/basket/Basket";
import SingleProduct from "./pages/singleProduct/SingleProduct";
import Addnew from "./pages/addnew/Addnew";
import Map from "./pages/map/Map";
import { Provider } from "react-redux";
import { store } from "./app/store.ts";
import EditProducts from "./pages/edit/EditProducts.tsx";
import ProdtectedRoutes from "./pages/ProdtectedRoutes/ProdtectedRoutes.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <>Error 404</>,
    children: [
      {
        path: "",
        element: <Card />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "basket",
        element: <Basket />,
      },
      {
        path: ":id",
        element: <SingleProduct />,
      },
      {
        path: "admin",
        element: <ProdtectedRoutes />,
        errorElement: <>Error 404</>,
        children: [
          {
            path: "",
            element: <Addnew />,
          },
          {
            path: "edit",
            element: <EditProducts />,
          },
        ],
      },
      {
        path: "map",
        element: <Map />,
      },
    ],
  },
]);
createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
