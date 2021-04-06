import { useEffect, useState } from "react";
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

  async function makeGoal(e, calProps) {
    const findUser = await axios.put("/api/users/findOne", user).then((res) => res);
    // console.log(findUser);
    const newGoal = await axios
      .post("/api/goals/create", {
        findUser,
        tag: e.target[0].value,
        title: e.target[1].value,
        description: e.target[2].value,
        date:
          calProps !== ""
            ? dayJS(calProps.chosenDate).format("MM/DD/YYYY")
            : dayJS().format("MM/DD/YYYY"),
      })
      .catch(function (error) {
        console.log(error);
      });
    return;
  }

  useEffect(() => {
    if (title !== "" && selectValue !== "category") {
      setGoalErr({ tag: false, title: false, publishable: true });
    } else {
      setGoalErr({ tag: false, title: false, publishable: false });
    }
  }, [title, selectValue]);

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
              // Check to see if all necessary inputs are filled with something before submitting
              if (e.target[0].value === "category")
                return setGoalErr({ tag: true, title: false, publishable: false });
              else if (e.target[1].value === "")
                return setGoalErr({ tag: false, title: true, publishable: false });
              else {
                // Make the goal
                makeGoal(e, props.calProps);

                // Ternary If Statement to redirect based on where user came from => Calendar || HomePage
                return props.calProps !== ""
                  ? props.calProps.setIsWhere("Chosen Specific Date")
                  : props.setUrlLocation
                  ? props.setUrlLocation("home")
                  : "";
              }
            case "Cancel":
              // Ternary If Statement to redirect based on where user came from => Calendar || HomePage
              return props.calProps !== ""
                ? props.calProps.setIsWhere("Chosen Specific Date")
                : props.setUrlLocation
                ? props.setUrlLocation("home")
                : "";
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
            <option className={`${CSS.optionCentered}`} value="category" defaultValue>
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
          <input
            type="submit"
            value="Create"
            className={`${CSS.submitBtn} ${props.goalErr.publishable ? CSS.finished : ""}`}
          />
          <input type="submit" value="Cancel" className={`${CSS.submitBtn}`} />
        </div>
      </form>
    </>
  );
}

export default Form;
