import { NavLink } from "react-router-dom";
import { setModal } from "../../states/modal/modalSlice";
import { useDispatch } from "react-redux";


export default function SignInFoot() {
  const dispatch = useDispatch()

  return (
    <div className="flex flex-col text-base gap-2 font-light text-zinc-200">
      <div>
        Forgot your{" "}
        <NavLink
          to="/recovery/password"
          className="text-indigo-400 font-normal hover:text-indigo-500 cursor-pointer transition-colors duration-300"
          onClick={() => dispatch(setModal({ isOpen: false, modalType: "" }))}
        >
          password
        </NavLink>
        ?
      </div>
      <div>
        New to Games All Around?{" "}
        <span
          className="text-indigo-400 font-normal hover:text-indigo-500 cursor-pointer transition-colors duration-300"
          onClick={() =>
            dispatch(setModal({ isOpen: true, modalType: "signUp" }))
          }
        >
          Sign Up
        </span>
      </div>
    </div>
  )
}
