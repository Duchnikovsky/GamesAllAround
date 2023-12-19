import {
  createBrowserRouter,
  Route,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";

import Providers from "./components/Providers";
import Root from "./layout/Root";
import Page404 from "./pages/Page404";
import Dashboard from "./layout/Dashboard";
import Account from "./components/Dashboard/pages/Account";
import Orders from "./components/Dashboard/pages/Orders";
import Address from "./components/Dashboard/pages/Address";
import Opinions from "./components/Dashboard/pages/Opinions";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Root />}>
        <Route path="*" element={<Page404 />}></Route>
        <Route path="dashboard" element={<Dashboard />}>
          <Route path="orders" element={<Orders />} />
          <Route path="address" element={<Address />} />
          <Route path="opinions" element={<Opinions />} />
          <Route path="account" element={<Account />} />
        </Route>
      </Route>
    </>
  )
);

function App() {
  return (
    <Providers>
      <RouterProvider router={router} />
    </Providers>
  );
}

export default App;
