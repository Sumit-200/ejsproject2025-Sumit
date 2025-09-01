const express = require('express');
//const multer = require('multer');
const UserController = require('../controllers/UserController');
const router = express.Router();

//http://localhost:3000
//const upload = multer({
//    storage: multer.diskStorage({}),
//    limits: {fieldSize: 10*1024*1024},
//})

router.get('/', (req, res) => {
    res.render('home');
})
router.get('/user/signup', (req, res) => {
    res.render('signup');
})
router.post('/add/user', (req, res) => {
    UserController.addUser(req, res)
})
router.post('/login', (req, res) => {
    UserController.doLogin(req, res);
})
router.get('/student/add/page', (req, res) => {
    res.render('addstudent');
})
module.exports = router;