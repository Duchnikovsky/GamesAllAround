import { FormEvent, useState } from "react";
import { Values } from "../../utils/authValidators";
import { Button } from "../UI/Button";
import SignInFoot from "./SignInFoot";
import SignInInputs from "./SignInInputs";
import useAuth from "../../hooks/Auth";

export default function SignIn() {
  const [values, setValues] = useState<Values>({
    email: "",
    password: "",
  });
  const { signIn, isSignInPending } = useAuth({ values });

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    signIn();
  }

  return (
    <form className="w-96 flex flex-col gap-6 px-8" onSubmit={handleSubmit}>
      <div className="flex flex-col gap-2">
        <div className="text-xl tracking-widest font-medium">Sign In</div>
        <div className="text-sm text-justify font-light">
          By continuing, you agree to our User Agreement and acknowledge that
          you understand the Privacy Policy
        </div>
      </div>
      <SignInInputs values={values} setValues={setValues} />
      <SignInFoot />
      <Button
        isDisabled={false}
        isLoading={isSignInPending}
        type="submit"
      >
        Sign In
      </Button>
    </form>
  );
}
