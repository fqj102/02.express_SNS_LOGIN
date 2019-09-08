const express = require('express');
const router = express.Router();
const path = require('path');


router.get('/home', (req, res, next) => {
  res.sendFile(path.join(__dirname, '../public', 'index.html'));
});

module.exports = router;