import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import data from "./data.json";

console.log(data.length);

// Defines the port the app will run on. Defaults to 8080, but can be
// overridden when starting the server. For example:
//
//   PORT=9000 npm start
const port = process.env.PORT || 8080;
const app = express();

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(bodyParser.json());

// Start defining your routes here

app.get("/", (req, res) => {
  res.send("Hello world");
});

//sending a get request the path is "/nomination"
//in ths callback function , second arguments to the route
//req, what headers ex postMessage and second argument respons object
//data will be the full data set
app.get("/nominations", (req, res) => {
  res.json(data);
});

//new end point to get "id"
//same way as react router //variable with year 2010
app.get("/year/:year", (req, res) => {
  //weget the value above into a variable
  const year = req.params.year;
  const showWon = req.query.won;
  //filter the array,
  let nominationsFromYear = data.filter((item) => item.year_award === +year);
  console.log({ year });

  if (showWon) {
    nominationsFromYear = nominationsFromYear.filter((item) => item.win);
  }

  res.json(nominationsFromYear);
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
