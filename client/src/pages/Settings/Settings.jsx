import { useAuth0 } from "@auth0/auth0-react";

function Settings() {
  const { logout } = useAuth0();

  return (
    <div>
      {" "}
      <button onClick={() => logout({ returnTo: window.location.origin })}>Log out</button>
    </div>
  );
}

export default Settings;
