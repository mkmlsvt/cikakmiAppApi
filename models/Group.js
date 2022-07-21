const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GroupShema = new Schema({
    id:String,
    code:String,
    name : {
        type : String,    
        required : true
    },
    members : [{
        type: mongoose.SchemaTypes.ObjectId
    }]
})

module.exports = mongoose.model('Groups',GroupShema,'Groups');
