# IAM Server

Identity and Access Management (IAM) microservice built with Node.js, Express, TypeScript, and MongoDB. This service handles authentication, authorization, and user management for both Admin and Partner users.

## 🏗️ Architecture

### Technology Stack
- **Runtime**: Node.js with TypeScript
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT with HTTP-only cookies
- **Documentation**: Swagger/OpenAPI
- **DI Container**: InversifyJS
- **Security**: Helmet.js, CORS

### Service Structure
```
src/
├── db/
│   └── models/           # Mongoose models and schemas
│       ├── AdminUser.model.ts
│       ├── Group.model.ts
│       └── PartnerUser.model.ts
├── routes/
│   ├── health/           # Health check endpoints
│   └── v1/               # API v1 routes
│       ├── admins/       # Admin user management
│       ├── auth/         # Authentication endpoints
│       ├── groups/       # Group management
│       └── partners/     # Partner user management
├── services/             # Business logic services
│   ├── adminUser.service.ts
│   ├── authorizationService.ts
│   ├── groups.service.ts
│   └── partnerUser.service.ts
├── types/                # TypeScript type definitions
│   ├── api/              # API request/response types
│   ├── adminUser.type.ts
│   └── adminPartner.type.ts
├── index.ts              # Application entry point
├── inversify.config.ts   # Dependency injection configuration
└── inversify.types.ts    # DI type definitions
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- MongoDB
- pnpm (workspace package manager)

### Installation
```bash
# Install dependencies
pnpm install

# Build the service
pnpm build

# Start development server
pnpm start:dev

# Start production server
pnpm start
```

### Environment Variables
Create a `.env` file in the service root:

```env
# Server Configuration
PORT=3010

# MongoDB Configuration  
MONGO_URI=mongodb://localhost:27017
MONGO_DB=iam_database

# JWT Secrets (Admin)
ADMIN_COOKIE_KEY_FIRST=your-admin-secret-part1
ADMIN_COOKIE_KEY_SECOND=your-admin-secret-part2

# JWT Secrets (Partner)
PARTNER_COOKIE_KEY_FIRST=your-partner-secret-part1
PARTNER_COOKIE_KEY_SECOND=your-partner-secret-part2

# JWT Secrets (User)
USER_COOKIE_KEY_FIRST=your-user-secret-part1
USER_COOKIE_KEY_SECOND=your-user-secret-part2

# Cookie Configuration (Admin)
ADMIN_COOKIE_NAME=admin_session
ADMIN_COOKIE_DOMAIN=localhost
ADMIN_COOKIE_MAX_AGE=86400000
ADMIN_COOKIE_SAMESITE=none
ADMIN_COOKIE_HTTPONLY=true
ADMIN_COOKIE_SECURE=false
ADMIN_COOKIE_SIGNED=false
ADMIN_COOKIE_OVERWRITE=true
ADMIN_COOKIE_PRIORITY=medium
ADMIN_COOKIE_PARTITIONED=false
ADMIN_COOKIE_PATH=/

# Cookie Configuration (Partner)
PARTNER_COOKIE_NAME=partner_session
PARTNER_COOKIE_DOMAIN=localhost
PARTNER_COOKIE_MAX_AGE=86400000
PARTNER_COOKIE_SAMESITE=none
PARTNER_COOKIE_HTTPONLY=true
PARTNER_COOKIE_SECURE=false
PARTNER_COOKIE_SIGNED=false
PARTNER_COOKIE_OVERWRITE=true
PARTNER_COOKIE_PRIORITY=medium
PARTNER_COOKIE_PARTITIONED=false
PARTNER_COOKIE_PATH=/

# Cookie Configuration (User)
USER_COOKIE_NAME=user_session
USER_COOKIE_DOMAIN=localhost
USER_COOKIE_MAX_AGE=86400000
USER_COOKIE_SAMESITE=none
USER_COOKIE_HTTPONLY=true
USER_COOKIE_SECURE=false
USER_COOKIE_SIGNED=false
USER_COOKIE_OVERWRITE=true
USER_COOKIE_PRIORITY=medium
USER_COOKIE_PARTITIONED=false
USER_COOKIE_PATH=/

