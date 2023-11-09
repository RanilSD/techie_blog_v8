//importing dependencies

const { Model, DataTypes } = require('sequelize');
const sequelize = require('../techie_blog_v8/config/connection');

//initializing the product model

class Blog extends Model {}

    //layout of the model
    Blog.init(

        //defining attributes
        {
            id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
            },
            title: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            content: {
                type: DataTypes.STRING,
            },
            user_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'User',
                    key: 'id'
                }
            },
            date_created: {
                type: DataTypes.DATE,
                allowNull: true,
                defaultValue: DataTypes.NOW,
            },
        },

        // Model Options
        {
            sequelize,
            timestamps: false,
            freezeTableName: true,
            underscored: true,
            modelName: 'blog',
        }
    );

    module.exports = Blog;
    