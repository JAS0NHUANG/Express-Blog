const session = require('express-session')
const bcrypt = require('bcrypt')
const db = require('../models')
const Post = db.Post
const Category = db.Category
const Admin = db.Admin


const adminController = {
    adminPage: (req, res) => {
        Post.findAll({
            include: Category
        }).then( posts => {
            res.render('admin', {
                posts
            })
        })
    },
    loginPage: (req, res) => {
        res.render('login')
    },
    handleLogin: (req, res, next) => {
        const {admin, password} = req.body 
        if (!admin || !password) {
            return next()
        }
        Admin.findOne({
            where: {
                admin
            }
        }).then( admin => {
            console.log('ok')
            if (!admin) {
                return next()
            }
            console.log('here')
            console.log(admin.admin)
            console.log(admin.password)
            console.log(password)
            bcrypt.compare(password, admin.password, (err, isSuccess) => {
                console.log(isSuccess)
                if (err || !isSuccess) {
                    console.log('hello')
                    console.log(err)
                    return res.redirect('/')
                }
                console.log(admin.admin)
                req.session.admin = admin.admin
                console.log('admin in session' + req.session.admin)
                res.redirect('/admin')
            })
        }).catch( err => {
            console.log(err)
            return next()
        })
    }
}

module.exports = adminController
