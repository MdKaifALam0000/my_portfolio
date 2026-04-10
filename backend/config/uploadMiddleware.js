const multer = require('multer');
const cloudinary = require('./cloudinary');
const { Readable } = require('stream');

// Use memory storage — files are streamed directly to Cloudinary, never saved to disk
const storage = multer.memoryStorage();

// ─── Multer for VIDEO uploads ─────────────────────────────────────────────────
const uploadVideo = multer({
    storage,
    limits: { fileSize: 100 * 1024 * 1024 }, // Max 100MB
    fileFilter: (req, file, cb) => {
        const allowedTypes = ['video/mp4', 'video/webm', 'video/ogg', 'video/quicktime'];
        if (allowedTypes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error('Invalid file type. Only MP4, WebM, OGG, and MOV are allowed.'), false);
        }
    }
});

// ─── Multer for IMAGE uploads ─────────────────────────────────────────────────
const uploadImage = multer({
    storage,
    limits: { fileSize: 10 * 1024 * 1024 }, // Max 10MB
    fileFilter: (req, file, cb) => {
        const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
        if (allowedTypes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error('Invalid file type. Only JPEG, PNG, WebP, and GIF are allowed.'), false);
        }
    }
});

// ─── Stream buffer to Cloudinary (shared helper) ──────────────────────────────
const streamToCloudinary = (fileBuffer, options) => {
    return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
            options,
            (error, result) => {
                if (error) reject(error);
                else resolve({ url: result.secure_url, public_id: result.public_id });
            }
        );
        const readableStream = new Readable();
        readableStream.push(fileBuffer);
        readableStream.push(null);
        readableStream.pipe(uploadStream);
    });
};

/**
 * Uploads a video buffer to Cloudinary.
 */
const uploadToCloudinary = (fileBuffer, folder = 'portfolio/demo-videos') => {
    return streamToCloudinary(fileBuffer, {
        resource_type: 'video',
        folder,
        eager: [{ quality: 'auto', fetch_format: 'mp4' }],
        eager_async: true,
    });
};

/**
 * Uploads an image buffer to Cloudinary.
 */
const uploadImageToCloudinary = (fileBuffer, folder = 'portfolio/project-images') => {
    return streamToCloudinary(fileBuffer, {
        resource_type: 'image',
        folder,
        transformation: [{ quality: 'auto', fetch_format: 'auto', width: 1200, crop: 'limit' }],
    });
};

/**
 * Deletes any asset (image or video) from Cloudinary by public_id.
 */
const deleteFromCloudinary = async (publicId, resourceType = 'video') => {
    await cloudinary.uploader.destroy(publicId, { resource_type: resourceType });
};

module.exports = { uploadVideo, uploadImage, uploadToCloudinary, uploadImageToCloudinary, deleteFromCloudinary };
