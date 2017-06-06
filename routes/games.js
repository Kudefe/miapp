const express = require('express');
const router = express.Router()

let Interview = require('../models/interview')

//por ahora esta será la primera página
router.get('/', (req, res) => {
  res.render('games')
})

module.exports = router;
