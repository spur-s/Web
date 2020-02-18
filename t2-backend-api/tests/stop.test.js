const VehicleStopTest = require('../model/vehiclestop');
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
describe('Stops Schema', () => {
//the code below is for insert testing
 it('Add Stops', () => {
 const stopTest = {
    'stopname':'Kapan',
    'lat':13343.1,
    'lon':13435524.2
 };

 return VehicleStopTest.create(stopTest)
 .then((stopdetails) => {
 expect(stopdetails.stopname).toEqual('Kapan');
 });
 });
//the code below is for update testing
it('to test the update', async () => {
   return VehicleStopTest.findOneAndUpdate({_id :'5d23ff8694f919275035514d'},
  {$set : {stopname:"kalankiNew"}})
   .then((pp)=>{
   expect(pp.stopname).toEqual("kalankiNew")
   })
  
  });

// //the code below is for delete testing
 it('to test whether delete function works or not', async () => {
 const status = await VehicleStopTest.deleteMany();
 expect(status.ok).toBe(1);
});

})