const express = require('express');

const router = express.Router();


// @route     GET api/auth/
// @desc      this is going to get a logged in user
// @access    Private
router.get('/', (req, res) => {
    res.send("Gets  a logged in user");
});

// @route     POST api/auth/
// @desc      this is going to AUTHENTICATE a user
// @access    Public
router.post('/', (req, res) => {
    res.send("this one authenticates a user");
});

module.exports = router;