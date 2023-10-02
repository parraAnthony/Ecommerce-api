const { getAll, create, remove, modifyCategory } = require('../controllers/category.controller');
const verifyJWT = require("../utils/verifyJWT")
const express = require('express');

const categoryRouter = express.Router();

categoryRouter.route("/")
	.get(getAll)
        .post(verifyJWT ,create)

categoryRouter.route("/:id")
        .delete(verifyJWT ,remove)
        .put(verifyJWT ,modifyCategory)

module.exports = categoryRouter;