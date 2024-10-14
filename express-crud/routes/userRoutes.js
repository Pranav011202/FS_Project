const express = require("express");
const userController = require("../controllers/userController");

const router = express.Router();

// Route to handle getting all users and creating a new user
// Example: GET /api/users and POST /api/users
router.route("/")
    .get(userController.getAllUsers)
    .post(userController.createUser);

// Route to handle getting, updating, and deleting a specific user by ID
// Example: GET /api/users/:id, PUT /api/users/:id, DELETE /api/users/:id
router.route("/:id")
    .get(userController.getOneUser)
    .put(userController.updateUserPassword)
    .delete(userController.deleteUser);

module.exports = router;
