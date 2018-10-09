require('./config/config');

const express = require('express');
const bodyParse = require('body-parser');
const _ = require('lodash');
const {ObjectID} = require('mongodb');

const {mongoose} = require('./db/mongoose');
const {Todo} = require('./models/todo');
const {User} = require('./models/user');
const {authenticate} = require('./middleware/authenticate');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParse.json());

// Create a new todo
app.post('/todos', authenticate, (req, res) => {
    let todo = new Todo({
        text: req.body.text,
        _createdBy: req.user._id
    });

    todo.save().then((todo) => {
        res.send({todo});
    }, (error) => {
        res.status(400).send(error);
    });
});

// Fetch all todos
app.get('/todos', authenticate, (req, res) => {
    Todo.find({
        _createdBy: req.user._id
    }).then((todos) => {
        res.send({
            todos,
        })
    }, (error) => {
        res.status(400).send(error);
    });
});

//Fetch todo by Id
app.get('/todos/:id', authenticate, (req, res) => {
    let id = req.params.id;

    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }
    Todo.findOne({
        _id: id,
        _createdBy: req.user._id
    }).then((todo) => {
        if (!todo) {
            return res.status(404).send();
        }

        res.send({todo});
    }).catch((error) => {
        res.status(400).send(error);
    });
});

// Delete a todo
app.delete('/todos/:id', authenticate, (req, res) => {
    let id = req.params.id;

    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }
    Todo.findOneAndDelete({
        _id: id,
        _createdBy: req.user._id
    }).then((todo) => {
        if (!todo) {
            return res.status(404).send();
        }

        res.send({todo});
    }).catch((error) => {
        res.status(400).send(error);
    });
});

// Patch a todo
app.patch('/todos/:id', authenticate, (req, res) => {
    let id = req.params.id;
    let body = _.pick(req.body, ['text', 'completed']);

    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }

    if(_.isBoolean(body.completed) && body.completed) {
        body.completedAt = new Date().getTime();
    } else {
        body.completed = false;
        body.completedAt = null;
    }

    Todo.findOneAndUpdate({
        _id: id,
        _createdBy: req.user._id
    }, {$set: body}, {new: true}).then((todo) => {
        if(!todo) {
            return res.status(404).send();
        }
        res.send({todo});
    }).catch((error) => {
        res.status(404).send(error);
    });
});

// Create a new user
app.post('/users', (req, res) => {
    let body = _.pick(req.body, ['email', 'password']);
    let user = new User(body);

    user.save().then(() => {
        return user.generateAuthToken();
    }).then((token) => {
        res.header({'x-auth': token}).send(user);
    }).catch((error) => {
        res.status(400).send(error);
    });
});

app.get('/users/me', authenticate, (req, res) => {
    res.send(req.user);
});

// Request for login
app.post('/users/login', (req, res) => {
    let body = _.pick(req.body, ['email', 'password']);

    User.findByCredentials(body.email, body.password).then((user) => {
        return user.generateAuthToken().then((token) => {
            res.header({'x-auth': token}).send(user);
        });
    }).catch((error) => {
        res.status(400).send(error);
    });

});

//Request for logout
app.delete('/users/me/token', authenticate, (req, res) => {
    req.user.removeToken(req.token).then(() => {
        res.status(200).send();
    }, () => {
        res.status(400).send();
    });
});

app.listen(port, () => {
    console.log(`Started on port ${port}`);
});

module.exports = {app};