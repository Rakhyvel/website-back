const express = require('express');
const Post = require("../models/Post");

const router = express.Router();

// GETS ALL POSTS
router.get('/', async (req, res) => {
    try {
        const posts = await Post.find();
        res.json(posts);
    } catch(err) {
	console.log("Encountered an error");
        res.json({message: err});
    }
});

// GET POST
router.get('/:postId', async (req, res) => {
    try {
        const post = await Post.findById(req.params.postId);
        res.json(post);
    } catch(err) {
        res.json({message: err});
    }
});

// SUBMITS POST
router.post('/', async (req, res) => {
    const submission = req.body[0];
    const token = req.body[1];
    if(token === process.env.TOKEN) {
        const post = new Post({
            title: submission.title,
            description: submission.description,
            date: submission.date,
            content: submission.content,
	    private: submission.private
        });

        const savedPost = await post.save();
        try{
            res.json(savedPost);
        } catch(err) {
            res.json({message: err});
        }
    } else {
        console.log("Unauthenticated attempt to post", token);
        res.json({message: "Not authenticated"});
    }
});

// DELETE A POST REQUEST
router.delete('/:postId', async (req, res) => {
    const token = req.body.token;
    if(token === process.env.TOKEN) {
        try {
            const post = await Post.deleteOne({_id: req.params.postId});
            res.json(post);
        } catch(err) {
            res.json({message: err});
        }
    } else {
	console.log(req.body);
	res.json({message: "Not authenticated"});
    }
});

// EDIT A POST REQUEST
router.patch('/:postId', async (req, res) => {
    const submission = req.body[0];
    const token = req.body[1];
    if(token === process.env.TOKEN) {
	    try {
	        const post = await Post.updateOne(
	            {_id: req.params.postId},
	            {$set: {
			title: submission.title,
			description: submission.description,
			content: submission.content,
			private: submission.private
		    }}
	        );
	        res.json(post);
	    } catch(err) {
	        res.json({message: err});
	    }
    } else {
	res.json({message: "Not authenticated"});
    }
});

module.exports = router;
