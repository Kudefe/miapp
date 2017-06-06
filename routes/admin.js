const express = require('express');
const router = express.Router()
const Admin = require('../models/admin')

router.get('/', (req, res) => {
  Admin.find({}, (err, admin) => {
    if (err) {
      console.log(err);
    } else {
      if (admin.length < 1) {
        res.render('adminregister')
      } else {
        res.render('adminlogin')
      }
    }
  })
  
})

module.exports = router
