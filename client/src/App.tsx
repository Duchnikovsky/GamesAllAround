import {
  createBrowserRouter,
  Route,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";

import Providers from "./components/Providers";
import Root from "./layout/Root";

const router = createBrowserRouter(
  createRoutesFromElements(<>
  <Route path="/" element={<Root />}>

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
