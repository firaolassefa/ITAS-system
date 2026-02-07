-- Create users table
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL,
    full_name VARCHAR(100),
    email VARCHAR(100),
    user_type VARCHAR(20) DEFAULT 'TAXPAYER'
);

-- Insert test users
INSERT INTO users (username, password, full_name, email, user_type) VALUES
('taxpayer1', '123', 'John Taxpayer', 'taxpayer@example.com', 'TAXPAYER'),
('admin', 'admin123', 'System Admin', 'admin@itas.gov', 'SYSTEM_ADMIN'),
('content', 'content123', 'Content Manager', 'content@itas.gov', 'CONTENT_ADMIN');

-- Create courses table
CREATE TABLE IF NOT EXISTS courses (
    id SERIAL PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    description TEXT,
    category VARCHAR(50),
    difficulty VARCHAR(20) DEFAULT 'BEGINNER'
);

-- Insert test courses
INSERT INTO courses (title, description, category, difficulty) VALUES
('VAT Fundamentals', 'Learn basic VAT registration and filing', 'VAT', 'BEGINNER'),
('Income Tax Guide', 'Complete guide to income tax calculation', 'INCOME_TAX', 'INTERMEDIATE'),
('Corporate Tax Compliance', 'Advanced corporate tax topics', 'CORPORATE_TAX', 'ADVANCED');

-- Create resources table
CREATE TABLE IF NOT EXISTS resources (
    id SERIAL PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    description TEXT,
    resource_type VARCHAR(20) DEFAULT 'PDF',
    category VARCHAR(50)
);

-- Insert test resources
INSERT INTO resources (title, description, resource_type, category) VALUES
('VAT Registration Form', 'Official VAT registration form', 'PDF', 'VAT'),
('Tax Calculation Guide', 'Step-by-step tax calculation', 'PDF', 'GENERAL'),
('Tax Video Tutorial', 'Video guide for new taxpayers', 'VIDEO', 'EDUCATION');
