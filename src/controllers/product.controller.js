const catchError = require('../utils/catchError');
const Product = require('../modals/Product');
const Image = require("../modals/Image")
const { Op } = require("sequelize")

const getAll = catchError(async(req, res) => {
    const {title, categoryId} = req.query
    const where = {}
    if(title) {where.title =  { [Op.iLike]: `%${title}%` }}
    if(categoryId){where.categoryId = categoryId}
    const products = await Product.findAll({
         include: [Image],
         where
        
        })
    return res.json(products)
});
const getOne = catchError(async(req, res)=> {
    const {id} = req.params
    const product = await Product.findByPk(id,{ include: [Image] })
    if(!product){return res.status(404).json("Product not found")}
    return res.json(product)

})

const create = catchError(async(req, res)=> {
    const product = await Product.create(req.body)
    return res.status(201).json(product)
    
})
const modifyProduct = catchError(async(req, res)=> {
    const {id}= req.params
    const product = await Product.update(
        req.body
        ,{where: {id}, returning: true}
    )
    return res.json(product[1][0])
    
})
const remove = catchError(async(req, res)=> {
    const {id} = req.params
    await Product.destroy({where: {id} })
    return res.sendStatus(204) 
    
})
const setProductImage = catchError(async(req, res)=> {
    const {id} = req.params
    const product = await Product.findByPk(id)
    if(!product){return res.status(404).json("Product not found")}
    await product.setImages(req.body)
    const productImage = await product.getImages();
    return res.json(productImage)
    
})

module.exports = {
    getAll,
    getOne,
    create,
    modifyProduct,
    remove,
    setProductImage,
}