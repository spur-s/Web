const UserTest = require('../model/users');
const mongoose = require('mongoose');
const url = 'mongodb://localhost:27017/test_merogantaya';
beforeAll(async () => {
 await mongoose.connect(url, {
 useNewUrlParser: true,
 useCreateIndex: true
 });
});
afterAll(async () => {
 await mongoose.connection.close();
});
describe('Users Schema', () => {
//the code below is for insert testing
 it('Signup User', () => {
 const userTest = {
     'firstname':'Sparsh',
     'lastname':'Aryal',
     'username':'Sparsh',
     'password':'qwert123'
     
   
 };

 return UserTest.create(userTest)
 .then((userdetails) => {
 expect(userdetails.username).toEqual('Sparsh');
 });
 });

//the code below is for update testing
it('to test the update', async () => {
    return UserTest.findOneAndUpdate('5d2378555ac8a40234bb8d55',
   {$set : {username:'t'}})
    .then((userdetails)=>{
    expect(userdetails.username).toEqual('t')
    })
   });


   


})