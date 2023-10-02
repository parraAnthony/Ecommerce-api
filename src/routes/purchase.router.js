const { getAll, addToHistory } = require('../controllers/purchase.controller')
const verifyJWT = require('../utils/verifyJWT');
const express = require('express');

const purchaseRouter = express.Router();

purchaseRouter.route("/")
		.get(verifyJWT, getAll)
        .post(verifyJWT, addToHistory)

module.exports = purchaseRouter;