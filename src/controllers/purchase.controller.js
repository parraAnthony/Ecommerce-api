const catchError = require('../utils/catchError');
const Purchase = require('../modals/Purchase');
const Product = require("../modals/Product")
const Cart = require("../modals/Cart")

const getAll = catchError(async(req, res) => {
    // Operaciones...
    const purchases = await Purchase.findAll(
        {where: {userId: req.user.id}})
    return res.json(purchases)
});
const addToHistory = catchError(async(req, res) => {
    const productUser = await Cart.findAll(
        {where: {userId: req.user.id}}    
    )
    const data = []
    productUser.forEach( product =>{
        data.push({
            quantity: product.quantity,
            productId: product.productId,
            userId: req.user.id
        })
    })
    const purchases = await Purchase.bulkCreate(data)
    await Cart.destroy({ where: {userId: req.user.id}})
    return res.status(201).json(purchases)
})

module.exports = {
    getAll,
    addToHistory
}