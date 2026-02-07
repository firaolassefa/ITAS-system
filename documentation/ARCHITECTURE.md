# ITAS Tax Education System - System Architecture

## High-Level Architecture

The ITAS Tax & Education Support System follows a modern three-tier architecture with clear separation of concerns.

```
┌─────────────────────────────────────────────────────────────┐
│                     PRESENTATION LAYER                       │
│                                                              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │   Taxpayer   │  │    Admin     │  │   Manager    │     │
│  │   Portal     │  │   Portal     │  │  Dashboard   │     │
│  │  (React UI)  │  │  (React UI)  │  │  (React UI)  │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
│                                                              │
│         React 18 + TypeScript + Material-UI + Vite          │
└─────────────────────────────────────────────────────────────┘
                              │
                              │ HTTPS / REST API
                              │ JWT Authentication
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                     APPLICATION LAYER                        │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐  │
│  │              Spring Boot Backend                      │  │
│  │                                                        │  │
│  │  ┌────────────┐  ┌────────────┐  ┌────────────┐     │  │
│  │  │Controllers │  │  Services  │  │Repositories│     │  │
│  │  └────────────┘  └────────────┘  └────────────┘     │  │
│  │                                                        │  │
│  │  ┌────────────────────────────────────────────────┐  │  │
│  │  │         Security Layer (JWT + Spring)         │  │  │
│  │  └────────────────────────────────────────────────┘  │  │
│  │                                                        │  │
│  │  Spring Boot 3.1.5 + Java 17 + Spring Security       │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                              │
                              │ JDBC / JPA
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                       DATA LAYER                             │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐  │
│  │            PostgreSQL Database                        │  │
│  │                                                        │  │
│  │  • Users & Roles      • Courses & Modules            │  │
│  │  • Assessments        • Resources                     │  │
│  │  • Certificates       • Notifications                 │  │
│  │  • Help Content       • Sync Records                  │  │
│  │                                                        │  │
│  │  PostgreSQL 15 with Hibernate ORM                     │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

## Component Architecture

### Frontend Components

```
frontend/
├── src/
│   ├── api/                    # API client modules
│   │   ├── auth.ts            # Authentication API
│   │   ├── courses.ts         # Course management API
│   │   ├── resources.ts       # Resource management API
│   │   ├── assessments.ts     # Assessment API (NEW)
│   │   └── help.ts            # Help system API (NEW)
│   │
│   ├── components/            # Reusable UI components
│   │   ├── common/           # Shared components
│   │   ├── taxpayer/         # Taxpayer-specific components
│   │   └── admin/            # Admin-specific components
│   │
│   ├── pages/                # Page-level components
│   │   ├── auth/            # Login, Register
│   │   ├── taxpayer/        # Taxpayer portal pages
│   │   └── admin/           # Admin portal pages
│   │
│   ├── hooks/               # Custom React hooks
│   │   ├── useAuth.ts       # Authentication hook
│   │   ├── useApi.ts        # API call hook
│   │   └── useWebSocket.ts  # Real-time updates
│   │
│   ├── store/               # State management
│   │   └── authStore.ts     # Authentication state
│   │
│   └── utils/               # Utility functions
│       ├── api.ts           # API configuration
│       ├── validators.ts    # Input validation
│       └── permissions.tsx  # Permission checks
```

### Backend Components

```
backend/
├── src/main/java/com/itas/
│   ├── config/                    # Configuration classes
│   │   ├── SecurityConfig.java   # Spring Security config
│   │   ├── WebConfig.java        # CORS, MVC config
│   │   └── RoleConfig.java       # Initial role setup
│   │
│   ├── controller/               # REST API endpoints
│   │   ├── AuthController.java  # UC-AUTH-001
│   │   ├── CourseController.java # UC-LMS-001
│   │   ├── ModuleController.java # UC-LMS-002
│   │   ├── AssessmentController.java # UC-LMS-002 (NEW)
│   │   ├── ResourceController.java # UC-CM-001, UC-CM-002
│   │   ├── WebinarController.java # UC-ADM-001
│   │   ├── NotificationController.java # UC-ADM-002
│   │   ├── AnalyticsController.java # UC-ADM-003
│   │   ├── HelpController.java # UC-TP-001 (NEW)
│   │   └── CertificateController.java # UC-LMS-003
│   │
│   ├── service/                  # Business logic
│   │   ├── AuthService.java
│   │   ├── CourseService.java
│   │   ├── AssessmentService.java # (NEW)
│   │   ├── ResourceService.java
│   │   ├── CertificateService.java
│   │   ├── NotificationService.java
│   │   └── AnalyticsService.java
│   │
│   ├── repository/               # Data access layer
│   │   ├── UserRepository.java
│   │   ├── CourseRepository.java
│   │   ├── ModuleRepository.java # (NEW)
│   │   ├── QuestionRepository.java # (NEW)
│   │   ├── AssessmentRepository.java # (NEW)
│   │   └── ...
│   │
│   ├── model/                    # Domain entities
│   │   ├── User.java
│   │   ├── Course.java
│   │   ├── Module.java # (NEW)
│   │   ├── Question.java # (NEW)
│   │   ├── Answer.java # (NEW)
│   │   ├── Assessment.java # (NEW)
│   │   └── ...
│   │
│   ├── dto/                      # Data Transfer Objects
│   │   ├── LoginRequest.java
│   │   ├── LoginResponse.java
│   │   ├── ApiResponse.java
│   │   └── ...
│   │
│   └── security/                 # Security components
│       ├── JwtTokenProvider.java
│       ├── JwtAuthenticationFilter.java
│       ├── JwtAuthenticationEntryPoint.java
│       └── CustomUserDetailsService.java
```

## Technology Stack

### Frontend Technologies

| Component | Technology | Version | Purpose |
|-----------|-----------|---------|---------|
| Framework | React | 18.2.0 | UI framework |
| Language | TypeScript | 5.2.2 | Type-safe JavaScript |
| Build Tool | Vite | 5.0.8 | Fast build tool |
| UI Library | Material-UI | 5.14.20 | Component library |
| UI Library | Ant Design | 6.2.3 | Additional components |
| Routing | React Router | 6.20.1 | Client-side routing |
| HTTP Client | Fetch API | Native | API communication |
| State Management | React Hooks | Built-in | Local state management |

### Backend Technologies

| Component | Technology | Version | Purpose |
|-----------|-----------|---------|---------|
| Framework | Spring Boot | 3.1.5 | Application framework |
| Language | Java | 17 | Programming language |
| Security | Spring Security | 3.1.5 | Authentication & authorization |
| ORM | Hibernate/JPA | 3.1.5 | Database ORM |
| JWT | JJWT | 0.11.5 | Token generation |
| Validation | Bean Validation | 3.1.5 | Input validation |
| API Docs | SpringDoc OpenAPI | 2.3.0 | API documentation |
| Build Tool | Maven | 3.x | Dependency management |

### Database & Infrastructure

| Component | Technology | Version | Purpose |
|-----------|-----------|---------|---------|
| Database | PostgreSQL | 15 | Primary database |
| Containerization | Docker | Latest | Application containers |
| Orchestration | Docker Compose | Latest | Multi-container setup |
| Web Server | Nginx | Latest | Reverse proxy (production) |

## Security Architecture

### Authentication Flow

```
1. User Login Request
   ↓
