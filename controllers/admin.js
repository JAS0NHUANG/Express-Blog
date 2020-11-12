// npm modules
const session = require('express-session')
const bcrypt = require('bcrypt')

// db
const db = require('../models')
const Post = db.Post
const Category = db.Category
const Admin = db.Admin

// controller
const adminController = {
    // Admin page
    adminPage: (req, res) => {
        Post.findAll({
            include: Category
        }).then( posts => {
            res.render('admin', {
                posts
            })
        }).catch( error => {
            console.log(error)
            return next()
        })
    },
    // Login page
    loginPage: (req, res) => {
        res.render('login')
    },
    // Handle login
    handleLogin: (req, res, next) => {
        const {admin, password} = req.body 
        if (!admin || !password) {
            req.flash('errorMessage', 'Please provide correct admin name and password.')
            return res.redirect('/login')
        }
        Admin.findOne({
            where: {
                admin
            }
        }).then( admin => {
            if (!admin) {
                req.flash('errorMessage', 'Please provide correct admin name and password.')
                return res.redirect('/login')
            }
            bcrypt.compare(password, admin.password, (err, isSuccess) => {
                console.log(isSuccess)
                if (err || !isSuccess) {
                    req.flash('errorMessage', 'Please provide correct admin name and password.')
                    return res.redirect('/login')
                }
                req.session.admin = admin.admin
                res.redirect('/admin')
            })
        }).catch( error => {
            console.log(error)
            return next()
        })
    },
    // Handle logout
    handleLogout: (req, res) => {
        req.session.admin = null
        res.redirect('/')
    }
}

module.exports = adminController
