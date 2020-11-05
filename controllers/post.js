const session = require('express-session')
const db = require('../models')
const Post = db.Post
const Category = db.Category
const Admin = db.Admin

const postController = {
    index: (req, res) => {
        Post.findAll({
            include: Category
        }).then( posts => {
            res.render('index', {
                posts
            })
        })
    },
    editor: (req, res) => {
        res.render('editor')
    },
    handleAdd: (req, res) => {
        const {title, content, categoryId} = req.body
        Post.create({
            title,
            content,
            categoryId
        }).then( () => {
            res.redirect('/')
        })
    },
    handleDelete: (req, res) => {
        Admin.findOne({
            where:{
                admin: res.locals.admin
            }
        }).then( () => {
            Post.destroy({
                where: {
                    id: req.params.id
                }
            }).then( () => {
                res.redirect('/admin')
            })
        }).catch( err => {
            return res.redirect('/admin')
        })
    }
}

module.exports = postController
