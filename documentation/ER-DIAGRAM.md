# ITAS Tax Education System - Entity Relationship Diagram

## Database Schema Overview

This document describes the database schema for the ITAS Tax & Education Support System.

## Core Entities

### 1. USERS
Primary entity for system users (taxpayers and staff)

```
users
├── id (PK, BIGSERIAL)
├── username (VARCHAR(50), UNIQUE, NOT NULL)
├── password (VARCHAR(255), NOT NULL) -- BCrypt hashed
├── full_name (VARCHAR(100))
├── email (VARCHAR(100), UNIQUE, NOT NULL)
├── user_type (VARCHAR(20), NOT NULL) -- ENUM: TAXPAYER, SYSTEM_ADMIN, CONTENT_ADMIN, etc.
├── tax_number (VARCHAR(50))
├── company_name (VARCHAR(100))
├── is_active (BOOLEAN, DEFAULT TRUE)
├── created_at (TIMESTAMP, DEFAULT CURRENT_TIMESTAMP)
└── last_login (TIMESTAMP)
```

### 2. USER_ROLES
Manages fine-grained permissions for users

```
user_roles
├── id (PK, BIGSERIAL)
├── user_id (FK → users.id)
├── role_name (VARCHAR(50), NOT NULL) -- e.g., MANAGE_USERS, UPLOAD_RESOURCES
├── assigned_by (FK → users.id)
└── assigned_at (TIMESTAMP, DEFAULT CURRENT_TIMESTAMP)
```

### 3. COURSES
Educational courses offered to taxpayers

```
courses
├── id (PK, BIGSERIAL)
├── title (VARCHAR(200), NOT NULL)
├── description (TEXT)
├── category (VARCHAR(50)) -- VAT, Income Tax, TCC, etc.
├── difficulty_level (VARCHAR(20)) -- BEGINNER, INTERMEDIATE, ADVANCED
├── duration_hours (INTEGER)
├── thumbnail_url (VARCHAR(500))
├── is_published (BOOLEAN, DEFAULT FALSE)
├── created_by (FK → users.id)
├── created_at (TIMESTAMP, DEFAULT CURRENT_TIMESTAMP)
└── updated_at (TIMESTAMP)
```

### 4. MODULES
Individual learning modules within courses

```
modules
├── id (PK, BIGSERIAL)
├── course_id (FK → courses.id, NOT NULL)
├── title (VARCHAR(200), NOT NULL)
├── description (TEXT)
├── module_order (INTEGER)
├── content_url (VARCHAR(500))
├── video_url (VARCHAR(500))
├── duration_minutes (INTEGER)
├── passing_score (INTEGER, DEFAULT 70) -- Minimum percentage to pass
├── max_attempts (INTEGER, DEFAULT 3) -- Maximum quiz attempts
├── is_locked (BOOLEAN, DEFAULT FALSE) -- Locked until previous module complete
├── created_at (TIMESTAMP, DEFAULT CURRENT_TIMESTAMP)
└── updated_at (TIMESTAMP)
```

### 5. QUESTIONS
Assessment questions for modules

```
questions
├── id (PK, BIGSERIAL)
├── module_id (FK → modules.id, NOT NULL)
├── question_text (TEXT, NOT NULL)
├── question_type (VARCHAR(20), DEFAULT 'MULTIPLE_CHOICE') -- ENUM
├── question_order (INTEGER)
├── points (INTEGER, DEFAULT 1)
└── created_at (TIMESTAMP, DEFAULT CURRENT_TIMESTAMP)
```

### 6. ANSWERS
Possible answers for questions

```
answers
├── id (PK, BIGSERIAL)
├── question_id (FK → questions.id, NOT NULL)
├── answer_text (TEXT, NOT NULL)
├── is_correct (BOOLEAN, DEFAULT FALSE)
└── answer_order (INTEGER)
```

### 7. ASSESSMENTS
User assessment attempts and results

```
assessments
├── id (PK, BIGSERIAL)
├── user_id (FK → users.id, NOT NULL)
├── module_id (FK → modules.id, NOT NULL)
├── attempt_number (INTEGER, NOT NULL)
├── score (INTEGER, DEFAULT 0)
├── total_points (INTEGER, DEFAULT 0)
├── percentage (DECIMAL(5,2), DEFAULT 0.00)
├── passed (BOOLEAN, DEFAULT FALSE)
├── started_at (TIMESTAMP)
├── completed_at (TIMESTAMP)
└── feedback (TEXT)
```

### 8. ENROLLMENTS
User course enrollments

