const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// MySQL Connection (XAMPP default settings)
const dbConfig = {
    host: 'localhost',
    user: 'root',           // XAMPP default username
    password: '',          // XAMPP default password (empty)
    database: 'portfolio_db',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
};

const pool = mysql.createPool(dbConfig);

// Multer configuration for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadDir = 'uploads/';
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });

// Routes

// Get all projects
app.get('/api/projects', async (req, res) => {
    try {
        const [rows] = await pool.execute('SELECT * FROM projects ORDER BY created_at DESC');
        res.json(rows);
    } catch (error) {
        console.error('Error fetching projects:', error);
        res.status(500).json({ error: 'Failed to fetch projects' });
    }
});

// Get all certificates
app.get('/api/certificates', async (req, res) => {
    try {
        const [rows] = await pool.execute('SELECT * FROM certificates ORDER BY created_at DESC');
        res.json(rows);
    } catch (error) {
        console.error('Error fetching certificates:', error);
        res.status(500).json({ error: 'Failed to fetch certificates' });
    }
});

// Add new project (admin endpoint)
app.post('/api/projects', upload.single('image'), async (req, res) => {
    try {
        const { title, description, link, techStack } = req.body;
        const imgUrl = req.file ? `/uploads/${req.file.filename}` : null;
        const techStackJson = JSON.stringify(JSON.parse(techStack || '[]'));

        const [result] = await pool.execute(
            'INSERT INTO projects (title, description, img_url, link, tech_stack) VALUES (?, ?, ?, ?, ?)',
            [title, description, imgUrl, link, techStackJson]
        );

        res.json({ 
            id: result.insertId, 
            title, 
            description, 
            imgUrl, 
            link,
            techStack: JSON.parse(techStackJson)
        });
    } catch (error) {
        console.error('Error adding project:', error);
        res.status(500).json({ error: 'Failed to add project' });
    }
});

// Add new certificate (admin endpoint)
app.post('/api/certificates', upload.single('image'), async (req, res) => {
    try {
        const { title, description } = req.body;
        const imgUrl = req.file ? `/uploads/${req.file.filename}` : null;

        const [result] = await pool.execute(
            'INSERT INTO certificates (title, description, img_url) VALUES (?, ?, ?)',
            [title, description, imgUrl]
        );

        res.json({ 
            id: result.insertId, 
            title, 
            description, 
            imgUrl
        });
    } catch (error) {
        console.error('Error adding certificate:', error);
        res.status(500).json({ error: 'Failed to add certificate' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
