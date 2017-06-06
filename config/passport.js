const LocalStrategy = require('passport-local').Strategy
const Admin = require('../models/admin')
const config = require('../config/database')
const bcrypt = require('bcryptjs');

module.exports = (passport) => {
  passport.use(new LocalStrategy((username, password, done) => {
    //match username
    let query = {username:username}
    Admin.findOne(querry, (err, admin) => {
      if(err) throw err
      if(!admin){
        return done(null, false, {message: 'No eres el admin!'})
      }

      //match password
      bcrypt.compare(password, admin.password, (err, isMatch) => {
        if(err) throw err
        if(isMatch){
          return done(null, admin)
        }else {
          return done (null, false, {message: 'Wrong password'})
        }
      })
    })
  }))

  passport.serializeUser((admin, done) => {
    done(null, admin.id)
  })

  passport.deserializeUser((id, done) => {
    Admin.findById(id, (err, user) => {
      done(err, user)
    })
  })
}
