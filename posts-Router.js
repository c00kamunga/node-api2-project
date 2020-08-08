const db = require('./data/db')
const router = express.Router()


//GET/api/posts-returns an array of all the post objects container in the database.
router.get('/api/posts', async(req,res) => {
    try {
        const posts = await db.find()
        res.status(200).json(posts)
    } catch (error){
        res
        .status(500)
        .json({ error: 'The posts information could not be retrieved' })
    }
})

//GET Returns the post object with the specified ID.

router.get('/api/post/:id', (req, res) => {
    db.findByID(req.params.id)
    .then(post => {
        if (post.length === 0) {
            return res.status(404)
            .json({ message:'The post with the specified ID does not exist' })
        } else {
            res.status(200).json(post)
        }
    })
    .catch(error => {
        res
        .status(500)
        .json({ error: 'The post information could not be retrieved' })
    })
})

//returns an array of all the comment object associated with the post with specified id.
router.get('/api/posts/:id/comments', (res, res) => {
    db.findPostComments(req.params.id)
    .then(comments => {
        if(comments.length === 0){
            res
            .status(404)
            .json({ message: 'The post with the specified ID does not exist.' })
        } else {
            res
            .status(200)
            .json(comments)
        }
    })
    .catch(error => {
        res
        .status(500)
        .json({ error: 'The comments information not be retrieved.' })
    })
})

//POST creates a post using the information sent inside the request body
router.post('/api/posts', (req, res) => {
    if(!req.body.title && !req.body.contents){
        return res
        .status(400)
        .json({ errorMessage: 'Please provide title and contents for the post' })
    }
    db.insert(req.body)
    .then(id => {
        res.status(201)
        .json(id)
    })
    .catch(error => {
        res
        .status(500)
        .json({ error: "there was an error while saving the post to the database" })
    })
})

// creates a comment for the post with the specified ID using information inside of the request body
router.post('/api/posts/:id/comments', (req, res) => {
    if(!req.body.text){
        res
        .status(400)
        .json({ errorMessage: "Please provide text for the comment." })
    } else if (req.body.post_id !==Number (req.params.id)){
        res
        .status(400)
        .json({ message: "The specified ID does not match the request ID" })
    } else if(!db.findById(req.params.id)) {
        res
        .status(404)
        .json({ message: "The post with the specified ID does not exist" })
    } else {
        db.insertComment(req.body)
        .then(newComment => {
            return res.status(201).json(newComment)
        })
        .catch(error => {
            res
            .status(500)
            .json({ error: "There was an error while saving the post to the database" })
        })
    }
})