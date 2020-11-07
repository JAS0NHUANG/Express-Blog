const session = require('express-session')
const db = require('../models')
const Post = db.Post
const Category = db.Category
const Admin = db.Admin

const postController = {
    // index page
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
    // Add post handler
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
    // Delete post handler
    handleDelete: (req, res) => {
        Admin.findOne({
            where:{
                admin: res.locals.admin
            }
        }).then( (admin) => {
            if (!admin) {
                return res.redirect('/')
            }
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
    },
    // Edit post handler
    handleEdit: (req, res) => {
        Admin.findOne({
            where:{
                admin: res.locals.admin
            }
        }).then( (admin) => {
            if (!admin) {
                return res.redirect('/')
            }
            Post.findOne({
                where: {
                    id: req.params.id
                }
            }).then( (post) => {
                res.render('editor', {
                    post
                })
            })
        }).catch( err => {
            return res.redirect('/')
        })
    },
    // List all post titles
    listPostTitles: (req, res) => {
        Post.findAll({
            include: Category
        }).then( posts => {
            res.render('archive', {
                posts
            })
        })
    },
 
}

module.exports = postController
