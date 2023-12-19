import {
  createBrowserRouter,
  Route,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";

import Providers from "./components/Providers";
import Root from "./layout/Root";
import Page404 from "./pages/Page404";

const router = createBrowserRouter(
  createRoutesFromElements(<>
  <Route path="/" element={<Root />}>
    <Route path="*" element={<Page404 />}></Route>
  </Route>
  </>)
)

function App() {

  return (
    <Providers>
      <RouterProvider router={router} />
    </Providers>
  )
}

export default App
