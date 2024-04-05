import AuthNav from "./Nav/AuthNav";
import ProfileNav from "./Nav/ProfileNav";
import CartNav from "./Nav/CartNav";
import useSession from "../../hooks/Session";

export default function NavbarNav() {
  const session = useSession();

  return (
    <div className="flex items-center gap-4 pb-1">
      {session.session.authenticated ? (
        <div className="flex gap-4">
          <CartNav />
          <ProfileNav session={session.session} />
        </div>
      ) : (
        <div>
          <AuthNav />
        </div>
      )}
    </div>
  );
}
