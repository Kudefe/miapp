const mongoose = require('mongoose');

//interview Schema
let InterviewSchema = new mongoose.Schema({
  title:{
  type: String,
  required: true
  },
  author:{
    type: String,
    required: true
  },
  body:{
    type: String,
    require: true
  },
  //se puede poner fecha como tipo?
  date: {
    type: Date,
    require: true
  },
  units: {
    type: Number,
    require: true
  },
  language: {
    type: String,
    require: true
  },
  pages: {
    type: Number,
    require: true
  }
})

let Interview = module.exports = mongoose.model('Interview', InterviewSchema)
