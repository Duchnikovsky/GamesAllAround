import { FormEvent, useState } from "react";
import { Input } from "../UI/Input";
import { useDispatch } from "react-redux";
import { AuthInputTypes, SignInPayload, Values } from "../../utils/authValidators";
import { Button } from "../UI/Button";
import SignInFoot from "./SignInFoot";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { setModal } from "../../states/modal/modalSlice";
import { toast } from "react-toastify";
import useSession from "../../hooks/Session";

export default function SignIn() {
  const dispatch = useDispatch();
  const { refetch } = useSession();
  const [values, setValues] = useState<Values>({
    email: "",
    password: "",
  });

  const inputs: AuthInputTypes[] = [
    {
      name: "email",
      type: "email",
      label: "Email",
      pattern: "[^@ \t\r\n]+@[^@ \t\r\n]+.[^@ \t\r\n]+",
      fontSize: 16,
      maxlenght: 100,
    },
    {
      name: "password",
      type: "password",
      label: "Password",
      pattern: "^[A-Za-z0-9]{6,18}$",
      fontSize: 24,
      maxlenght: 18,
    },
  ];

  const { mutate: signIn, isPending } = useMutation({
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

  return (
    <form
      className="w-96 flex flex-col gap-6 px-8"
      onSubmit={(e: FormEvent) => {
        e.preventDefault();
        signIn();
      }}
    >
      <div className="flex flex-col gap-2">
        <div className="text-xl tracking-widest font-medium">Sign In</div>
        <div className="text-sm text-justify font-light">
          By continuing, you agree to our User Agreement and acknowledge that
          you understand the Privacy Policy
        </div>
      </div>
      {inputs.map((input) => (
        <Input
          key={input.name}
          type={input.type}
          width="100%"
          height="3rem"
          label={input.label}
          fontSize={input.fontSize}
          length={values[input.name].length}
          maxLength={input.maxlenght}
          pattern={input.pattern}
          value={values[input.name]}
          onChange={(e) =>
            setValues({ ...values, [input.name]: e.target.value })
          }
        />
      ))}
      <SignInFoot />
      <Button
        width="100%"
        height="3rem"
        fontSize="20px"
        isDisabled={false}
        isLoading={isPending}
        type="submit"
      >
        Sign In
      </Button>
    </form>
  );
}
