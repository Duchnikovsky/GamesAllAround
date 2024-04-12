import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Root from "./layout/Root";
import Providers from "./components/Providers";
import Dashboard from "./layout/Dashboard";
import ProductsDashboard from "./components/Dashboard/Products/ProductsDashboard";
import AnalyticsDashboard from "./components/Dashboard/Analytics/AnalyticsDashboard";
import OrdersDashboard from "./components/Dashboard/Orders/OrdersDashboard";
import CustomersDashboard from "./components/Dashboard/Customers/CustomersDashboard";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
    children: [
      {
        path: "",
        element: <AnalyticsDashboard />
      },
      {
        path: "products",
        element: <ProductsDashboard />
      },
      {
        path: "orders",
        element: <OrdersDashboard />
      },
      {
        path: "customers",
        element: <CustomersDashboard />
      },
    ]
  }
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Providers>
      <RouterProvider router={router} />
    </Providers>
  </React.StrictMode>
);
