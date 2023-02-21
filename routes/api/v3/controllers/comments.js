import express from 'express';
var router = express.Router();

router.get('/', async function(req, res, next) {
    try {
        let commentPostId = req.query.postID
        let allComments = await req.models.Comment.find({post: commentPostId})

        res.json(allComments)
    } catch(err) {
        res.status(500).json({"status": "error", "error": err})
    }
});

router.post('/', async(req,res) => {
    try{
        if(req.session.isAuthenticated){

            let saveComment = new req.models.Comment({
                username: req.session.account.username,
                comment: req.body.newComment,
                post: req.body.postID,
                created_date: new Date().toISOString()
            })
            
            await saveComment.save()
        
            res.json({"status":"success"})
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