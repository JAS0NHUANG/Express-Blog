const db = require('../models')
const Category = db.Category


const categoryController = {
    listCategory: (req, res) => {
        Category.findAll()
        .then( categories => {
            res.render('category', {
                categories
            })
        })
    },
    handleAddCategory: (req, res, next) => {
        const {categoryName} = req.body
        if (!categoryName) {
            console.log('error')
            next()
        }
        Category.create({
            categoryName 
        }).then ( () => {
            console.log('done')
        }).catch( err =>{
            consoel.log(err)
        })
    }
}

module.exports = categoryController
