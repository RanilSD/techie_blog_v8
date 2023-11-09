// importing dependencies

const {Blog} = require('../models')

//defining data to input

 //data array to seed
 const blogData = [
    {
        title: 'user1 first blog ever',
        content: 'techblog about consoles',
        user_id: 1

    },
    {
        title: 'user2 first blog',
        content: 'techblog about software',
        user_id: 2
    },
    {
        title: 'user3 first blog',
        content: 'techblog about security',
        user_id: 3
    }
];

//bulk creating the data
const seedBlog = () => Blog.bulkCreate(blogData);

module.exports = seedBlog;