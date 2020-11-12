const db = require('../models')
const Category = db.Category
const Post = db.Post

const categoryController = {
    // List all categories
    listCategory: (req, res) => {
        Category.findAll()
        .then( categories => {
            res.render('category', {
                categories
            })
        })
    },
    // Add category handler
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
    },
    // Edit category handler
    handleEditCategory: (req, res, next) => {
        const {categoryName} = req.body
        if (!categoryName) {
            console.log('error')
            next()
        }
        Category.update({categoryName}, {
            where: {
                id: req.params.id
            }
        }).then ( () => {
            console.log('done')
        }).catch( err =>{
            consoel.log(err)
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
                console.log("Still have articles in this category!")
                next()
            }
            Category.update({categoryName}, {
                where: {
                    id: req.params.id
                }
            }).then ( () => {
                console.log('done')
            }).catch( err =>{
                consoel.log(err)
            })
        })
    }

}

module.exports = categoryController
