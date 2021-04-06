import { useAuth0 } from "@auth0/auth0-react";
import { useHistory } from "react-router-dom";

import CSS from "./landing.module.css";

function Landing() {
  const history = useHistory();
  const { isLoading, error, isAuthenticated, loginWithRedirect } = useAuth0();
  if (isLoading) {
    return <div>Loading...</div>;
  } else if (error) {
    return <div>Oops... {error.message}</div>;
  } else if (isAuthenticated) {
    return history.push("/goals");
  } else {
    return (
      <div className={CSS.flexColumn}>
        <button className={CSS.login} onClick={loginWithRedirect}>
          Log in
        </button>
        {/* <div className={CSS.shadow}></div> */}

      </div>
    );
  }
}

export default Landing;
