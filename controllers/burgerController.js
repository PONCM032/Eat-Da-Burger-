var express = require("express");

var router = express.Router();

// Import the model (burger.js) to use its database functions.
var burg = require("../models/burger.js");

// Create all our routes and set up logic within those routes where required.
router.get("/", function(req, res) {
  burg.all(function(data) {
    var hbsObject = {
      burger: data
    };
    console.log(hbsObject);
    res.render("index", hbsObject);
  });
});

router.post("/api/order", function(req, res) {
  burg.create([
    "name", "action"
  ], [
    req.body.name, req.body.action
  ], function(result) {
    // Send back the ID of the new quote
    res.json({ id: result.insertId });
  });
});

router.put("/api/order/:id", function(req, res) {
  var condition = "id = " + req.params.id;

  console.log("condition", condition);

  burg.update({
    action: req.body.action
  }, condition, function(result) {
    if (result.changedRows == 0) {
      // If no rows were changed, then the ID must not exist, so 404
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
  });
});

router.delete("/api/order/:id", function(req, res) {
  var condition = "id = " + req.params.id;

  burg.delete(condition, function(result) {
    if (result.affectedRows == 0) {
      // If no rows were changed, then the ID must not exist, so 404
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
  });
});

// Export routes for server.js to use.
module.exports = router;
