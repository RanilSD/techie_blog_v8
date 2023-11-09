//importing dependencies

const {User} = require('../models')

//defining data to seed

  // Define array of data to seed
  const userData = [
    {
        user_name: 'user1',
        email: 'user#1@hotmail.com',
        password: 'password1',
    },
    {
        user_name: 'user2',
        email: 'user#2@hotmail.com',
        password: 'password2',
    },
    {
        user_name: 'user3',
        email: 'user#3@hotmail.com',
        password: 'password3',
    }
];

//creating bulk data from the array
const seedUser = () => User.bulkCreate(userData);

module.exports = seedUser