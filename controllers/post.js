const session = require('express-session')
const db = require('../models')
const Post = db.Post
const Category = db.Category
const Admin = db.Admin

const postController = {
    // Index page
    index: (req, res) => {
        Post.findAll({
            include: Category
        }).then( posts => {
            res.render('index', {
                posts
            })
        }).catch( error => {
            console.log(error)
            return res.redirect('/')
        })
    },
    // Show one post 
    showOnePost: (req, res, next) => {
        Post.findOne({
            include: Category,
            where: {
                id: req.params.id
            }
        }).then( post => {
            if (!post) {
                req.flash('errorMessage', `Can not find post id:${req.params.id}`)
                return res.redirect('/')
            }
            res.render('index', {
                post
            })
        }).catch( error => {
            return next()
        })
    },
    // Show posts of one category 
    showCategoryPosts: (req, res) => {
        Post.findAll({
            include: Category,
            where: {
                CategoryId: req.params.id
            }
        }).then( posts => {
            res.render('index', {
                posts
            })
        }).catch( error => {
            return next()
        })

    },
    // Editor
    editor: (req, res) => {
        res.render('editor')
    },
    // Editor for a single post
    postEditor: (req, res) => {
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
                if (!post) {
                    req.flash('errorMessage', `Can not find post id:${req.params.id}`)
                    return res.redirect('/')
                }
                res.render('editor', {
                    post
                })
            })
        }).catch( err => {
            return res.redirect('/')
        })
    },
    // Add post handler
    handleAdd: (req, res) => {
        const {title, content, categoryId} = req.body
        Admin.findOne({
            where:{
                admin: res.locals.admin
            }
        }).then( (admin) => {
            if (!admin) {
                return res.redirect('/')
            }
            Post.create({
                title,
                content,
                categoryId
            }).then( () => {
                res.redirect('/')
            }).catch( err => {
                return res.redirect('/')
            })
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
    // Single post edit handler
    handleEdit: (req, res) => {
        Admin.findOne({
            where:{
                admin: res.locals.admin
            }
        }).then( (admin) => {
            if (!admin) {
                return res.redirect('/')
            }
            const {title, content, categoryId} = req.body
            Post.update({title, content, categoryId}, {
                where: {
                    id: req.params.id
                }
            }).then( () => {
                res.redirect('/')
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
