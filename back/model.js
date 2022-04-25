const mongoose = require("mongoose");

const ficheSchema = new mongoose.Schema({

 
  prenom: {
    type: String,
    required: true,
  },
  armure: {
    type: String,
    required: true,
  },
  technique:{
    type: String,
    required: true,
  },
  photo:{
    type: String
  },
  description:{
    type: String
  }
});



const cdz = mongoose.model("cdz", ficheSchema);

module.exports = cdz;