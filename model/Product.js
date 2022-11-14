const mongoose = require('mongoose');
const schema =mongoose.Schema;
const userSchema = schema({
    libelle:{type:String , required:true},
    prix:{type:Number , required:true},
    description:{type:String , required:true},
    quantite:{type:Number , required:true},
    inStock:{type:Boolean , required:true},
}, {timestamps:true});
module.exports=mongoose.model("product",userSchema);