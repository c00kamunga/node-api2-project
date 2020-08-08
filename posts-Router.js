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