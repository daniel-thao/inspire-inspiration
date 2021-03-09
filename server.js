require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

// Bring in the API Routes
const apiRoutes = require("./backend/routes");

// Server
const app = express();
// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}
// Routes
app.use(apiRoutes)

// Configure the DB variable to the database in Mongo Atlas cloud
const db = require("./backend/config/keys").mongoURI;

// Actually connect to the database via Mongoose
mongoose
  // We have the useNewUrlParser and useFindAndModify booleans because of the new changes to MongoDB finally starting to catch up and rename the functions in mongoose
  .connect(db, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log("\n\nMongoDB successfully connected\n\n"))
  .catch((err) => console.log(err));

// // This is the back up plan if routes aren't matched at all with the code set up above
// app.use("*", (req, res) => res.sendFile(path.join(__dirname, "../client/build/index.html")));



const port = process.env.PORT || 3001;

app.listen(port, () => console.log(`\n\n Server up and runnign on port ${port} \n\n`));

module.exports = app;
