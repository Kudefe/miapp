const mongoose = require('mongoose');

const AdminSchema = mongoose.Schema({
  name:{
  type: String,
  required: true
},
username:{
  type: String,
  required: true
},
email:{
  type: String,
  require: true
},
password: {
  type: String,
  required: true
}
})

const Admin = module.exports = mongoose.model('Admin', AdminSchema)
