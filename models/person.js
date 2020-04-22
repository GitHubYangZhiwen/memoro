const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PersonSchema = new Schema({
    username: {type: String, required: true},
    password: {type: String, required: true},
    tel: {type: String, required: true},
    email: {type: String, required: true}
});

PersonSchema
.virtual('identity')
.get(function() {
    return '用户名：' + this.username + ';电话：' + this.tel + ';邮箱：' + this.email + ';';
})

PersonSchema
.virtual('identity-en')
.get(function() {
    return 'Name:' + this.username + ';Tel:' + this.tel + ';email:' + this.email + ';';
})

module.exports = mongoose.model('Person', PersonSchema);