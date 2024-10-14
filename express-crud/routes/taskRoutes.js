const express = require("express");
const taskController = require("../controllers/taskController")

const router = express.Router();

//localhost:3000
router.route("/").get(taskController.getAllTasks).post(taskController.createTask);
// chaining in routing - two requests are being hanled.

//localhost:3000/:id
router.route("/:id").get(taskController.getOneTask);

module.exports = router;
// now this router will be connected to server.js