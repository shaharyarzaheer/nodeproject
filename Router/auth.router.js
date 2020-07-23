const express = require("express");
const router = express.Router();
const AuthController = require('../controller/auth.controller');

router.route("/signup").post(AuthController.createUser);

router.route("/signin").post(AuthController.login);
module.exports = router;