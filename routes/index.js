const express =             require('express')
const router =              express.Router()

// controllers
const postController =      require('../controllers/post')
const adminController =     require('../controllers/admin')
const categoryController =  require('../controllers/category')

// admin checker
function isAdmin(req, res, next){
    if (res.locals.admin !== "") {
        return next()
    }
    res.status(401)
}

// routing
// get
router.get('/',                postController.index)
router.get('/post/:id',        postController.showOnePost)
router.get('/editor',          postController.editor)
router.get('/editor/:id',      postController.postEditor)
router.get('/delete/:id',      postController.handleDelete)
router.get('/archive',         postController.listPostTitles)
router.get('/category/:id',    postController.showCategoryPosts)
router.get('/category',        categoryController.listCategory)
router.get('/login',           adminController.loginPage)
router.get('/logout',          adminController.handleLogout)
router.get('/admin',           isAdmin, adminController.adminPage)
router.get('/about',           (req, res) => { res.render('about')})

// post
router.post('/handle-add',                 postController.handleAdd)
router.post('/handle-edit/:id',            postController.handleEdit)
router.post('/handle-login',               adminController.handleLogin)
router.post('/handle-add-category',        categoryController.handleAddCategory)
router.post('/handle-edit-category/:id',   categoryController.handleEditCategory)
router.post('/handle-delete-category/:id', categoryController.handleDeleteCategory)

module.exports = router
