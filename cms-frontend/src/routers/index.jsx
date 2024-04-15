import { createBrowserRouter, redirect } from "react-router-dom";
import LoginPage from "../view/LoginPage";
import BaseLayout from "../layouts/BaseLayout";
import ProductPage from "../view/ProductPage";
import CategoryPage from "../view/CategoryPage";
import AddUserPage from "../view/AddUserPage";
import AddProductPage from "../view/AddProductPage";
import UpdateProductPage from "../view/UpdateProductPage";
import UpdateProductImage from "../view/UpdateProductImage";

const baseUrl = "https://phase2-aio.vercel.app";

const router = createBrowserRouter([
  {
    path: "/",
    loader: () => {
      return redirect("/products");
    },
  },
  {
    path: "/login",
    element: <LoginPage baseUrl={baseUrl} />,
  },
  {
    element: <BaseLayout />,
    loader: () => {
      const access_token = localStorage.getItem("access_token");

      if (!access_token) return redirect("/login");

      return null;
    },
    children: [
      {
        path: "/products",
        element: <ProductPage baseUrl={baseUrl} />,
      },
      {
        path: "/products/add",
        element: <AddProductPage baseUrl={baseUrl} />,
      },
      {
        path: "/products/update/:id",
        element: <UpdateProductPage baseUrl={baseUrl} />,
      },
      {
        path: "/products/update-image/:id",
        element: <UpdateProductImage baseUrl={baseUrl} />,
      },
      {
        path: "/categories",
        element: <CategoryPage baseUrl={baseUrl} />,
      },
      {
        path: "/add-user",
        element: <AddUserPage baseUrl={baseUrl} />,
      },
    ],
  },
]);

export default router;
