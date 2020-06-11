const express = require('express');

const router = express.Router();


// @route     POST api/users/
// @desc      this is going to register a user
// @access    Public
router.post('/', (req, res) => {
    res.send("Registers a user");
});

module.exports = router;