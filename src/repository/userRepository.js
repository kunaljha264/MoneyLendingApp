const User = require('../models/user');

class UserRepository{

    async create(data){
        try {
          
            const user = await User.create(data);
            return user;
        } catch (error) {
            console.log("Something went wrong at repository layer");
            throw error;
        }
    }

    async getByEmail(userEmail){
        try{
            const user = await User.findOne({email : userEmail});
            return user;
        }catch(error){
            console.log("Something went wrong at repository layer");
            throw error;
        }
    }
}

module.exports = UserRepository;