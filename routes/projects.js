const express = require('express');
const Project = require('../models/Project');

const router = express.Router();

// GETS ALL PROJECTS
router.get('/', async (req, res) => {
    try {
        const projects = await Project.find();
        res.json(projects);
    } catch(err) {
        res.json({message: err});
    }
});

// SUBMITS A NEW PROJECT
router.post('/', async (req, res) => {
    const submission = req.body[0];
    const token = req.body[1];
    if(token === process.env.TOKEN) {
        const project = new Project({
            title: submission.title,
            img: submission.img,
            lang: submission.lang,
            description: submission.description,
            code: submission.code,
            download: submission.download
        });
        const savedProject = await project.save();
        try {
            res.json(savedProject);
        } catch(err) {
            res.json({message: err});
        }
    } else {
        res.json({message: "Not authenticated"});
    }
});

// DELETES A PROJECT
router.delete('/:id', async (req, res) => {
    const token = req.body.token;
    if(token === process.env.TOKEN) {
        try {
            const project = await Project.deleteOne({_id: req.params.id});
            res.json(project);
        } catch(err) {
            res.json({message: err});
        }
    } else {
        res.json({message: "Not authenticated"});
    }
});

// EDITS A PROJECT
router.patch('/:id', async (req, res) => {
    const submission = req.body[0];
    const token = req.body[1];
    if(token === process.env.TOKEN) {
        const project = await Project.updateOne(
            {_id: req.params.id},
            {$set: {
                title: req.body.title,
                img: req.body.img,
                lang: req.body.lang,
                description: req.body.description,
                code: req.body.code,
                download: req.body.download
            }}
        );
        res.json(project);
    } else {
        res.json({message:"Not authenticated"});
    }
});

module.exports = router;