# Legacy Cookie Support
COOKIE_NAME=legacy_session
```

## 🔗 API Endpoints

### Base URL
```
http://localhost:3010/api/iam/v1
```

### Authentication Endpoints

#### Admin Authentication
- `POST /api/iam/v1/auth/admins/login` - Admin user login
- `POST /api/iam/v1/auth/admins/logout` - Admin user logout  
- `POST /api/iam/v1/auth/admins/register` - Admin user registration
- `POST /api/iam/v1/auth/admins/verify` - Verify admin JWT token

#### Partner Authentication
- `POST /api/iam/v1/auth/partners/login` - Partner user login
- `POST /api/iam/v1/auth/partners/logout` - Partner user logout
- `POST /api/iam/v1/auth/partners/register` - Partner user registration  
- `POST /api/iam/v1/auth/partners/verify` - Verify partner JWT token

### User Management Endpoints

#### Admin Users
- `GET /api/iam/v1/admins` - Get all admin users
- `POST /api/iam/v1/admins` - Create admin user
- `PUT /api/iam/v1/admins/{uid}` - Update admin user
- `POST /api/iam/v1/admins/{uid}/disable` - Disable admin user
- `POST /api/iam/v1/admins/{uid}/enable` - Enable admin user  
- `DELETE /api/iam/v1/admins/{uid}/delete/hard` - Hard delete admin user
- `GET /api/iam/v1/admins/magiclinks/{magiclink}` - Get admin by magic link
- `POST /api/iam/v1/admins/activate/{magiclink}` - Activate admin via magic link
- `PUT /api/iam/v1/admins/{uid}/groups` - Update admin user groups

#### Partner Users  
- `GET /api/iam/v1/partners` - Get all partner users
- `POST /api/iam/v1/partners` - Create partner user

### Group Management Endpoints

#### General Groups
- `GET /api/iam/v1/groups` - Get all groups
- `DELETE /api/iam/v1/groups` - Delete group

#### Admin Groups
- `GET /api/iam/v1/groups/admin` - Get admin-specific groups
- `POST /api/iam/v1/groups/admin` - Create admin group

#### Partner Groups
- `GET /api/iam/v1/groups/partner` - Get partner-specific groups  
- `POST /api/iam/v1/groups/partner` - Create partner group

### Health Check
- `GET /health` - Service health status

## 🔒 Authentication & Authorization

### JWT Cookie Authentication
The service uses JWT tokens stored in HTTP-only cookies for secure authentication:

- **Admin Cookie**: Stores admin user JWT token
- **Partner Cookie**: Stores partner user JWT token  
- **User Cookie**: Stores general user JWT token
- **Security Features**:
  - HTTP-only cookies prevent XSS attacks
  - Secure flag for HTTPS in production
  - SameSite protection against CSRF
  - Configurable expiration (default: 24 hours)
  - Domain and path restrictions
  - Cookie signing support

### Cookie Configuration
Each user type has separate cookie configuration:
- **Name**: Configurable cookie names for each user type
- **Domain**: Cookie domain restrictions
- **Max Age**: Session duration (default: 86400000ms = 24 hours)
- **SameSite**: CSRF protection (`strict`, `lax`, `none`)
- **HTTP Only**: Prevents client-side JavaScript access
- **Secure**: HTTPS-only flag for production
- **Path**: Cookie path restrictions (default: `/`)
- **Priority**: Cookie priority (`low`, `medium`, `high`)
- **Partitioned**: Third-party cookie partitioning support

### User Types & Permissions
1. **Admin Users**: Full system access, user management capabilities
2. **Partner Users**: Limited access based on partner-specific permissions
3. **Groups**: Role-based access control through group membership

### Magic Link Authentication
Users can be activated through secure magic links:
- Time-limited activation links
- Secure token generation
- Email-based user verification

## 📊 Data Models

### AdminUser
```typescript
interface IAdminUser {
    uid: string
    firstName: string
    lastName: string
    username: string
    email: string
    phoneNumber: string
    status: string
    password: string
    groups: Array<IGroup>
    age: number
    isActive: boolean
    isVerified: boolean
    magicLink: string
    magicLinkExpireDate: Date
    verifiedAt: Date
    disabledAt: Date
    createdAt: Date
    updatedAt: Date
}
```

### Group
```typescript
interface IGroup {
    name: string
    description: string
    permissions: string[]
    userType: 'ADMIN' | 'PARTNER'
    createdAt: Date
    updatedAt: Date
}
```

## 🛠️ Development

### Available Scripts
```bash
pnpm build          # Compile TypeScript
pnpm start          # Start production server
pnpm start:dev      # Start development server with hot reload
pnpm swagger        # Generate Swagger documentation
```

### Code Structure
- **Controllers**: Handle HTTP requests/responses
- **Services**: Business logic layer
- **Models**: Database schemas and interfaces
- **Types**: TypeScript type definitions
- **Middleware**: Authentication, validation, error handling

### Dependency Injection
The service uses InversifyJS for dependency injection:
- Clean architecture separation
- Testable code structure
- Service lifecycle management

## 📝 API Documentation

### Swagger UI
Access the interactive API documentation at:
```
http://localhost:3010/docs
```

The Swagger configuration is defined in `swagger.json` with the following setup:
- **OpenAPI Version**: 3.0.0
- **Title**: Auth Server (IAM Server)
- **Security**: Cookie-based authentication for Admin users

### Postman Collection
Import the API endpoints into Postman using the OpenAPI/Swagger specification.

## 🔧 Configuration

### CORS Settings
```javascript
const corsOptions = {
    allowedOrigins: [
        'http://localhost:3080',
        'http://localhost:3090'
    ],
    credentials: true
}
```

### Security Headers
The service uses Helmet.js for security headers:
- Content Security Policy
- XSS Protection  
- HSTS Headers
- Frame Options

## 🚨 Error Handling

The service implements centralized error handling:
- Structured error responses
- HTTP status codes
- Request ID tracking
- Timestamp logging

### Error Response Format
```json
{
    "ok": false,
    "timestamp": "2024-01-01T00:00:00.000Z",
    "requestId": "uuid-v4",
    "error": {
        "code": 400,
        "message": "Error description",
        "type": "BAD_REQUEST"
    }
}
```

## 📈 Monitoring & Logging

### Health Checks
- Service status endpoint
- Database connectivity check
- Dependency health validation

### Logging
- Request/response logging
- Error tracking
- Performance metrics
- Audit trails for user actions

## 🔄 Integration

### Foundation Package
This service depends on the internal `foundation` workspace package for:
- Common utilities and helpers
- Shared type definitions
- Authentication decorators
- Database persistence context
- Server builder and middleware

### Database Integration
- **MongoDB**: NoSQL database for user and group data storage
- **Mongoose ODM**: Object Document Mapping with TypeScript support
- **Connection**: `MONGO_URI` and `MONGO_DB` environment variables
- **Transaction Support**: ACID transactions for data consistency
- **Schema Validation**: Mongoose schemas with TypeScript interfaces
- **Indexing**: Optimized queries for user lookup and authentication
- **Collections**: 
  - `adminusers` - Admin user accounts and profiles
  - `partnerusers` - Partner user accounts
  - `groups` - Role-based access control groups

## 📋 TODO & Roadmap

- [ ] Add rate limiting
- [ ] Implement password reset flow  
- [ ] Add user activity logging
- [ ] Implement 2FA support
- [ ] Add API versioning strategy
- [ ] Performance monitoring integration
- [ ] Add comprehensive test suite

---

## 🤝 Contributing

1. Follow the established code structure
2. Use TypeScript strictly
3. Update API documentation for new endpoints
4. Ensure proper error handling
5. Add appropriate logging

## 📞 Support

For questions or issues related to the IAM service, please contact the development team.