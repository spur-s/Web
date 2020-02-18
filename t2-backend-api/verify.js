//to check for normal user
module.exports = function (req, res, next) {
    console.log(req.user);
     if (!req.user) {
        return res.status(401).send("Access Denied");
       
    
     } else {
         next();
     }
 }
 
 