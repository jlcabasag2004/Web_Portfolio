-- Portfolio Database Schema (MySQL 5.6 Compatible)
-- Run this script to create your MySQL database

CREATE DATABASE IF NOT EXISTS portfolio_db;
USE portfolio_db;

-- Projects table
CREATE TABLE IF NOT EXISTS projects (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    img_url VARCHAR(500),
    link VARCHAR(500),
    tech_stack TEXT,  -- Changed from JSON to TEXT for compatibility
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Certificates table
CREATE TABLE IF NOT EXISTS certificates (
    id INT PRIMARY KEY AUTO_INCREMENT,
    img_url VARCHAR(500) NOT NULL,
    title VARCHAR(255),
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insert sample data
INSERT INTO projects (title, description, img_url, link, tech_stack) VALUES
('Sample Project 1', 'A sample project description', '/uploads/sample1.jpg', 'https://example.com', '["React", "Node.js", "MySQL"]'),
('Sample Project 2', 'Another sample project', '/uploads/sample2.jpg', 'https://example2.com', '["PHP", "Laravel", "MySQL"]');

INSERT INTO certificates (img_url, title, description) VALUES
('/uploads/cert1.jpg', 'React Certification', 'React Developer Certification'),
('/uploads/cert2.jpg', 'PHP Certification', 'PHP Developer Certification');
