const { create, remove, getAll } = require('../controllers/image.controller');
const verifyJWT = require('../utils/verifyJWT');
const express = require('express');
const upload = require('../utils/multer');

const imageRouter = express.Router();

imageRouter.route("/")
        .get(getAll)
        .post(upload.single('image'), verifyJWT, create);

imageRouter.route("/:id")
        .delete(verifyJWT, remove)

module.exports = imageRouter;