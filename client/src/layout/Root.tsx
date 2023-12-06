import { Outlet } from "react-router-dom";

export default function Root() {
  return (
    <div className="absolute top-0 inset-x-0 h-full bg-zinc-50">
      <div className="max-w-5xl mx-auto flex mt-14">
        <div className="mt-12 sm:mt-8 w-full">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
