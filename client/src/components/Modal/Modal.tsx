import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../states/store";
import { setModal } from "../../states/modal/modalSlice";
import logo from '../../assets/logo.png';
import SignIn from "../Auth/SignIn";
import SignUp from "../Auth/SignUp";
import AddProduct from "../Dashboard/Products/AddProduct/AddProduct";

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
    {
      id: 2,
      name: "addProduct",
      component: <AddProduct />
    }
  ];

  const activeModal = modals.find((m) => m.name === modal.modalType);

  if (modal.isOpen)
    return (
      <div
        className="absolute top-0 left-0 w-screen h-screen bg-black/50 z-50 backdrop-blur-sm flex justify-center items-start sm:items-center pb-20 overflow-auto"
        onClick={() => dispatch(setModal({ isOpen: false, modalType: "" }))}
      >
        <div
          className='w-screen sm:w-auto rounded bg-modal text-zinc-200 tracking-wider border border-px border-zinc-100/10 flex flex-col items-center gap-2 py-6 overflow-auto'
          onClick={(e) => e.stopPropagation()}
        >
          <img src={logo} alt="logo" className="w-20" loading="lazy"/>
          {activeModal?.component}
        </div>
      </div>
    );

  return <></>;
}
