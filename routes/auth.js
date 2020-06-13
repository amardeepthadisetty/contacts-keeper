const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

//import middleware
const Auth = require('../middleware/auth');


// @route     GET api/auth/
// @desc      this is going to get a logged in user information
// @access    Private
router.get('/', Auth, async (req, res) => {
    
    try {
        const user = await User.findById(req.user.id).select(' -password ');
        if (!user) {
            return res.status(400).json({ msg: 'User not found' });

        }
        return res.status(200).json(user);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});



// @route     POST api/auth/
// @desc      this is going to AUTHENTICATE a user
// @access    Public
router.post('/', [
    check('email', "Please enter a valid email address").isEmail().normalizeEmail(),
    check('password', "Password is required").isLength({ min: 5 }) ,

], async  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password }  = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).send({ msg: 'Invalid credentials' });

        }
        
        const isMatch = await bcrypt.compare(password, user.password );

        if (!isMatch) {
          return  res.status(400).send({ msg: 'Invalid Credentials' });
        }

        const payload = {
            user: {
                id: user.id
            }
        };
        
        //return res.json({ secret: config.get('jwtSecret') });

        jwt.sign(payload, config.get('jwtSecret'), {
            expiresIn: 360000
        }, (err, token) => {
            if (err) throw err;
            res.json({ token: token });
        });


        
    } catch (error) {  
        console.error(error.message);
        res.status(500).send('Server Error');
    }


});

module.exports = router;