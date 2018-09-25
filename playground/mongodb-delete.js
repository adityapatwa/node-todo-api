const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', {useNewUrlParser: true}, (err, client) => {
    if (err) {
        return console.log('Unable to connect to MongoDB server');
    }
    console.log('Connected to MongoDB server');
    const db = client.db('TodoApp');

    // deleteMany
    // db.collection('Todos').deleteMany({text: 'Eat Lunch'}).then((result) => {
    //    console.log(result);
    // });

    // deleteOne
    // db.collection('Todos').deleteOne({text: 'Eat Lunch'}).then((result) => {
    //     console.log(result);
    // });

    // findOneAndDelete
    // db.collection('Todos').findOneAndDelete({completed: false}).then((result) => {
    //    console.log(result);
    // });

    // db.collection('Users').deleteMany({name: 'Aditya Patwa'}).then((result) => {
    //    console.log(result);
    // });

    db.collection('Users').findOneAndDelete({_id: new ObjectID('5ba9a0a8d929b44d6b80b5dd')}).then((results) => {
        console.log(results);
    });

    //client.close();
});

