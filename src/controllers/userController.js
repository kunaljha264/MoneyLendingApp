const UserRepository = require("../repository/userRepository");
const userRepository = new UserRepository();
const jwt = require('jsonwebtoken');
const {JWT_KEY} = require('../config/serverConfig');
const userSignIn = async(req,res)=>{
    try{
        // console.log(req.body);
        const { phone, email, name, dob, monthlySalary, password } = req.body;
        const purchasePower = calculatePurchasePower(monthlySalary);
        // Calculate the purchasePower of an individual and store in the DB while signIn
        // At the time of updating the PurchasePower it will be helpful
        const newUser = await userRepository.create({
            phone,
            email,
            name,
            dob,
            monthlySalary,
            password,
            status : 'Approved',
            purchasePower : purchasePower
        })
        return res.status(200).json({
            message : "User registered successfully",
        })
    
    }catch(error){
        if(error.name == "ValidationError"){
            const errorMessage = error.errors.monthlySalary ? error.errors.monthlySalary.message : error.message;
            return res.status(400).json({
                message : errorMessage,
            });
        }
        return res.status(500).json({
            data:{},
            success:false,
            err:error.explanation ,
            message:error.message,
        })
    }
}


const userLogIn = async(req,res)=>{
    try{
        const {email, password}  = req.body;
        const user = await userRepository.getByEmail(email);
        // Written a getByEmail function in the repository, so using it to uniquely identify the user
        // getById can also be used to uniquely identify, but since I had written one function so didn't wrote another.
        if(!user){
            return res.status(400).json({
                message : "Email of Password is Incorrect"
            })
        }
        const passwordMatch = await user.comparePassword(password);
        
        if(!passwordMatch){
            return res.status(400).json({
                message : "Email or Password is incorrect",
            })
        }
        // If user not Present or Password doesn't match return message stating Email or Password is incorrect
        // If all case passed, create token and send it to frontend
        const newJWT = jwt.sign({email:email, id:user.id}, JWT_KEY, {expiresIn :'1h'});
        
        return res.status(200).json({
            message : 'Login successful', 
            token : newJWT
        });
        
    }catch(error){
        return res.status(500).json({
            data:{},
            success:false,
            err:error.explanation ,
            message:error.message,
        })
    }
}


const getUser = async(req,res)=>{
    try{
        const userEmail = req.user.email;
        // While checking for validation, we have added user field in req object. 
        // And since our JWT token is based on userEmail and userId, verifying the token will yield us the original data
        // and we will find the user in db with that information
        const user = await userRepository.getByEmail(userEmail);
        if(!user){
            return res.status(404).json({ message: 'User not found' });
        }
     

        return res.status(200).json({
            purchasePowerAmount : user.purchasePower,
            phoneNumber : user.phone,
            email : user.email,
            DateofRegistration : user.registrationDate.toISOString().split('T')[0], // to  show date in YY-MM-DD format
            DOB : user.dob.toISOString().split('T')[0],
            monthlySalary : user.monthlySalary
        })
    }catch(error){
        return res.status(500).json({
            data:{},
            success:false,
            err:error.explanation ,
            message:error.message,
        })
    }
}

const borrowMoney = async(req,res)=>{
    try{
        const userEmail = req.user.email;
        const { borrowAmount, tenureMonths} = req.body;

        const user = await userRepository.getByEmail(userEmail);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const purchasePower = user.purchasePower;
        // If user enters borrowAmount>purchasePower return a message stating borrowAmount exceeds
        if (borrowAmount > user.purchasePower) {  
           return res.status(400).json({
                message : "Borrow amount exceeds Purchase power",
           })
        }
        // Calculate the monthlyRepayment/ EMI based on business logic
        // Used EMI calculation formula
        // EMI = [P x R x (1+R) ^N]/ [(1+R) ^ (N-1)],
        // EMI	is the Equated Monthly Instalment
        // P	is the principal loan amount
        // R	is the monthly interest rate (annual interest rate divided by 12)
        // N	is the number of monthly instalments or the loan tenure in months
        

        const interestRate = 8;
        const monthlyRepayment = calcMonthlyRepayment(borrowAmount, interestRate, tenureMonths);
        const updatedPurchasePower = purchasePower - borrowAmount;

        // Save the updatedPurchasePower in DB
        user.purchasePower = updatedPurchasePower;
        await user.save();

        return res.status(200).json({
            updatedPurchasePower : updatedPurchasePower,
            monthlyRepayment : monthlyRepayment,
        })
    }catch(error){
        return res.status(500).json({
            data:{},
            success:false,
            err:error.explanation ,
            message:error.message,
        })
    }
}

const calcMonthlyRepayment = (principal, annualInterestRate, tenureMonths) => {
    let monthlyInterestRate = annualInterestRate / 12 /100;
    let onePlusRPowerN = Math.pow(1 + monthlyInterestRate, tenureMonths);

    let monthlyRepaymet = (principal * monthlyInterestRate * onePlusRPowerN) / (onePlusRPowerN - 1);
    return parseFloat(monthlyRepaymet.toFixed(2));
};

const calculatePurchasePower = (monthlySalary) => {
    let purchasePower;
    if (monthlySalary < 30000) {
        purchasePower = monthlySalary * 1.5; // 150% of monthly salary
    } else if (monthlySalary < 50000) {
        purchasePower = monthlySalary * 2; // 200% of monthly salary
    } else {
        purchasePower = monthlySalary * 3; // 300% of monthly salary, 
    }
    return purchasePower;
};

module.exports = {
    userSignIn,
    userLogIn,
    getUser,
    borrowMoney,
}