```
enrollments
├── id (PK, BIGSERIAL)
├── user_id (FK → users.id, NOT NULL)
├── course_id (FK → courses.id, NOT NULL)
├── enrolled_at (TIMESTAMP, DEFAULT CURRENT_TIMESTAMP)
├── completed_at (TIMESTAMP)
├── progress_percentage (INTEGER, DEFAULT 0)
└── status (VARCHAR(20), DEFAULT 'ACTIVE') -- ACTIVE, COMPLETED, DROPPED
```

### 9. MODULE_PROGRESS
Tracks user progress through modules

```
module_progress
├── id (PK, BIGSERIAL)
├── user_id (FK → users.id, NOT NULL)
├── module_id (FK → modules.id, NOT NULL)
├── progress (INTEGER, DEFAULT 0) -- Percentage 0-100
├── completed (BOOLEAN, DEFAULT FALSE)
├── started_at (TIMESTAMP, DEFAULT CURRENT_TIMESTAMP)
└── completed_at (TIMESTAMP)
```

### 10. RESOURCES
Educational resources (PDFs, videos, guides)

```
resources
├── id (PK, BIGSERIAL)
├── title (VARCHAR(200), NOT NULL)
├── description (TEXT)
├── resource_type (VARCHAR(50)) -- PDF, VIDEO, ARTICLE, GUIDE
├── category (VARCHAR(50)) -- VAT, Income Tax, etc.
├── file_url (VARCHAR(500))
├── file_size (BIGINT)
├── file_type (VARCHAR(50))
├── thumbnail_url (VARCHAR(500))
├── download_count (INTEGER, DEFAULT 0)
├── is_public (BOOLEAN, DEFAULT TRUE)
├── uploaded_by (FK → users.id)
├── created_at (TIMESTAMP, DEFAULT CURRENT_TIMESTAMP)
└── updated_at (TIMESTAMP)
```

### 11. RESOURCE_VERSIONS
Version control for resources

```
resource_versions
├── id (PK, BIGSERIAL)
├── resource_id (FK → resources.id, NOT NULL)
├── version_number (VARCHAR(20), NOT NULL)
├── file_url (VARCHAR(500))
├── change_description (TEXT)
├── created_by (FK → users.id)
└── created_at (TIMESTAMP, DEFAULT CURRENT_TIMESTAMP)
```

### 12. WEBINARS
Live training sessions

```
webinars
├── id (PK, BIGSERIAL)
├── title (VARCHAR(200), NOT NULL)
├── description (TEXT)
├── scheduled_date (TIMESTAMP, NOT NULL)
├── duration_minutes (INTEGER)
├── presenter_name (VARCHAR(100))
├── meeting_url (VARCHAR(500))
├── max_attendees (INTEGER)
├── status (VARCHAR(20), DEFAULT 'SCHEDULED') -- SCHEDULED, LIVE, COMPLETED, CANCELLED
├── created_by (FK → users.id)
└── created_at (TIMESTAMP, DEFAULT CURRENT_TIMESTAMP)
```

### 13. NOTIFICATIONS
System notifications to users

```
notifications
├── id (PK, BIGSERIAL)
├── user_id (FK → users.id, NOT NULL)
├── title (VARCHAR(200), NOT NULL)
├── message (TEXT, NOT NULL)
├── notification_type (VARCHAR(50)) -- INFO, WARNING, SUCCESS, ERROR
├── is_read (BOOLEAN, DEFAULT FALSE)
├── link_url (VARCHAR(500))
├── created_at (TIMESTAMP, DEFAULT CURRENT_TIMESTAMP)
└── read_at (TIMESTAMP)
```

### 14. CERTIFICATES
Course completion certificates

```
certificates
├── id (PK, BIGSERIAL)
├── user_id (FK → users.id, NOT NULL)
├── course_id (FK → courses.id, NOT NULL)
├── certificate_number (VARCHAR(50), UNIQUE, NOT NULL)
├── issued_date (TIMESTAMP, DEFAULT CURRENT_TIMESTAMP)
├── pdf_url (VARCHAR(500))
└── verification_code (VARCHAR(100), UNIQUE)
```

### 15. HELP_CONTENT
Context-sensitive help content

```
help_content
├── id (PK, BIGSERIAL)
├── field_name (VARCHAR(100), UNIQUE)
├── title (VARCHAR(200), NOT NULL)
├── short_description (VARCHAR(500))
├── detailed_content (TEXT)
├── category (VARCHAR(50))
├── video_url (VARCHAR(500))
├── related_links (TEXT)
└── created_at (TIMESTAMP, DEFAULT CURRENT_TIMESTAMP)
```

### 16. ARCHIVED_RESOURCES
Archived/deleted resources

