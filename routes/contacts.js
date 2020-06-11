const express = require('express');

const router = express.Router();


// @route     GET api/contacts/
// @desc      get all user contacts
// @access    Private
router.get('/', (req, res) => {
    res.send("Get all contacts ");
});

// @route     POST api/contacts/
// @desc      post a contact
// @access    Private
router.post('/', (req, res) => {
    res.send(" Post a contact ");
});


// @route     PUT api/contacts/:id
// @desc      post a contact to update it with id
// @access    Private
router.put('/:id', (req, res) => {
    res.send(" Update a contact ");
});

// @route     DELETE api/contacts/:id
// @desc      DELETE a contact to update it with id
// @access    Private
router.delete('/:id', (req, res) => {
    res.send(" Delete a contact ");
});
module.exports = router;