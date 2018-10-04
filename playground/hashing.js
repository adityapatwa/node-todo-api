const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

let password = '123abcd!';

bcrypt.genSalt(10, (err, salt) => {
   bcrypt.hash(password, salt, (err, hash) => {
       console.log(hash);
   })
});

let hashedPassword = '$2a$10$RVI4ITUhGODJqVObGVUNt.uGFHXFLYzS5nanE5LXUIZ4.WK32a3La'
bcrypt.compare(password, hashedPassword, (err, res) => {

});

// let data = {
//     id: 9
// };
//
// let token = jwt.sign(data, '123abcd');
// console.log(token);
//
// let decoded = jwt.verify(token, '123abcd');
// console.log(decoded);
// //
// let message = 'I am user number 1';
// let hash = SHA256(message).toString();
//
// console.log(`Message: ${message}`);
// console.log(`Hash: ${hash}`);
//
// let data = {
//     id: 4
// };
//
// let token = {
//     data,
//     hash: SHA256(JSON.stringify(data) + 'somesecret').toString()
// };
//
// token.data.id = 5;
//
// let resultHash = SHA256(JSON.stringify(token.data) + 'somesecret').toString();
//
// if (resultHash === token.hash) {
//     console.log('Data was not changed');
// } else {
//     console.log('Data was changed');
// }