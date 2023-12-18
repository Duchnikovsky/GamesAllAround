import logo from "../../assets/gaa.png";
import logoSM from "../../assets/logo.png";
import { Link } from "react-router-dom";
import SearchBar from "./Searchbar/SearchBar";
import NavbarNav from "./NavbarNav";
import MiniSearchBar from "./Searchbar/MiniSearchBar";

export default function Navbar() {

  return (
    <div className="fixed top-0 inset-x-0 h-14 sm:h-[4.5rem] bg-zinc-50 z-[10] py-2 px-4 box-shadow-xs">
      <div className="max-w-6xl h-full mx-auto flex items-center justify-between gap-2">
        <Link to="/">
          <img src={logo} alt="gaa" className="w-20 hidden sm:block" />
          <img src={logoSM} alt="gaa" className="w-28 block sm:hidden" />
        </Link>
        <SearchBar />
        <NavbarNav />
        <div className="absolute left-0 top-14 block sm:hidden w-full h-14 bg-transparent">
          <MiniSearchBar />
        </div>
      </div>
    </div>
  );
}
