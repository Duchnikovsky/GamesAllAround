import AuthNav from "./Nav/AuthNav";
import ProfileNav from "./Nav/ProfileNav";
import CartNav from "./Nav/CartNav";

export default function NavbarNav() {
  // const [session, setSession] = useState<boolean>(true);
  const session = true;

  return (
    <div className="flex items-center gap-4 pb-1">
      {session ? (
        <div className="flex gap-4">
          <CartNav />
          <ProfileNav />
        </div>
      ) : (
        <div>
          <AuthNav />
        </div>
      )}
    </div>
  );
}
