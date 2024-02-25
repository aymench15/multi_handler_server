//const db = require("../db/pgQueries");
module.exports.home = async (req, res) => {
  // const resp = await db.existed("Aimen")
  //console.log(resp)
  //await db.create()
  //await db.insertion()
  //await db.selection()

  res.render("home");
};
module.exports.actions = (req, res) => {
  res.render("actions");
};

module.exports.graphs = (req, res) => {
  res.render("graphs");
};
module.exports.logs = (req, res) => {
  res.render("logs");
};
module.exports.about = (req, res) => {
  res.render("about");
};
module.exports.details = (req, res) => {
  res.render("details");
};
module.exports.moisture = (req, res) => {
  res.render("moisture");
};
module.exports.temperature = (req, res) => {
  res.render("temperature");
};
module.exports.humidity = (req, res) => {
  res.render("humidity");
};
module.exports.sunlight = (req, res) => {
  res.render("sunlight");
};
