import { setModal } from "../../states/modal/modalSlice";
import { useDispatch } from "react-redux";

export default function SignInFoot() {
  const dispatch = useDispatch()

  return (
    <div className="flex flex-col text-base gap-2 font-light text-zinc-200">
      <div>
        Already have account?{" "}
        <span
          className="text-indigo-400 font-normal hover:text-indigo-500 cursor-pointer transition-colors duration-300"
          onClick={() =>
            dispatch(setModal({ isOpen: true, modalType: "signIn" }))
          }
        >
          Sign In
        </span>
      </div>
    </div>
  )
}
