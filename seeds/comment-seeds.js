//importing dependencies

const Comment = require('../models/comment');

//data to input

//data array to seed
const commentData = [
    {
        comment: 'Tubular!',
        user_id: 1,
        blog_id: 1
    },
    {
        comment: 'Righteous!',
        user_id: 2,
        blog_id: 2
    },
    {
        comment: 'WOOOOOO!',
        user_id: 3,
        blog_id: 3
    }
];

//bulk creating data using array
const seedComment = () => Comment.bulkCreate(commentData);

module.exports = seedComment