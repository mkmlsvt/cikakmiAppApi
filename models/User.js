const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema ({
    id:String,
    groups : [],
    username : {
        type : String,
        required : true,
        unique : true,
        minlength : 5
    },
    password : {
        required : true,
        type : String,
        minlength : 4
    },
    birthday : Date,
    mail : {
        type : String,
        required : true,
        unique : true
    },
    tel : String,
    durum : String
});

module.exports = mongoose.model('Users', UserSchema, 'Users');
