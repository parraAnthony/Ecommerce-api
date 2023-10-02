const verifyJWT = require('../utils/verifyJWT');
const { getAll, create, modify, remove } = require('../controllers/cart.controller');
const express = require('express');

const cartRouter = express.Router();

cartRouter.route("/")
	.get(verifyJWT, getAll)
        .post(verifyJWT, create)
cartRouter.route("/:id")
        .delete(verifyJWT, remove)
        .put(verifyJWT, modify)

module.exports = cartRouter;