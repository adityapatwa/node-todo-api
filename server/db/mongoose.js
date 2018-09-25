let mongoose = require('mongoose');

mongoose.Promise = global.Promise;
console.log("================================");
console.log(process.env.MONGODB_URI);
console.log("================================");
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/TodoApp', {useNewUrlParser: true});

module.exports = {mongoose};