2. AuthController receives credentials
   ↓
3. AuthenticationManager validates
   ↓
4. CustomUserDetailsService loads user from DB
   ↓
5. Password verified (BCrypt)
   ↓
6. JwtTokenProvider generates JWT token
   ↓
7. Token returned to client
   ↓
8. Client stores token in localStorage
   ↓
9. Subsequent requests include token in Authorization header
   ↓
10. JwtAuthenticationFilter validates token
    ↓
11. SecurityContext populated with user details
    ↓
12. Request proceeds to controller
```

### Authorization Model

**Role-Based Access Control (RBAC)**

```
User Types:
├── TAXPAYER
│   └── Permissions: VIEW_COURSES, ENROLL_COURSES, VIEW_RESOURCES
│
├── CONTENT_ADMIN
│   └── Permissions: UPLOAD_RESOURCES, UPDATE_RESOURCES, ARCHIVE_RESOURCES
│
├── TRAINING_ADMIN
│   └── Permissions: SCHEDULE_WEBINARS, MANAGE_WEBINARS
│
├── COMM_OFFICER
│   └── Permissions: SEND_NOTIFICATIONS
│
├── MANAGER
│   └── Permissions: VIEW_ANALYTICS, EXPORT_REPORTS
│
└── SYSTEM_ADMIN
    └── Permissions: ALL (full system access)
