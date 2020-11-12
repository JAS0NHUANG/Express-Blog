const db = require('../models')
const Category = db.Category
const Post = db.Post

const categoryController = {
    // List all categories
    listCategory: (req, res, next) => {
        Category.findAll()
        .then( categories => {
            res.render('category', {
                categories
            })
        }).catch( error => {
            consoel.log(error)
            return next()
        })
    },
    // Add category handler
    handleAddCategory: (req, res, next) => {
        const {categoryName} = req.body
        if (!categoryName) {
            console.log('error')
            return next()
        }
        Category.create({
            categoryName 
        }).then ( () => {
            console.log('done')
        }).catch( err =>{
            consoel.log(error)
            return next()
        })
    },
    // Edit category handler
    handleEditCategory: (req, res, next) => {
        const {categoryName} = req.body
        if (!categoryName) {
            console.log('error')
            return next()
        }
        Category.update({categoryName}, {
            where: {
                id: req.params.id
            }
        }).then ( () => {
            console.log('done')
        }).catch( error =>{
            consoel.log(error)
            return next()
        })
    },
    // Delete category handler
    handleDeleteCategory: (req, res, next) => {
        const categoryId = req.params.id
        Post.findAll({
            where: {
                categoryId
            }
        }).then ( posts => {
            if (posts.length !== 0){
                req.flash('errorMessage', 'Still have articles in this category!')
                return next()
            }
            Category.update({categoryName}, {
                where: {
                    id: req.params.id
                }
            }).then ( () => {
                console.log('done')
            }).catch( error =>{
                consoel.log(error)
                return next()
            })
        })
    }
}

module.exports = categoryController
