# Job-Portal-Full-Stack
This is a full-stack job application platform that connects job seekers (students) with employers (recruiters). The application allows recruiters to create company profiles, post job listings, and manage applications, while students can browse jobs, apply to them, and manage their applications.

## Frontend Architecture of the project
This job portal application provides a two-sided marketplace:
- **For Job Seekers**: Browse and apply for jobs, track application status, and manage profiles
- **For Recruiters**: Post job listings, manage company information, and review applicants

## Folder Structure

```
job-portal-app/
├── public/                  # Public assets and HTML entry point
│   ├── index.html           # Main HTML file
│   └── assets/              # Static assets (images, fonts, etc.)
├── src/                     # Source code directory
│   ├── components/          # React components
│   │   ├── admin/           # Admin/recruiter focused components
│   │   │   ├── AdminJobs.jsx              # Admin jobs dashboard page
│   │   │   ├── AdminJobsTable.jsx         # Table for displaying admin jobs
│   │   │   ├── Applicants.jsx             # Applicant listing page
│   │   │   ├── ApplicantsTable.jsx        # Table for displaying applicants
│   │   │   ├── Companies.jsx              # Companies management page
│   │   │   ├── CompaniesTable.jsx         # Table for displaying companies
│   │   │   ├── CompanySetup.jsx           # Form for setting up company info
│   │   │   ├── CreateCompany.jsx          # Page for creating new companies
│   │   │   ├── PostJob.jsx                # Form for posting new jobs
│   │   │   └── ProtectedRoute.jsx         # Route guard for admin routes
│   │   ├── auth/            # Authentication components
│   │   │   ├── Login.jsx                  # Login form
│   │   │   └── Signup.jsx                 # Registration form
│   │   ├── pages/           # Main application pages
│   │   │   ├── Browse.jsx                 # Job browsing page
│   │   │   ├── Home.jsx                   # Landing page
│   │   │   ├── Jobs.jsx                   # Jobs listing page
│   │   │   └── Profile.jsx                # User profile page
│   │   └── shared/          # Shared/reusable components
│   │       ├── AppliedJobTable.jsx        # Table showing applied jobs
│   │       ├── CategoryCarousel.jsx       # Job categories carousel
│   │       ├── FilterCard.jsx             # Job filtering component
│   │       ├── Footer.jsx                 # Footer component
│   │       ├── HeroSection.jsx            # Hero banner with search
│   │       ├── Job.jsx                    # Job card component
│   │       ├── JobDescription.jsx         # Job details component
│   │       ├── LatestJobCard.jsx          # Latest job card
│   │       ├── LatestJobs.jsx             # Latest jobs section
│   │       ├── Navbar.jsx                 # Navigation bar
│   │       └── UpdateProfileDialog.jsx    # Profile update modal
│   ├── hooks/               # Custom React hooks
│   │   ├── useGetAllAdminJobs.jsx         # Hook for fetching admin jobs
│   │   ├── useGetAllCompanies.jsx         # Hook for fetching companies
│   │   ├── useGetAllJobs.jsx              # Hook for fetching all jobs
│   │   ├── useGetAppliedJobs.jsx          # Hook for fetching applied jobs
│   │   └── useGetCompanyById.jsx          # Hook for fetching company details
│   ├── redux/               # Redux state management
│   │   ├── slices/          # Redux Toolkit slices
│   │   │   ├── applicationSlice.js        # Application state management
│   │   │   ├── authSlice.js               # Authentication state management
│   │   │   ├── companySlice.js            # Company state management
│   │   │   └── jobSlice.js                # Jobs state management
│   │   └── store.js                       # Redux store configuration
│   ├── utils/               # Utility functions and constants
│   │   └── constants.js                   # API endpoints and other constants
│   ├── App.jsx              # Main application component with routing
│   └── index.js             # Entry point for React application
├── package.json             # Dependencies and scripts
└── README.md                # Project documentation
```

## Key Features

### For Job Seekers
- User registration and profile management
- Browse and search for jobs with filtering options
- View detailed job descriptions
- Apply for jobs with resume submission
- Track application status

### For Recruiters
- Company profile management
- Post and manage job listings
- Review applicants and update application status
- Access to applicant information and resumes

## Technologies Used

- **React**: Frontend UI library
- **Redux Toolkit**: State management
- **React Router**: Navigation and routing
- **Redux Persist**: State persistence across sessions
- **Custom Hooks**: For API integration and data fetching


