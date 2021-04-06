import { useAuth0 } from "@auth0/auth0-react";
import CSS from "./settings.module.css";

function Settings() {
  const { logout } = useAuth0();

  return (
    <div className={CSS.flexColumn}>
      {" "}
      <button  className={CSS.logout} onClick={() => logout({ returnTo: window.location.origin })}>Log out</button>
      <div className={CSS.shadow}></div>
    </div>
  );
}

export default Settings;
