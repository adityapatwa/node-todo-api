const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

// let id = '5baa67a43bd5cc492c75d04e';
//
// if (!ObjectID.isValid(id)) {
//     return console.log('Id is not valid');
// }
//
// Todo.find({
//     _id: id
// }).then((todos) => {
//     console.log('Todos', todos)
// });
//
// Todo.findOne({
//     _id: id
// }).then((todo) => {
//     console.log('Todo Find One', todo)
// });
//
// Todo.findById(id).then((todo) => {
//     if(!todo) {
//         return console.log('Id not found');
//     }
//     console.log('Todo Find By Id', todo)
// }).catch((error) => console.log(error));

let userId = '5ba9a984e32c8040cc3ce0cf';
User.findById(userId).then((user) => {
    if (!user) {
        return console.log('User not found');
    }
    console.log('User', user);
}).catch((err) => console.log(err));

