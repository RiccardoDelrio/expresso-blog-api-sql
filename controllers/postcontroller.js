const posts = require('../data/posts');
const connection = require('../data/db');

function index(req, res) {

    const sql= 'SELECT * FROM posts';
    connection.query(sql, (err, results) => {
        if (err) {
            console.error('Error executing query:', err.stack);
            return res.status(500).json({ error: 'Database error' });
        }
        res.json(results);
    
})}





   
function show(req, res) {
    const id = req.params.id;
    
    // Prima query per ottenere il post
    const sqlPost = 'SELECT * FROM posts WHERE id = ?';
    
    connection.query(sqlPost, [id], (err, postResults) => {
        if (err) {
            console.error('Error executing query:', err.stack);
            return res.status(500).json({ error: 'Database error' });
        }

        if (postResults.length === 0) {
            return res.status(404).json({ error: 'Post not found' });
        }

        const post = postResults[0];

        // Seconda query per ottenere i tags
        const sqlTags = `
            SELECT tags.label 
            FROM tags 
            JOIN post_tag ON tags.id = post_tag.tag_id 
            WHERE post_tag.post_id = ?`;

        connection.query(sqlTags, [id], (err, tagResults) => {
            if (err) {
                console.error('Error executing query:', err.stack);
                return res.status(500).json({ error: 'Database error' });
            }

            // Aggiungi i tags al post come array
            post.tags = tagResults.map(tag => tag.label);
            
            res.json(post);
        });
    });
}

function create(req, res) {
    res.send('Aggiunta di un nuovo post');
    console.log(req.body);
    const newPost = {
        title: req.body.title,
        slug: req.body.slug,
        content: req.body.content,
        image: req.body.image,
        tags: req.body.tags,
    }
    posts.push(newPost);
    console.log(posts);
}
function edit(req, res) {
    res.send(`Modifica di un post esistente con id ${req.params.id}`);

}
function update(req, res) {

    const postSlug = req.params.slug;
    const post = posts.find(post => post.slug === postSlug);
    if (!post) {
        return res.status(404).json({
            error: 404,
            message: "post not found"
        });
    }
    post.title = req.body.title
    post.slug = req.body.slug
    post.content = req.body.content
    post.image = req.body.image
    post.tags = req.body.tags
    res.json(post);
    console.log(posts);
}
function destroy(req, res) {
    const id = req.params.id;
    const sql = 'DELETE FROM posts WHERE id = ?';

    connection.query(sql, [id], (err, results) => {
        if (err) {
            console.error('Error executing query:', err.stack);
            return res.status(500).json({ error: 'Database error' });
        }
        res.json({ message: 'Post deleted successfully', results });
    });
}

module.exports = ({ index, show, create, edit, update, destroy });