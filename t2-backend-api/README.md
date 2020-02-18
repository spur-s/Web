# Mero Gantavya (Kathmandu Public Vehicle Route)

Name: Pratigya Sapkota

CollegeID: 170130

Batch: Jan19A

Brief description of the domain of your project!

- It provide public vehicle route details along with fares to this application user.
- It helps people for finding the public vehicle route inside the Kathmandu valley.
- To provide vehicle charge (fare) details and vehicle types (bus, micro bus, tempo) details.
- To minimize the issue of not finding vehicle details inside Kathmandu valley.
- People can knew vehicle fares and get prepared for that before travelling.

## List of Main Features
- User can see the vehicle route along with fare and vehicle type details.
- User can search the vehicle route.
- User can see the route details in google map. A marker is set for user comfort.
- Only the authorized person can access the application i.e. Cookie/Session is setted.
- Admin can add, edit and delete transit details along with transit latitude and longitude.
- Admin can add, edit and delete route details along with vehicle fare and type.
- User/Admin can edit/update their profile details.

## API Documentation
List out your main APIs and its sample input and output!
For User API Request
- http://localhost:4800/users (GET)
  -Allow to see the all users data.
- http://localhost:4800/users/signup (POST)
  -Allow to add user data in database.
- http://localhost:4800/users/profile (GET/PUT)
  -Allow to view and update single user data respectively.

For Stops API Request
- http://localhost:4800/stops (POST)
  -Allow to add stop details in database.
- http://localhost:4800/stops (GET)
  -Allow to view all stops details.
- http://localhost:4800/stops (DELETE)
  -Allow to delete all stops records from database.
- http://localhost:4800/stops/{id} (GET/PUT/DELETE)
  -Allow to view, update and delete single stops data.

For Routes API Request
- http://localhost:4800/routes (POST)
  -Allow to add routes details in database.
- http://localhost:4800/routes (GET)
  -Allow to view all routes details.
- http://localhost:4800/routes (DELETE)
  -Allow to delete all routes records from database.
- http://localhost:4800/routes/{id} (GET/PUT/DELETE)
  -Allow to view, update and delete single routes data.
- http://localhost:4800/routes/{routename} (GET)
  -Allow to view single routes data. Here we can use routename to get the single routes records.