## Application Flow

### Job Seeker Flow
1. Register/Login as a student
2. Browse available jobs
3. Apply for positions by submitting resume
4. Track application status in profile
5. Update profile information

### Recruiter Flow
1. Register/Login as a recruiter
2. Set up company profile
3. Post new job listings
4. Review applicants for posted jobs
5. Accept or reject applications

## Backend Architecture
The backend is built using Node.js with Express.js as the web framework and MongoDB as the database. It follows a modular architecture with clear separation of concerns.
### Core Technologies
**Node.js & Express.js:** Server-side JavaScript runtime and web framework<br>
**MongoDB & Mongoose:** NoSQL database and ODM (Object Document Mapper)<br>
**JWT (JSON Web Tokens):** For authentication and session management<br>
**Bcrypt.js:** For password hashing and security<br>
**Cloudinary:** For cloud-based file storage (images, resumes)<br>
**Multer:** For handling file uploads<br>

Directory Structure
The backend has a well-organized structure:
```
backend/
├── index.js                  # Entry point of the application
├── .env                      # Environment variables (sensitive configuration)
├── package.json              # Dependencies and scripts
├── models/                   # Database schema definitions
│   ├── user.model.js         # User schema (students and recruiters)
│   ├── company.model.js      # Company schema
│   ├── job.model.js          # Job listing schema
│   └── application.model.js  # Job application schema
├── controllers/              # Business logic
│   ├── user.controller.js    # User authentication and profile management
│   ├── company.controller.js # Company operations
│   ├── job.controller.js     # Job listing operations
│   └── application.controller.js # Application operations
├── routes/                   # API endpoints
│   ├── user.route.js         # User routes
│   ├── company.route.js      # Company routes
│   ├── job.route.js          # Job routes
│   └── application.route.js  # Application routes
├── middlewares/              # Custom middleware functions
│   ├── isAuthenticated.js    # Authentication middleware
│   └── multer.js             # File upload middleware
└── utils/                    # Utility functions
    ├── db.js                 # Database connection
    ├── cloudinary.js         # Cloudinary configuration
    └── dataURI.js            # File to data URI conversion
```

### Database Models

1. User Model: Represents both students and recruiters with role-based differentiation
   Core fields: fullname, email, password (hashed), phoneNumber, role,
   Profile information: bio, skills, resume, company (for recruiters), profilePhoto


3. Company Model: Represents an organization created by recruiters
   Core fields: name, description, website, location, logo,
   Reference to the user who created it (userId)


3. Job Model: Represents job listings posted by recruiters
   Core fields: title, description, requirements, salary, location, jobType, position, experienceLevel
   References to the company and user who created it
   List of applications received for this job


Application Model: Represents a job application submitted by a student
References to the job and applicant (user)
Status tracking (pending, accepted, rejected)



### API Endpoints
The application exposes several RESTful API endpoints:

User Routes:

- POST /api/v1/user/register: Register a new user (student or recruiter)
- POST /api/v1/user/login: Authenticate a user and create a session
- POST /api/v1/user/profile/update: Update user profile information
- GET /api/v1/user/logout: End a user session


Company Routes:

- POST /api/v1/company/register: Create a new company profile
- GET /api/v1/company/get: Get companies owned by the logged-in user
- GET /api/v1/company/get/:id: Get a specific company by ID
- PUT /api/v1/company/update/:id: Update company information


Job Routes:

- POST /api/v1/job/post: Create a new job listing
- GET /api/v1/job/get: Get all jobs (with optional search functionality)
- GET /api/v1/job/get/:id: Get a specific job by ID
- GET /api/v1/job/getadminjob: Get jobs created by the logged-in recruiter


Application Routes:

- GET /api/v1/application/apply/:id: Apply for a job
- GET /api/v1/application/get: Get applications made by the logged-in student
- GET /api/v1/application/:id/applicants: Get applicants for a specific job
- POST /api/v1/application/status/:id/update: Update application status



### Authentication and Security

JWT-based authentication stored in HTTP-only cookies
Password hashing using bcrypt
Route protection using the isAuthenticated middleware
Proper error handling and validation

### File Upload and Storage

Uses Multer for handling file uploads (profile photos, resumes, company logos)
Files are stored as buffers in memory and then converted to DataURIs
Files are then uploaded to Cloudinary cloud storage for permanent storage
URLs to the uploaded files are stored in the database
