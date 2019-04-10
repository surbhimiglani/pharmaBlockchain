var mongoose= require('mongoose');
var Schema=mongoose.Schema;

var schema=new Schema({
 drugid: {type: String, required: true},
 holder: {type: String, required: true}
});

module.exports=mongoose.model('Drug', schema);