```
archived_resources
├── id (PK, BIGSERIAL)
├── original_resource_id (BIGINT)
├── title (VARCHAR(200))
├── resource_type (VARCHAR(50))
├── archived_by (FK → users.id)
├── archived_at (TIMESTAMP, DEFAULT CURRENT_TIMESTAMP)
└── reason (TEXT)
```

### 17. SYNC_RECORDS
Training record synchronization logs

```
sync_records
├── id (PK, BIGSERIAL)
├── sync_type (VARCHAR(50)) -- USER_DATA, TRAINING_RECORDS, CERTIFICATES
├── status (VARCHAR(20)) -- SUCCESS, FAILED, PENDING
├── records_synced (INTEGER, DEFAULT 0)
├── error_message (TEXT)
├── started_at (TIMESTAMP, DEFAULT CURRENT_TIMESTAMP)
└── completed_at (TIMESTAMP)
```

## Relationships

### One-to-Many Relationships

1. **users → user_roles** (One user has many roles)
2. **users → courses** (One user creates many courses)
3. **users → enrollments** (One user has many enrollments)
4. **users → assessments** (One user has many assessment attempts)
5. **users → notifications** (One user receives many notifications)
6. **users → certificates** (One user earns many certificates)
7. **courses → modules** (One course has many modules)
8. **courses → enrollments** (One course has many enrollments)
9. **modules → questions** (One module has many questions)
10. **modules → assessments** (One module has many assessment attempts)
11. **questions → answers** (One question has many answers)
12. **resources → resource_versions** (One resource has many versions)

### Many-to-Many Relationships

1. **users ↔ courses** (through enrollments)
2. **users ↔ modules** (through module_progress)

## Indexes

Recommended indexes for performance:

```sql
-- User lookups
CREATE INDEX idx_users_username ON users(username);
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_user_type ON users(user_type);

-- Course and module queries
CREATE INDEX idx_courses_category ON courses(category);
CREATE INDEX idx_modules_course_id ON modules(course_id);
CREATE INDEX idx_questions_module_id ON questions(module_id);

-- Enrollment and progress tracking
CREATE INDEX idx_enrollments_user_id ON enrollments(user_id);
CREATE INDEX idx_enrollments_course_id ON enrollments(course_id);
CREATE INDEX idx_module_progress_user_id ON module_progress(user_id);
CREATE INDEX idx_assessments_user_module ON assessments(user_id, module_id);

-- Resource management
CREATE INDEX idx_resources_category ON resources(category);
CREATE INDEX idx_resources_type ON resources(resource_type);

-- Notifications
CREATE INDEX idx_notifications_user_id ON notifications(user_id);
CREATE INDEX idx_notifications_is_read ON notifications(is_read);
```

## Data Integrity Constraints

1. **Unique Constraints**:
   - users.username
   - users.email
   - certificates.certificate_number
   - certificates.verification_code

2. **Foreign Key Constraints**:
   - All FK relationships enforce referential integrity
   - ON DELETE CASCADE for dependent records
   - ON DELETE SET NULL for optional references

3. **Check Constraints**:
   - modules.passing_score BETWEEN 0 AND 100
   - assessments.percentage BETWEEN 0 AND 100
   - enrollments.progress_percentage BETWEEN 0 AND 100

## Visual ER Diagram

```
┌─────────────┐         ┌──────────────┐         ┌─────────────┐
│    USERS    │────────<│  USER_ROLES  │         │   COURSES   │
└─────────────┘         └──────────────┘         └─────────────┘
      │                                                  │
      │                                                  │
      ├──────────────────────────────────────────────────┤
      │                                                  │
      ▼                                                  ▼
┌─────────────┐                                  ┌─────────────┐
│ ENROLLMENTS │                                  │   MODULES   │
└─────────────┘                                  └─────────────┘
      │                                                  │
      │                                                  │
      ▼                                                  ▼
┌──────────────┐                                 ┌─────────────┐
│MODULE_PROGRESS│                                │  QUESTIONS  │
└──────────────┘                                 └─────────────┘
      │                                                  │
      │                                                  │
      ▼                                                  ▼
┌─────────────┐                                  ┌─────────────┐
│ ASSESSMENTS │                                  │   ANSWERS   │
└─────────────┘                                  └─────────────┘
      │
      │
      ▼
┌──────────────┐
│ CERTIFICATES │
└──────────────┘
```

## Notes

- All timestamps use PostgreSQL TIMESTAMP type
- Passwords are stored using BCrypt hashing (cost factor 10)
- File URLs point to cloud storage or local file system
- Soft delete is implemented for resources (archived_resources table)
- Version control is maintained for educational resources
