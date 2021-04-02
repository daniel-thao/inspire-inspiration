const router = require("express").Router();
// Load User model
const db = require("../models");

router.get("/findOne/:goalID", (req, res) => {
  db.Goals.where("_id", req.params.goalID)
    .then(function (dbGoals) {
      // then send all of the information attached to this goal back to the front end.
      // console.log(dbGoals);
      res.json(dbGoals);
    })
    .catch(function (err) {
      res.json(err);
    });
});

router.put("/findAllViaDate/", (req, res) => {
  db.Goals.find({ createdOn: req.body.date })
    .then(function (dbGoals) {
      // then send all of the information attached to this goal back to the front end.
      // console.log(dbGoals);
      res.json(dbGoals);
    })
    .catch(function (err) {
      res.json(err);
    });
});

// This route will create a new goal
router.post("/create", function (req, res) {
  const dataArr = [];
  const userID = req.body.findUser.data._id;

  // go into the Goal Collection and create a a new object in there with all of the information sent in request
  db.Goals.create({
    tag: req.body.tag,
    title: req.body.title,
    description: req.body.description,
    date: req.body.date,
    userID: userID,
  })
    .then(async function (dbGoal) {
      // We are then going to go into the user Collection and find the userid = to our new variable above
      // and then push the id of the newly created goal into the user's goals array
      // the last portion {new:true} will say that the collection was updated and refresh it
      const userUpdate = await db.Users.findOneAndUpdate(
        { _id: userID },
        {
          $push: { goals: { dataIdRef: dbGoal._id, createdOn: req.body.date } },
        },
        { new: true }
      );
      dataArr.push(dbGoal, userUpdate);
      // res.json(dataArr);
      res.send("made a new goal");
    })
    .catch(function (err) {
      res.json(err);
    });
});

// This route will create a new goal
router.put("/checked", function (req, res) {
  const dataArr = [];
  // const goalID = req.body.findUser.data._id;
  console.log(req.body.id);

  // go into the Goal Collection and create a a new object in there with all of the information sent in request
  db.Goals.findOneAndUpdate(
    { _id: req.body.id },
    { $set: { checked: req.body.checked } },
    { new: true }
  ).then(async function (dbGoal) {
    res.json(dbGoal);
  });
});

module.exports = router;
