# MySQL Migration Setup Guide

## Prerequisites
- Node.js installed
- MySQL server installed
- Your portfolio project

## Step 1: Setup MySQL Database

1. **Install MySQL** (if not already installed)
   - Windows: Download from MySQL website
   - macOS: `brew install mysql`
   - Linux: `sudo apt install mysql-server`

2. **Create Database**
   ```bash
   mysql -u root -p
   ```
   Then run the SQL script:
   ```bash
   source backend/database.sql
   ```

3. **Update Database Configuration**
   Edit `backend/server.js` and update the `dbConfig`:
   ```javascript
   const dbConfig = {
       host: 'localhost',
       user: 'your_mysql_username',
       password: 'your_mysql_password',
       database: 'portfolio_db',
       waitForConnections: true,
       connectionLimit: 10,
       queueLimit: 0
   };
   ```

## Step 2: Setup Backend

1. **Navigate to backend directory**
   ```bash
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the backend server**
   ```bash
   npm run dev
   ```
   The server will run on `http://localhost:3001`

## Step 3: Update Frontend

The frontend has been updated to use the MySQL API. No additional changes needed.

## Step 4: Test the Migration

1. **Start your React app**
   ```bash
   npm run dev
   ```

2. **Test the features**
   - Check if projects load from MySQL
   - Check if certificates load from MySQL
   - Try adding a comment
   - Verify data persistence

## Step 5: Add Your Data

### Add Projects via API
```bash
curl -X POST http://localhost:3001/api/projects \
  -F "title=My Project" \
  -F "description=Project description" \
  -F "link=https://example.com" \
  -F "techStack=[\"React\", \"Node.js\"]" \
  -F "image=@/path/to/image.jpg"
```

### Add Certificates via API
```bash
curl -X POST http://localhost:3001/api/certificates \
  -F "title=React Certification" \
  -F "description=React Developer Certification" \
  -F "image=@/path/to/certificate.jpg"
```

### Or add directly to MySQL
```sql
INSERT INTO projects (title, description, img_url, link, tech_stack) 
VALUES ('My Project', 'Description', '/uploads/project.jpg', 'https://example.com', '["React", "Node.js"]');

INSERT INTO certificates (img_url, title, description) 
VALUES ('/uploads/cert.jpg', 'React Cert', 'React Certification');
```

## File Uploads

- Images are stored in `backend/uploads/` directory
- Make sure the directory exists: `mkdir backend/uploads`
- Images are accessible via `http://localhost:3001/uploads/filename.jpg`

## Production Deployment

1. **Update API_BASE_URL** in `src/services/api.js`
2. **Set up production MySQL database**
3. **Deploy backend to your server**
4. **Update CORS settings** in `backend/server.js` for production domain

## Benefits of MySQL Migration

✅ **Better Performance**: MySQL is faster for complex queries  
✅ **ACID Compliance**: Better data integrity  
✅ **SQL Queries**: More flexible querying capabilities  
✅ **Cost Effective**: No Firebase usage limits  
✅ **Full Control**: Complete control over your data  
✅ **Backup & Recovery**: Standard database backup tools  

## Troubleshooting

- **Connection Error**: Check MySQL credentials in `server.js`
- **CORS Error**: Update CORS settings for your domain
- **File Upload Error**: Ensure `uploads` directory exists and is writable
- **API Not Found**: Verify backend server is running on port 3001
