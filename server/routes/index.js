const express = require('express');
const router = express.Router();

router.use('/groups', require('./groups'));
router.use('/userprofiles', require('./userprofiles'));


module.exports = router;
