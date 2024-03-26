import { Link } from "react-router-dom";
import logo from "../../assets/gaa.png";
import Categories from "./Categories";
import NavbarNav from "./NavbarNav";

export default function Navbar() {
  return (
    <div className="fixed top-0 w-full inset-x-0 h-20 sm:h-24 z-[10] px-4">
      <div className="max-w-6xl h-full mx-auto flex items-center justify-between">
        <div className="flex gap-8 items-center">
          <Link to="/">
            <img src={logo} alt="gaa_logo" className="w-16 sm:w-24" />
          </Link>
          <Categories />
        </div>
        <NavbarNav />
      </div>
    </div>
  );
}
