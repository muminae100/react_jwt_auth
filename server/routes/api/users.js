const express = require('express');
const router = express.Router();
const path = require('path');
const usersController = require('../../controllers/usersController');

router.route("/")
    .get(usersController.getAllUsers)
    .post(usersController.createUser)
    .put(usersController.updateUser)
    .delete(usersController.deleteUser)

router.route("/:id")
    .get(usersController.getUser)


module.exports = router;