const catchError = require('../utils/catchError');
const Cart = require('../modals/Cart');
const Product = require("../modals/Product")

const getAll = catchError(async(req, res) => {
    // Operaciones...
    const userId = req.user.id
    const cartProduct = await Cart.findAll(
        {include: [Product] },
        { where: {userId}}
    )
    return res.json(cartProduct)
});

const create = catchError(async(req, res) => {
    const {productId, quantity} = req.body
    const productCart = await Cart.create({
        productId,
        userId: req.user.id,
        quantity
    })
    return res.status(201).json(productCart)

})

const modify = catchError(async(req, res) => {
    const {id} = req.params
    const {quantity} = req.body

    const productCart = await Cart.update(
        {quantity},
        {where: {id}, returning: true}    
    )
    if(!productCart){res.status(404).json("Product not found")}

    return res.json(productCart[1][0])

})

const remove = catchError(async(req, res) => {
    const {id} = req.params
    await Cart.destroy({ where: {id} })
    res.sendStatus(204)

})

module.exports = {
    getAll,
    create,
    modify,
    remove,
}