import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../states/store";
import { setModal } from "../../states/modal/modalSlice";
import logo from "../../assets/logo.png";
import SignIn from "../Auth/SignIn";
import SignUp from "../Auth/SignUp";
import AddProduct from "../Dashboard/Products/AddProduct/AddProduct";
import EditProduct from "../Dashboard/Products/EditProduct/EditProduct";
import RemoveProduct from "../Dashboard/Products/RemoveProduct";
import CustomerDelete from "../Dashboard/Customers/CustomersList/CustomersManager/CustomerDelete";
import CustomersDelete from "../Dashboard/Customers/CustomersList/CustomersManager/CustomersDelete";
import CustomerEdit from "../Dashboard/Customers/CustomersList/CustomersManager/CustomerEdit";

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
      component: <AddProduct />,
    },
    {
      id: 3,
      name: "editProduct",
      component: <EditProduct />,
    },
    {
      id: 4,
      name: "removeProduct",
      component: <RemoveProduct />,
    },
    {
      id: 5,
      name: "removeCustomer",
      component: <CustomerDelete />,
    },
    {
      id: 6,
      name: "removeCustomers",
      component: <CustomersDelete />
    },
    {
      id: 7,
      name: "editCustomer",
      component: <CustomerEdit />
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
          className="w-screen sm:w-auto center flex-col px-4 py-6 rounded-3xl bg-modal text-zinc-50 tracking-wider overflow-visible box-shadow shadow-zinc-50"
          onClick={(e) => e.stopPropagation()}
        >
          <img src={logo} alt="logo" className="w-20 mb-4" loading="lazy" />
          {activeModal?.component}
        </div>
      </div>
    );

  return <></>;
}