```

### Security Features Implemented

1. **Password Security**
   - BCrypt hashing (cost factor 10)
   - Minimum password requirements
   - No plaintext storage

2. **JWT Token Security**
   - HMAC-SHA512 signing
   - 1-hour expiration (configurable)
   - Secure secret key (environment variable)

3. **API Security**
   - CORS configuration (restricted origins)
   - CSRF protection (for state-changing operations)
   - Role-based endpoint protection
   - Input validation on all endpoints

4. **Data Security**
   - SQL injection prevention (JPA/Hibernate)
   - XSS prevention (input sanitization)
   - Sensitive data exclusion from responses

## API Architecture

### RESTful API Design

**Base URL**: `http://localhost:8080/api`

**Authentication**: Bearer Token (JWT)

**Response Format**:
```json
{
  "message": "Operation successful",
  "data": { ... },
  "timestamp": "2024-02-05T10:30:00"
}
```

### API Endpoints by Use Case

| Use Case | Method | Endpoint | Controller |
|----------|--------|----------|------------|
| UC-AUTH-001 | POST | /api/auth/login | AuthController |
| UC-CM-001 | POST | /api/content/upload | ResourceController |
| UC-CM-002 | PUT | /api/content/{id}/version | ResourceController |
| UC-CM-002 | GET | /api/content/search | ResourceController |
| UC-LMS-001 | POST | /api/lms/enroll | CourseController |
| UC-LMS-002 | POST | /api/assessments/start | AssessmentController |
| UC-LMS-002 | POST | /api/assessments/{id}/submit | AssessmentController |
| UC-LMS-003 | POST | /api/certificates/generate | CertificateController |
| UC-TP-001 | GET | /api/help/field/{fieldName} | HelpController |
| UC-TP-002 | GET | /api/content/video/{id}/stream | ResourceController |
| UC-ADM-001 | POST | /api/webinars/schedule | WebinarController |
| UC-ADM-002 | POST | /api/notifications/send | NotificationController |
| UC-ADM-003 | GET | /api/analytics/dashboard | AnalyticsController |

## Deployment Architecture

### Development Environment

```
┌─────────────────┐
│   Developer     │
│   Workstation   │
└────────┬────────┘
         │
         ├─── Frontend (Vite Dev Server: 5173)
         ├─── Backend (Spring Boot: 8080)
         └─── PostgreSQL (Docker: 5432)
```

### Production Environment (Docker Compose)

```
┌──────────────────────────────────────────────┐
│              Docker Host                      │
│                                               │
│  ┌─────────────┐  ┌──────────────┐          │
│  │   Nginx     │  │   Frontend   │          │
│  │   :80       │──│   Container  │          │
│  └──────┬──────┘  └──────────────┘          │
│         │                                     │
│         │         ┌──────────────┐          │
│         └─────────│   Backend    │          │
│                   │   Container  │          │
│                   │   :8080      │          │
│                   └──────┬───────┘          │
│                          │                   │
│                   ┌──────▼───────┐          │
│                   │  PostgreSQL  │          │
│                   │  Container   │          │
│                   │  :5432       │          │
│                   └──────────────┘          │
│                                               │
│  ┌──────────────────────────────┐           │
│  │     Docker Volumes           │           │
│  │  • postgres_data             │           │
│  │  • uploads                   │           │
│  └──────────────────────────────┘           │
└──────────────────────────────────────────────┘
```

