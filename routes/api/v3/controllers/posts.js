import express from 'express';
import getURLPreview from '../utils/urlPreviews.js';
//import session from 'express-session';

var router = express.Router();


//TODO: Add handlers here
router.post('/', async(req,res,next) => {
    if(req.session.isAuthenticated){
        let newPost = new req.models.Post({
            url: req.body.url,
            description: req.body.description,
            username: req.session.account.username,
            created_date: new Date().toISOString()
        })
        
        await newPost.save()
    
        res.json({"status":"success"})
    } else {
        res.status(401).json(
            {
                status: "error",
                error: "not logged in"
             }
        )
    }
})

router.get('/', async function(req, res, next) {
    try {
        let allPosts;
        if(req.query.username) {
            console.log("same name")
            allPosts = await req.models.Post.find({username: req.query.username})
        } else {
            console.log("return all, not same name")
            allPosts = await req.models.Post.find()
        }
        
        let finalJSON = await Promise.all(
        allPosts.map(async post => {
            //make sure it now returns all the fields?
            console.log("start retreiving post", post)
            let postObject = {}
            postObject.description = post.description
            postObject.username = post.username 
            postObject.created_date = post.created_date
            postObject.likes = post.likes
            postObject.id = post._id
            try {
                console.log("print post.url")
                console.log(post.url)

                let newPost = await getURLPreview(post.url)
                postObject.htmlPreview = newPost
            }catch(err) {
                postObject.htmlPreview = "error" + err
            }
            return (postObject)
        })
        )
        res.json(finalJSON)
    } catch(err) {
        res.status(500).json({"status": "error", "error": err})
    }
});

router.post('/like', async(req,res) => {
    try{
        // check if logged in
        if(req.session.isAuthenticated){
            console.log(req.body)
            // find the post with the given ID
            let givenPost = await req.models.Post.findById(req.body.postID)
            // if posts like DOES NOT include the username
            if(!givenPost.likes.includes(req.session.account.username)) {
                givenPost.likes.push(req.session.account.username)
            }
    
            // save and return json
            await givenPost.save()
            res.json({status: "success"})

        } else {
            res.status(401).json(
                {
                    status: "error",
                    error: "not logged in"
                 }
            )
        }
    } catch(err) {
        console.error(err)
        res.status(500).json({"status": "error", "error": err})
    }
})

router.post('/unlike', async(req,res) => {
    try{
        // check if logged in
        if(req.session.isAuthenticated){
            // find the post with the given ID
            let givenPost = await req.models.Post.findById(req.body.postID)
            // if posts like INCLUDES the username
            if(givenPost.likes.includes(req.session.account.username)) {
                // find the index of that username and remove
                const index = givenPost.likes.indexOf(req.session.account.username)
                if (index > -1) {
                    givenPost.likes.splice(index, 1)
                }
            }
    
            // save and return json
            await givenPost.save()
            res.json({status: "success"})

        } else {
            res.status(401).json(
                {
                    status: "error",
                    error: "not logged in"
                 }
            )
        }
    } catch(err) {
        res.status(500).json({"status": "error", "error": err})
    }
})

router.delete('/', async (req,res) => {
    try{
        // check if logged in
        if(req.session.isAuthenticated){
            // find the post with the given ID
            let givenPost = await req.models.Post.findById(req.body.postID)
            // If username of the post isn't the same as the logged in username (in session.account)
            // return json with status 401
            if(givenPost.username != req.session.account.username){
                res.status(401).json(
                    {
                        status: "error",
                        error: "you can only delete your own posts"
                     }
                )
            }
            // delete all comments that refer to givenPost
            await req.models.Comment.deleteMany({post: req.body.postID})
            await req.models.Post.deleteOne({_id: req.body.postID})
            
    
            // save and return json
            res.json({status: "success"})

        } else {
            res.status(401).json(
                {
                    status: "error",
                    error: "not logged in"
                 }
            )
        }
    } catch(err) {
        res.status(500).json({"status": "error", "error": err})
    }
})

export default router;