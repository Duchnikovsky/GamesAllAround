import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../state/store";
import { setModal } from "../../state/modal/modalSlice";
import logo from "../../assets/logo.png";
import SignIn from "../Auth/SignIn";
import SignUp from "../Auth/SignUp";

interface modalsTypes {
  id: number;
  name: string;
  component: JSX.Element;
}

export default function Modal() {
  const modal = useSelector((state: RootState) => state.modal);
  const dispatch = useDispatch();

  const modals: modalsTypes[] = [
    {
      id: 0,
      name: "signIn",
      component: <SignIn />,
    },
    {
      id: 1,
      name: "signUp",
      component: <SignUp />,
    },
  ];

  const activeModal = modals.find((m) => m.name === modal.modalType);

  if (modal.isOpen)
    return (
      <div
        className="absolute top-0 left-0 w-screen h-screen bg-black/40 z-50 backdrop-blur-sm flex justify-center items-center pb-20"
        onClick={() => dispatch(setModal({ isOpen: false, modalType: "" }))}
      >
        <div
          className='w-screen sm:w-auto rounded bg-white box-r-shadow-xs flex flex-col items-center gap-2 py-6'
          onClick={(e) => e.stopPropagation()}
        >
          <img src={logo} alt="logo" className="w-20" loading="lazy"/>
          {activeModal?.component}
        </div>
      </div>
    );

  return <></>;
}
