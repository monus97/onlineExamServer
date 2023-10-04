const mongoose = require("mongoose")
const skillSchema = mongoose.Schema({
    skillName : {
        type : String
    }
})
skillSchema.set("timestamps", true);
module.exports = mongoose.model('skill',skillSchema)