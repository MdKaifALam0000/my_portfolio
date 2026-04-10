const express = require('express');
const router = express.Router();
const Project = require('../models/Project');
const { uploadVideo, uploadImage, uploadToCloudinary, uploadImageToCloudinary, deleteFromCloudinary } = require('../config/uploadMiddleware');

// ──────────────────────────────────────────────────────────────
// GET all projects
// ──────────────────────────────────────────────────────────────
router.get('/', async (req, res) => {
    try {
        const projects = await Project.find().sort({ createdAt: -1 });
        res.json(projects);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// ──────────────────────────────────────────────────────────────
// GET featured projects
// ──────────────────────────────────────────────────────────────
router.get('/featured', async (req, res) => {
    try {
        const projects = await Project.find({ featured: true }).sort({ createdAt: -1 });
        res.json(projects);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// ──────────────────────────────────────────────────────────────
// POST /api/projects - Create a new project
// ──────────────────────────────────────────────────────────────
router.post('/', async (req, res) => {
    const project = new Project({
        title: req.body.title,
        description: req.body.description,
        image: req.body.image,
        technologies: req.body.technologies,
        githubLink: req.body.githubLink,
        liveLink: req.body.liveLink,
        featured: req.body.featured,
        videoUrl: req.body.videoUrl || null,
        videoPublicId: req.body.videoPublicId || null,
    });

    try {
        const newProject = await project.save();
        res.status(201).json(newProject);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// ──────────────────────────────────────────────────────────────
// PATCH /api/projects/:id - Update project text fields
// ──────────────────────────────────────────────────────────────
router.patch('/:id', async (req, res) => {
    try {
        const updated = await Project.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );
        if (!updated) return res.status(404).json({ message: 'Project not found' });
        res.json(updated);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// ──────────────────────────────────────────────────────────────
// POST /api/projects/:id/upload-image
// Uploads a project screenshot to Cloudinary and saves URL in DB.
// Use multipart/form-data with field name "image".
// ──────────────────────────────────────────────────────────────
router.post('/:id/upload-image', uploadImage.single('image'), async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);
        if (!project) return res.status(404).json({ message: 'Project not found' });

        if (!req.file) return res.status(400).json({ message: 'No image file provided' });

        const { url } = await uploadImageToCloudinary(req.file.buffer);

        project.image = url;
        await project.save();

        res.status(200).json({ message: 'Image uploaded successfully!', imageUrl: url });
    } catch (err) {
        console.error('Image upload error:', err);
        res.status(500).json({ message: 'Image upload failed', error: err.message });
    }
});

// ──────────────────────────────────────────────────────────────
// POST /api/projects/:id/upload-video
// Uploads a demo video to Cloudinary and saves URL in DB.
// Use multipart/form-data with field name "video".
// ──────────────────────────────────────────────────────────────
router.post('/:id/upload-video', uploadVideo.single('video'), async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);
        if (!project) return res.status(404).json({ message: 'Project not found' });

        // Delete old video from Cloudinary if it exists
        if (project.videoPublicId) {
            await deleteFromCloudinary(project.videoPublicId, 'video');
        }

        if (!req.file) return res.status(400).json({ message: 'No video file provided' });

        const { url, public_id } = await uploadToCloudinary(req.file.buffer);

        project.videoUrl = url;
        project.videoPublicId = public_id;
        await project.save();

        res.status(200).json({
            message: 'Video uploaded successfully!',
            videoUrl: url,
            videoPublicId: public_id,
        });
    } catch (err) {
        console.error('Video upload error:', err);
        res.status(500).json({ message: 'Video upload failed', error: err.message });
    }
});

// ──────────────────────────────────────────────────────────────
// DELETE /api/projects/:id/video - Removes the video from DB and Cloudinary
// ──────────────────────────────────────────────────────────────
router.delete('/:id/video', async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);
        if (!project) return res.status(404).json({ message: 'Project not found' });
        if (!project.videoPublicId) return res.status(400).json({ message: 'No video to delete' });

        await deleteFromCloudinary(project.videoPublicId, 'video');
        project.videoUrl = null;
        project.videoPublicId = null;
        await project.save();

        res.status(200).json({ message: 'Video deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Video deletion failed', error: err.message });
    }
});

module.exports = router;
