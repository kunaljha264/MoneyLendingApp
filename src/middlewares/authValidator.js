const jwt = require('jsonwebtoken');
const {JWT_KEY} = require('../config/serverConfig');

const calculateAge = (dob)=>{
    const currentDate = new Date();
    const birthDate = new Date(dob);
 
    let age = currentDate.getFullYear() - birthDate.getFullYear();

    const monthDiff = currentDate.getMonth() - birthDate.getMonth();
  
    const dateDiff = birthDate.getDate() - currentDate.getDate();
    if((monthDiff ==0 && dateDiff>0 ) || monthDiff <0 ){
        age --;
    }
    return age;

    // Get the diff of year of currentDate and birthDate of user
    // Also find the diff in month, if diff in month is greater than 0 (Present Date: 2024/7/19 , DOB: 2000/5/20 ) then there is no effect on age
    // But if the diff in month is less than 0 i.e (Present Date : 2024/7/19 , DOB : 2000/9/20) we can't say the age is 24, so decrease age with count 1
    // If there is no difference in month, figure out the dateDiff to get whether we need to deduct the age 
}

const isUser = (req,res,next)=>{
    const dob = req.body.dob;
    const monthlySalary = req.body.monthlySalary;
    console.log(monthlySalary);
    const userAge = calculateAge(dob);
    console.log(userAge);
    if(userAge<20 && monthlySalary<25000){
        return res.status(400).json({ message: 'User must be above 20 years of age and Monthly salary must be 25k or more.' });
    }else if(userAge<20){
        return res.status(400).json({ message: 'User must be above 20 years of age.' });
    }else if(monthlySalary<25000){
        return res.status(400).json({ message: 'Monthly salary must be 25k or more.' });
    }

    // While SignIn, userAge should be more than 20 years, so checked this with the help of function
    // Initially monthlySalary was being checked in Schema Level
    // So there was a call to DB to check, which we can prevent at upfront level, thus reducing the DB call
    next();
}

const validateUserAuth = (req,res,next) =>{
 
    if(!req.body.email || !req.body.password){
        return res.status(400).json({
            message:"Something went wrong",
            success:false,
            data:{},
            err:"Email or password is missing"
        })
    }
    // When hitting the /login route, if user doesn't provide any of the one field among email and password, send the error stating email or pwd missing
    next();

}

const isAuthenticated = (req,res,next)=>{
    let token = req.headers['authorization']
    // If token is not present send invalid token
    if(!token){
        return res.status(401).json({
            message: 'Unauthorized, Access Denied',
        })
    }
    token = token.split(' ')[1]; // get the token from headers and bearer token section
    // The token will be in the form of bearer token
    // Split with space and we will get array ['Bearer', 'token'] then take arr[1]

    jwt.verify(token, JWT_KEY, (error, user)=>{
        if(error){
            return res.status(403).json({
                message : "Unauthorized, Access Denied",
            })
        }
        req.user = user;
        next();
    });

    // Verify the token by jwt.verify and if token doesn't matches in error first callback we will get error and send some message
    // If matches add user to the request object so that when hitting the /user or /borrow route we can extract the userId or userEmail from req object
    

}
module.exports = {
    isUser,
    validateUserAuth,
    isAuthenticated,
}
    