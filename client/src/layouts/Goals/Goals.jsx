import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useHistory } from "react-router-dom";
import { Route, Switch } from "react-router-dom";
import axios from "axios";

import Video from "../../components/Video/Video";

import CSS from "./goals.module.css";
import "../../App.css";

function Goals({ history }) {
  const { user, logout } = useAuth0();
  const theuseHistory = useHistory();
  console.log(history);
  console.log(theuseHistory);
  console.log(user);

  async function newUser() {
    const check = await axios
      .put("/api/users/exists", user)
      .then(function (response) {
        return response.data;
      })
      .catch(function (error) {
        console.log(error);
      })
      console.log(check);

      if(check === null) {
          return await axios
          .post("/api/users/register", user)
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });
      } else {
          return
      }

  }

  useEffect(() => {
    // Create a new User
    newUser();
  }, []);

  return (
    <div className={`maxWidth flexRow justifyCenter`}>
      <div className={`${CSS.boundrary}`}>
        <Video></Video>
        <div>
          Goalside Overlay dsadas dsadas dasas {user.name}
          <button onClick={() => logout({ returnTo: window.location.origin })}>Log out</button>
        </div>
      </div>
    </div>
  );
}

export default Goals;
