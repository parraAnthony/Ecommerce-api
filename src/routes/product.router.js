const { getAll, create, getOne, remove, modifyProduct, setProductImage } = require('../controllers/product.controller');
const verifyJWT = require('../utils/verifyJWT');
const express = require('express');

const productRouter = express.Router();

productRouter.route("/")
		.get(getAll)
        .post(verifyJWT, create)

productRouter.route("/:id")
        .get(getOne)
        .delete(verifyJWT, remove)
        .put(verifyJWT, modifyProduct)

productRouter.route("/:id/images")
        .post(verifyJWT, setProductImage)


module.exports = productRouter;