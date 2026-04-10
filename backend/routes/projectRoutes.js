const express = require('express');
const router = express.Router();
const Project = require('../models/Project');

// Get all projects
router.get('/', async (req, res) => {
    try {
        const projects = await Project.find().sort({ createdAt: -1 });
        res.json(projects);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get featured projects
router.get('/featured', async (req, res) => {
    try {
        const projects = await Project.find({ featured: true }).sort({ createdAt: -1 });
        res.json(projects);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Add a new project (Basic unauthenticated route for seeding/admin placeholder)
router.post('/', async (req, res) => {
    const project = new Project({
        title: req.body.title,
        description: req.body.description,
        image: req.body.image,
        technologies: req.body.technologies,
        githubLink: req.body.githubLink,
        liveLink: req.body.liveLink,
        featured: req.body.featured
    });

    try {
        const newProject = await project.save();
        res.status(201).json(newProject);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;
