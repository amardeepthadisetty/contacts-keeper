const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');

const User = require('../models/User');


// @route     POST api/users/
// @desc      this is going to register a user
// @access    Public
router.post('/', [
    check('name', "Name is required").not().isEmpty(),
    check('email', "Email is required").isEmail().normalizeEmail(),
    check('password', "Password is required with minimum 5 characters").isLength({ min: 5}),

], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty() ) {
        return res.status(400).json({ errors: errors.array() });
    }
    
    try {
        const { name, email, password } = req.body;
        const result = await User.findOne({ email : email });

        if (result) {
            return res.status(400).json({msg: 'Email already exists, please use a different one.'});
        }

        const user = new User({
            name: name,
            email: email,
            password: password
        });

        const salt = await bcrypt.genSalt(10);

        user.password = await bcrypt.hash(password, salt);

        await user.save();

        const payload = {
            user : {
                id : user.id
            }
        }
        //res.status(200).json({ msg: 'User has created successfully ' });
        jwt.sign(payload, config.get('jwtSecret'), {
            expiresIn: 3600
        } , (err, token) => {
                if (err) throw err ;
                res.json({ token });
        } );


    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
        
    }
});

module.exports = router;