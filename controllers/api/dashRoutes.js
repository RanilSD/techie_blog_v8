//importing dependencies

const router = require('express').Router();
const { User, Blog } = require('../../models');
const Comment = require('../../models/comment');
const withAuth = require('../../techie_blog_v8/utils/auth');

//getting routes

router.get('/', withAuth, async (req, res) => {
            
    try{

        //getting data from blogs DB
        const blogData = await Blog.findAll({
            include: [
                {
                    model: User, 
                },
                {
                    model: Comment,
                },
            ],
            where: {
                user_id: req.session.user_id
            }
        });
        

        //serialzing data for template to read
        const blogs = blogData.map((blog) => blog.get({plain : true}));
        

        //passing serialized data and session flag into db
        res.render('dash', {
            blogs,
            logged_in: req.session.logged_in,
            user_name: req.session.user_name,
            user_id: req.session.user_id,

        });
    }
    catch (err) {
        res.status(500).json(err);
    }
})

//post routes

router.post('/blog', withAuth, async (req, res) => {
    console.log(`trying to create a blog`)
    try {
        console.log(JSON.stringify(req.body));
        const blogData = await Blog.create(req.body);
        res.status(200).json(blogData);
    } 
    catch (err) {
        res.status(400).json(err);
    }
});

//posting new comments associated with blogs and users to db

    // Posts new blogs associated with users to the db
        //Route
        router.post('/blog', withAuth, async (req, res) => {
            console.log(`trying to create a blog`)
            try {
                console.log(JSON.stringify(req.body));
                const blogData = await Blog.create(req.body);
                res.status(200).json(blogData);
            } 
            catch (err) {
                res.status(400).json(err);
            }
        });

    //posting new comments to blogs and users to the db
        //Route
        router.post('/comment', withAuth, async (req, res) => {
            console.log(`reqeust body is ${JSON.stringify(req.body)}`)
            try {
                const commentData = await Comment.create(req.body);
                res.status(200).json(commentData);
            } 
            catch (err) {
                    res.status(400).json(err);
            }
        });

//put routes

//editing existing comment
        // Route
        router.put('/blog/:id', async (req, res) => {
            console.log(`reqeust body is ${JSON.stringify(req.body)}`)
            console.log(req.params.id)
            try {
                await Blog.update(
                    {
                        title: req.body.title,
                        content:req.body.content
                    },
                    {where: {id:req.params.id}}
                )
                res.status(200).json(`blog updated successfully!`);
            } 
            catch (err) {
                    res.status(400).json(err);
            }
        });

//delete routes

//route to delete a blog
router.delete('/blog/:id', async (req, res) => {
    console.log(`reqeust body is ${JSON.stringify(req.body)}`)
    try {
        await Blog.destroy(
            {where: {id: req.params.id}}
        )
        res.status(200).json(`blog deleted successfully.`);
    } 
    catch (err) {
            res.status(400).json(err);
    }
});

module.exports = router;
