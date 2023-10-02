const catchError = require('../utils/catchError');
const Category = require('../modals/Category');

const getAll = catchError(async(req, res) => {
    // Operaciones...
    const category = await Category.findAll();
    return res.json(category)
});
const create = catchError(async(req, res)=> {
    const { name } = req.body
    const category = await Category.create({
        name
    })

    return res.status(201).json(category)
})

const remove = catchError(async(req, res)=> {
    const {id} = req.params
    await Category.destroy({where: {id} })
    
    return res.sendStatus(204)
})

const modifyCategory = catchError(async(req, res)=> {
    const {id} = req.params
    const {name} = req.body
    const category = await Category.update({
        name
    }, {where: {id}, returning: true })
    if(category[0]==0){return res.sendStatus(404)}

    return res.json(category[1][0])
})

module.exports = {
    getAll,
    create,
    remove,
    modifyCategory,
}