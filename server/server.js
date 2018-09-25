let mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/TodoApp', {useNewUrlParser: true});

let Todo = mongoose.model('Todo', {
    text: {
        type: String,
        required: true,
        trim: true,
        minlength: 1
    },
    completed: {
        type: Boolean,
        default: false
    },
    completedAt: {
        type: Number,
        default: null
    }
});

// let newTodo = new Todo({
//     text: 'Cook Dinner'
// });
//
// newTodo.save().then((doc) => {
//     console.log(`Saved todo`, doc);
// }, (error) => {
//     console.log(error);
// });

// let newTodo2 = new Todo({
//     text: ' Feed the dog ',
//     completed: true,
//     completedAt: 2131
// });

// newTodo2.save().then((doc) => {
//     console.log(`Saved todo`, doc);
// }, (error) => {
//     console.log('Unable to save object', error);
// });

let User = mongoose.model('User', {
    email: {
        type: String,
        required: true,
        trim: true,
        minlength: 1
    }
});

let newUser = new User({
    email: 'adityapatwa@email.com'
});

newUser.save().then((doc) => {
    console.log(doc);
}, (error) => {
    console.log('Unable to create user', error);
});