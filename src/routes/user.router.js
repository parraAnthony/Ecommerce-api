const { getAll, create, login, remove, modifyUser, resetPassword, newPassword } = require('../controllers/user.controller');
const express = require('express');
const verifyJWT = require('../utils/verifyJWT');

const userRouter = express.Router();

userRouter.route("/")
	.get(verifyJWT, getAll)
        .post(create)

userRouter.route("/login")
        .post(login)

userRouter.route("/reset_password")
        .post(resetPassword)

userRouter.route("/reset_password/:code")
        .put(newPassword)

userRouter.route("/:id")
        .delete(verifyJWT, remove)
        .put(verifyJWT ,modifyUser)

module.exports = userRouter;