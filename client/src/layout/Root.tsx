import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import Modal from "../components/Modal/Modal";
import { Toaster } from "../components/UI/shadcn/ui/toaster";

export default function Root() {
  return (
    <div className="absolute top-0 inset-x-0 h-full bg-zinc-50">
      <div className="max-w-6xl mx-auto flex mt-14">
        <Navbar />
        <Modal />
        <Toaster />
        <div className="mt-12 sm:mt-5 w-full">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
