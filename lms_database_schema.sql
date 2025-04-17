-- LMS Database Schema for Schools and Universities
-- This schema covers user management, course organization, content delivery, 
-- communication, AI tutoring, virtual classrooms, and calendar functionality.

-- Core Tables

CREATE TABLE institutions (
  id UUID PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  type ENUM('school', 'university', 'college') NOT NULL,
  website VARCHAR(255),
  logo_url VARCHAR(255),
  address TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE departments (
  id UUID PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  institution_id UUID REFERENCES institutions(id) NOT NULL,
  head_id UUID REFERENCES users(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE users (
  id UUID PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  role ENUM('student', 'instructor', 'admin', 'teaching_assistant') NOT NULL,
  avatar_url VARCHAR(255),
  institution_id UUID REFERENCES institutions(id),
  department_id UUID REFERENCES departments(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  last_login TIMESTAMP
);

-- Course Management

CREATE TABLE terms (
  id UUID PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  institution_id UUID REFERENCES institutions(id) NOT NULL,
  is_active BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE courses (
  id UUID PRIMARY KEY,
  code VARCHAR(50) NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  department_id UUID REFERENCES departments(id) NOT NULL,
  credit_hours INT,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE course_sections (
  id UUID PRIMARY KEY,
  course_id UUID REFERENCES courses(id) NOT NULL,
  section_number VARCHAR(20) NOT NULL,
  term_id UUID REFERENCES terms(id) NOT NULL,
  instructor_id UUID REFERENCES users(id),
  capacity INT,
  enrollment_count INT DEFAULT 0,
  location VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(course_id, section_number, term_id)
);

CREATE TABLE enrollments (
  id UUID PRIMARY KEY,
  student_id UUID REFERENCES users(id) NOT NULL,
  section_id UUID REFERENCES course_sections(id) NOT NULL,
  status ENUM('active', 'dropped', 'completed', 'waitlisted') DEFAULT 'active',
  grade VARCHAR(5),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(student_id, section_id)
);

-- Content Management

CREATE TABLE modules (
  id UUID PRIMARY KEY,
  section_id UUID REFERENCES course_sections(id) NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  order_index INT NOT NULL,
  start_date TIMESTAMP,
  end_date TIMESTAMP,
  is_published BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE content_items (
  id UUID PRIMARY KEY,
  module_id UUID REFERENCES modules(id) NOT NULL,
  title VARCHAR(255) NOT NULL,
  content_type ENUM('assignment', 'quiz', 'file', 'page', 'discussion', 'external_url', 'video') NOT NULL,
  description TEXT,
  content TEXT,
  external_url VARCHAR(512),
  file_url VARCHAR(512),
  points INT,
  due_date TIMESTAMP,
  order_index INT NOT NULL,
  is_published BOOLEAN DEFAULT FALSE,
  created_by UUID REFERENCES users(id) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE submissions (
  id UUID PRIMARY KEY,
  content_item_id UUID REFERENCES content_items(id) NOT NULL,
  student_id UUID REFERENCES users(id) NOT NULL,
  submission_text TEXT,
  file_url VARCHAR(512),
  submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  score DECIMAL(5,2),
  graded_by UUID REFERENCES users(id),
  graded_at TIMESTAMP,
  feedback TEXT,
  status ENUM('draft', 'submitted', 'late', 'graded', 'resubmitted') DEFAULT 'draft',
  UNIQUE(content_item_id, student_id)
);

-- Communication

CREATE TABLE messages (
  id UUID PRIMARY KEY,
  sender_id UUID REFERENCES users(id) NOT NULL,
  subject VARCHAR(255),
  body TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE message_recipients (
  id UUID PRIMARY KEY,
  message_id UUID REFERENCES messages(id) NOT NULL,
  recipient_id UUID REFERENCES users(id) NOT NULL,
  is_read BOOLEAN DEFAULT FALSE,
  read_at TIMESTAMP,
  is_archived BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(message_id, recipient_id)
);

CREATE TABLE discussion_threads (
  id UUID PRIMARY KEY,
  section_id UUID REFERENCES course_sections(id),
  title VARCHAR(255) NOT NULL,
  description TEXT,
  created_by UUID REFERENCES users(id) NOT NULL,
  is_pinned BOOLEAN DEFAULT FALSE,
  is_locked BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE discussion_posts (
  id UUID PRIMARY KEY,
  thread_id UUID REFERENCES discussion_threads(id) NOT NULL,
  parent_post_id UUID REFERENCES discussion_posts(id),
  author_id UUID REFERENCES users(id) NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- AI Tutor & Virtual Classroom

CREATE TABLE ai_tutor_sessions (
  id UUID PRIMARY KEY,
  student_id UUID REFERENCES users(id) NOT NULL,
  subject VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  ended_at TIMESTAMP,
  duration_minutes INT
);

CREATE TABLE ai_tutor_messages (
  id UUID PRIMARY KEY,
  session_id UUID REFERENCES ai_tutor_sessions(id) NOT NULL,
  is_ai BOOLEAN NOT NULL,
  content TEXT NOT NULL,
  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE virtual_classrooms (
  id UUID PRIMARY KEY,
  section_id UUID REFERENCES course_sections(id) NOT NULL,
  name VARCHAR(255) NOT NULL,
  meeting_url VARCHAR(512),
  meeting_id VARCHAR(255),
  access_code VARCHAR(100),
  start_time TIMESTAMP NOT NULL,
  end_time TIMESTAMP NOT NULL,
  is_recurring BOOLEAN DEFAULT FALSE,
  recurrence_pattern VARCHAR(255),
  created_by UUID REFERENCES users(id) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE virtual_classroom_attendance (
  id UUID PRIMARY KEY,
  classroom_id UUID REFERENCES virtual_classrooms(id) NOT NULL,
  user_id UUID REFERENCES users(id) NOT NULL,
  join_time TIMESTAMP,
  leave_time TIMESTAMP,
  duration_minutes INT,
  UNIQUE(classroom_id, user_id)
);

-- Calendar & Events

CREATE TABLE calendar_events (
  id UUID PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  start_time TIMESTAMP NOT NULL,
  end_time TIMESTAMP NOT NULL,
  location VARCHAR(255),
  event_type ENUM('class', 'assignment', 'exam', 'personal', 'institution', 'holiday') NOT NULL,
  section_id UUID REFERENCES course_sections(id),
  content_item_id UUID REFERENCES content_items(id),
  creator_id UUID REFERENCES users(id) NOT NULL,
  is_private BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE user_calendar_events (
  id UUID PRIMARY KEY,
  event_id UUID REFERENCES calendar_events(id) NOT NULL,
  user_id UUID REFERENCES users(id) NOT NULL,
  is_hidden BOOLEAN DEFAULT FALSE,
  reminder_minutes INT,
  UNIQUE(event_id, user_id)
);

-- Note: There is a circular reference between departments and users
-- In an actual implementation, you may need to:
-- 1. Create tables without foreign keys first
-- 2. Add foreign keys after tables are created
-- 3. Or use deferred constraints if your database supports them 