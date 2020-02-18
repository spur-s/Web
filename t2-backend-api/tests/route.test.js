const VehicleRouteTest = require('../model/vehicleroute');
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
describe('Routes Schema', () => {
//the code below is for insert testing
 it('Add Routes', () => {
 const routeTest = {
    'routename':'Kapan-kalanki',
    'stop':['5d1f4b91c97b0127389076e3','5d1f4bd17ebdb80164d545eb'],
    'type':'Bus',
    'cost':20
 };

 return VehicleRouteTest.create(routeTest)
 .then((routedetails) => {
 expect(routedetails.routename).toEqual('Kapan-kalanki');
 });
 });


//the code below is for delete testing
 it('to test whether delete function works or not', async () => {
 const status = await VehicleRouteTest.deleteMany();
 expect(status.ok).toBe(1);
});




})