import { useState } from "react";
import CSS from "./addGoal.module.css";
import "../../App.css";

import Form from "../../components/Form/Form";

function AddGoal({setUrlLocation}) {
  const [goalErr, setGoalErr] = useState({ tag: false, title: false, publishable: false });
  return (
    <div className={`${CSS.darkBorder}`}>
      {goalErr.tag === true ? (
        <div className={`${CSS.show}`}>
          <div
            className={`${CSS.error}`}
            onClick={() => {
              setGoalErr({ tag: false, title: false });
            }}
          >
            Please choose a category for your goal
          </div>
        </div>
      ) : goalErr.title === true ? (
        <div
          className={`${CSS.show}`}
          onClick={() => {
            setGoalErr({ tag: false, title: false });
          }}
        >
          <div className={`${CSS.error}`}>Please choose a title for your goal</div>
        </div>
      ) : (
        <></>
      )}

      {/* <div>Please write down a title for your goal</div> */}
      <div className={`${CSS.newGoalContainer}`}>
        <div className={`flexColumn ${CSS.creationCon}`}>
          <h1 className={`alignCenter ${CSS.hint} ${goalErr.publishable ? CSS.finished: ""}`}>Goal Creation</h1>
          <div className={`${CSS.tagChoice}`}>
            <Form goalErr={goalErr} setGoalErr={setGoalErr} setUrlLocation={setUrlLocation}></Form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddGoal;
