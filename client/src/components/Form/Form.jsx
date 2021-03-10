import { useState } from "react";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import dayJS from "dayjs";

import CSS from "./form.module.css";
import "../../App.css";

// This is the container for the YT Motivational Video

function Form({ setGoalErr, ...props }) {
  const [selectValue, setSelectValue] = useState("category");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const { user } = useAuth0();

  // console.log(dayJS().format("MM/DD/YYYY-hh:mm:ss:SSS"));
  // console.log(dayJS().format("MM/DD/YYYY"));

  async function makeGoal(e) {
    const findUser = await axios.put("/api/users/findOne", user).then((res) => res);
    const newGoal = await axios
      .post("/api/goals/create", {
        findUser,
        tag: e.target[0].value,
        title: e.target[1].value,
        description: e.target[2].value,
        date: dayJS().format("MM/DD/YYYY"),
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  return (
    <>
      {/* 
      Eventually I will need to add a ternary here to have conditional rendering I think depending on where the form is being used
      */}
      <form
        className={`${CSS.form}`}
        onSubmit={(e) => {
          e.preventDefault();
          switch (e.nativeEvent.submitter.value) {
            case "Create":
              if (e.target[0].value === "") return setGoalErr({ tag: true, title: false });
              else if (e.target[1].value === "") return setGoalErr({ tag: false, title: true });
              else {
                makeGoal(e);
                /* 
                Eventually I will need to alter this line of code under here to match potential future feature of adding goals on the calendar, so therefore I will need to pass the urlLocation state into this component as well and because of that I will need to change this ternary. ==> this will need to be reflected in the other return in the Cancel case
                */
                return props.setUrlLocation ? props.setUrlLocation("home") : "";
              }
            case "Cancel":
              return props.setUrlLocation ? props.setUrlLocation("home") : "";
            default:
              return;
          }
        }}
      >
        <label className={`alignCenter ${CSS.selectWrapper}`}>
          <select
            className={CSS.choices}
            value={selectValue}
            onChange={(e) => {
              setSelectValue(e.target.value);
            }}
          >
            <option className={`${CSS.optionCentered}`} value="" defaultValue>
              Choose A Category
            </option>
            <option value="fitness">Fitness</option>
            <option value="reading">Reading</option>
            <option value="career">Career</option>
            <option value="lifeStyle">Life Style</option>
            <option value="finance">Finance</option>
            <option value="love">Love</option>
            <option value="relationship">Relationship</option>
          </select>
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          placeholder={title === "" ? "What are you going to do?" : ""}
          className={`${CSS.textBoxes} ${title !== "" ? CSS.userTyped : ""}`}
        ></input>
        <input
          type="text"
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
          }}
          placeholder={description === "" ? "Short description" : ""}
          className={`${CSS.textBoxes} ${description !== "" ? CSS.userTyped : ""}`}
        ></input>
        <div className={`alignCenter flexRow justifyAround insideMaxWidth`}>
          <input type="submit" value="Create" className={`${CSS.submitBtn}`} />
          <input type="submit" value="Cancel" className={`${CSS.submitBtn}`} />
        </div>
      </form>
    </>
  );
}

export default Form;
