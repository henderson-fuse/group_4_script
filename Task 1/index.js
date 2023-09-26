const express = require("express");

const index = express();
index.set("view engine", "ejs");
index.use(express.static("public"));

index.get("/", (req, res) => {
  const data = {
    title: "Dashboard",
    active: "Dashboard",
  };
  res.render("dashboard", data);
});

index.get("/team", (req, res) => {
  const data = {
    title: "Team",
    active: "Team",
  };
  res.render("team", data);
});

index.get("/documents", (req, res) => {
  const data = {
    title: "Documents",
    active: "Documents",
  };
  res.render("documents", data);
});

index.get("/calendar", (req, res) => {
    const data = {
      title: "Calendar",
      active: "Calendar",
    };
    res.render("calendar", data);
});

index.get("/projects", (req, res) => {
    const data = {
      title: "Projects",
      active: "Projects",
    };
    res.render("projects", data);
});

index.get("/reports", (req, res) => {
    const data = {
      title: "Reports",
      active: "Reports",
    };
    res.render("reports", data);
});

index.listen(3000, () => {
  console.log("server started");
});


