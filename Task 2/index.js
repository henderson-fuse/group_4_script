const data = require("./data")
const data2 = require("./data2")
const data3 = require("./data3")
const express = require("express");

const index = express();
index.set("view engine", "ejs");
index.use(express.static("public"));

index.get("/", (req, res) => {
  const data = {
    title: "Welcome",
    active: "Home",
  };
  res.render("home", data);
});

index.get("/chart", (req, res) => {
    const data = {
      title: "Chart",
      active: "Chart",
    };
    res.render("chart", data);
});

index.get("/chart2", (req, res) => {
  const data = {
    title: "Chart2",
    active: "Chart",
    data: info2,
  };
  res.render("chart2", data);
});

index.get("/chart3", (req, res) => {
  const data = {
    title: "Chart3",
    active: "Chart",
    data: info3,
  };
  res.render("chart3", data);
});



index.get("/chart1", (req, res) => {
  const data = {
    title: "Chart1",
    active: "Chart",
    data: info,
  };
  res.render("chart1", data);
});

index.get("/about", (req, res) => {
  const data = {
    title: "About",
    active: "About",
  };
  res.render("about", data);
});

index.listen(3000, () => {
  console.log("server started");
});

