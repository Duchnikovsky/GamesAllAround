import { FormEvent, useState } from "react";
import { Values } from "../../utils/authValidators";
import SignUpInputs from "./SignUpInputs";
import SignUpFoot from "./SignUpFoot";
import { Button } from "../UI/Button";
import useAuth from "../../hooks/Auth";

export default function SignUp() {
  const [values, setValues] = useState<Values>({
    email: "",
    password: "",
    rep_password: "",
  });

  const { signUp, isSignUpPending } = useAuth({ values });
  
  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    signUp();
  }

  return (
    <form className="w-96 flex flex-col gap-6 px-8" onSubmit={handleSubmit}>
      <div className="flex flex-col gap-2">
        <div className="text-xl tracking-widest font-medium">Sign Up</div>
        <div className="text-sm text-justify font-light">
          By continuing, you agree to our User Agreement and acknowledge that
          you understand the Privacy Policy
        </div>
      </div>
      <SignUpInputs values={values} setValues={setValues} />
      <SignUpFoot />
      <Button
        width="100%"
        height="3rem"
        fontSize="20px"
        isDisabled={false}
        isLoading={isSignUpPending}
        type="submit"
      >
        Sign Up
      </Button>
    </form>
  )
}
