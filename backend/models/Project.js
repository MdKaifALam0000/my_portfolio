const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true }, // URL or path to image
    technologies: [{ type: String }],
    githubLink: { type: String },
    liveLink: { type: String },
    featured: { type: Boolean, default: false },
    // Cloudinary video fields
    videoUrl: { type: String, default: null },       // Playback URL from Cloudinary
    videoPublicId: { type: String, default: null },  // Cloudinary public_id (used for deletion/replacement)
}, { timestamps: true });

module.exports = mongoose.model('Project', projectSchema);
