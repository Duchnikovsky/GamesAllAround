import { Outlet } from "react-router";
import Navbar from "../components/Navbar/Navbar";

export default function Root() {
  return (
    <div className='absolute top-0 inset-x-0 h-full bg-main bg-no-repeat bg-cover bg-fixed bg-center md:bg-top'>
      <div className='absolute top-0 w-full h-full bg-blur font-ClashGrotesk'>
        <div className="max-w-6xl mx-auto flex mt-14">
           <Navbar />
        </div>
        <Outlet />
      </div>
    </div>
  )
}
