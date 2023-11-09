//importing dependencies

const User = require('./user');
const Blog = require('./blog');
const Comment = require('./comment');

//users & blogs

    //a blog belongs to one user
    Blog.belongsTo(User, {
        foreignKey:'user_id'
    });

    //a user has many blogs
    User.hasMany(Blog, {
        foreignKey: 'user_id'
    });

//comments and users

    //a comment belongs to one user. This foreign key adds a user_id to comment
    Comment.belongsTo(User, {
        foreignKey:'user_id'
    });

    //a user has many comments, creating foreign key in the Comments Table (as user_id) so the user can have many comments and not one
    User.hasMany(Comment, {
        foreignKey: 'user_id',
    });

//comments & blogs

    //a comment belongs to one blog
    Comment.belongsTo(Blog, {
        foreignKey:'blog_id'
    });

    //a blog has many comments
    Blog.hasMany(Comment, {
        foreignKey:'blog_id',
        onDelete: 'CASCADE'
    })

    module.exports = {
        User,
        Blog,
    };