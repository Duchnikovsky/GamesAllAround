import { useMutation } from "@tanstack/react-query";
import { SignInPayload, SignUpPayload, Values } from "../utils/authValidators";
import axios, { AxiosError } from "axios";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setModal } from "../states/modal/modalSlice";
import useSession from "./Session";

interface useAuthProps {
  values: Values;
}

export default function useAuth({ values }: useAuthProps) {
  const dispatch = useDispatch();
  const { refetch } = useSession();
  
  const { mutate: signIn, isPending:isSignInPending } = useMutation({
    mutationFn: async () => {
      const payload: SignInPayload = {
        email: values["email"],
        password: values["password"],
      };

      const { data } = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/auth/signIn`,
        payload,
        { withCredentials: true }
      );

      return data;
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        return toast.error(error.response?.data);
      }
      return toast.error("Something went wrong");
    },
    onSuccess: () => {
      dispatch(setModal({ isOpen: false, modalType: "" }));
      refetch();
      return toast.success("Signed in successfully");
    },
  });

  const { mutate: signUp, isPending:isSignUpPending } = useMutation({
    mutationFn: async () => {
      const payload: SignUpPayload = {
        email: values["email"],
        password: values["password"],
        rep_password: values["rep_password"],
      };

      const { data } = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/auth/signUp`,
        payload,
        { withCredentials: true }
      );

      return data;
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        return toast.error(error.response?.data);
      }
      return toast.error("Something went wrong");
    },
    onSuccess: () => {
      dispatch(setModal({ isOpen: true, modalType: "signIn" }));
      return toast.success("Signed up successfully");
    },
  });

  return { signIn, isSignInPending, signUp, isSignUpPending };
}
