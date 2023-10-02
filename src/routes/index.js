const express = require('express');
const userRouter = require('./user.router');
const imageRouter = require('./image.router');
const categoryRouter = require("./category.router")
const productRouter = require("./product.router")
const cartRouter = require("./cart.router")
const purchaseRouter = require("./purchase.router")
const router = express.Router();

// colocar las rutas aquí
router.use("/users", userRouter)
router.use("/product_images", imageRouter)
router.use("/category", categoryRouter)
router.use("/products", productRouter)
router.use("/cart-products", cartRouter)
router.use("/purchases", purchaseRouter)

module.exports = router;