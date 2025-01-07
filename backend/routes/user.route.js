const express = require('express');
const router = express.Router();
const {body} = require('express-validator');

const userController = require('../controllers/user.controller');

router.post('/register', [
    body('fullname.firstname').isLength({ min: 3 }).withMessage('Name must be at least 3 characters long'),
    body('email').isEmail().withMessage('Please enter a valid email address'),
    body('password').isLength({ min: 5 }).withMessage('Password must be at least 5 characters long'),
],
userController.create
);


module.exports = router;