## Data Flow Diagrams

### User Authentication Flow

```
[User] → [Login Page] → [AuthController] → [AuthenticationManager]
                                                    ↓
                                          [CustomUserDetailsService]
                                                    ↓
                                              [UserRepository]
                                                    ↓
                                              [PostgreSQL]
                                                    ↓
                                          [JwtTokenProvider]
                                                    ↓
                                          [JWT Token] → [User]
```

### Assessment Submission Flow (UC-LMS-002)

```
[User] → [Take Quiz] → [Submit Answers] → [AssessmentController]
                                                    ↓
                                          [AssessmentService]
                                                    ↓
                                    ┌───────────────┴───────────────┐
                                    ↓                               ↓
                          [Calculate Score]              [Check Passing Score]
                                    ↓                               ↓
                          [Save Assessment]              [Update Progress]
                                    ↓                               ↓
                          [Generate Feedback]            [Unlock Next Module]
                                    ↓                               ↓
                                    └───────────────┬───────────────┘
                                                    ↓
                                          [Return Results] → [User]
```

### Resource Upload Flow (UC-CM-001)

```
[Admin] → [Upload Form] → [ResourceController] → [Validate File]
                                                        ↓
                                                  [Save to Storage]
                                                        ↓
                                                  [Create DB Record]
                                                        ↓
                                                  [ResourceRepository]
                                                        ↓
                                                  [PostgreSQL]
                                                        ↓
                                                  [Success Response] → [Admin]
```

## Scalability Considerations

### Current Architecture Supports:

1. **Horizontal Scaling**
   - Stateless backend (JWT tokens)
   - Multiple backend instances behind load balancer
   - Database connection pooling

2. **Caching Strategy**
   - Static resources cached by Nginx
   - API responses can be cached (Redis future enhancement)
   - Browser caching for frontend assets

3. **Performance Optimization**
   - Database indexing on frequently queried columns
   - Lazy loading for JPA relationships
   - Pagination for large result sets
   - Async processing for notifications

### Future Enhancements:

1. **Microservices Architecture**
   - Separate services for: Auth, Courses, Resources, Analytics
   - API Gateway for routing
   - Service discovery (Eureka)

2. **Cloud Deployment**
   - AWS/Azure deployment
   - S3/Blob storage for files
   - RDS for database
   - CloudFront/CDN for static assets

3. **Real-time Features**
   - WebSocket for live notifications
   - Live webinar streaming
   - Real-time progress tracking

## Monitoring & Logging

### Logging Strategy

```
Application Logs:
├── INFO: General application flow
├── DEBUG: Detailed debugging information
├── WARN: Potential issues
└── ERROR: Application errors

Log Destinations:
├── Console (Development)
├── File (Production)
└── Centralized Logging (Future: ELK Stack)
```

### Metrics to Monitor

1. **Application Metrics**
   - Request/response times
   - Error rates
   - Active users
   - API endpoint usage

2. **System Metrics**
   - CPU usage
   - Memory usage
   - Disk I/O
   - Network traffic

3. **Business Metrics**
   - Course enrollments
   - Assessment completion rates
   - Resource downloads
   - User engagement

## Conclusion

The ITAS Tax Education System architecture is designed for:
- **Security**: Multi-layer security with JWT, RBAC, and encrypted passwords
- **Scalability**: Stateless design supporting horizontal scaling
- **Maintainability**: Clear separation of concerns and modular design
- **Performance**: Optimized database queries and caching strategies
- **Extensibility**: Easy to add new features and integrations
