# Subscription Server

Service-based subscription management microservice built with MangoJS framework, CockroachDB, and integrated with Stripe and PayPal payment providers.

## 🏗️ Architecture

### Technology Stack
- **Runtime**: Node.js with TypeScript
- **Framework**: Express.js with MangoJS foundation
- **Database**: CockroachDB (PostgreSQL-compatible)
- **Payment Providers**: Stripe, PayPal
- **Authentication**: Integration with IAM service
- **Documentation**: Swagger/OpenAPI

### Service Structure
```
src/
├── db/
│   └── models/           # Database models (TypeORM)
│       ├── Subscription.model.ts
│       └── SubscriptionPlan.model.ts
├── routes/
│   ├── health/           # Health check endpoints
│   └── v1/               # API v1 routes
│       ├── subscriptions/ # Subscription management
│       └── plans/        # Plan management
├── services/             # Business logic services
│   ├── subscription.service.ts
│   ├── subscriptionPlan.service.ts
│   └── payment.service.ts
├── types/                # TypeScript type definitions
│   └── api/              # API request/response types
├── index.ts              # Application entry point
└── inversify.config.ts   # Dependency injection
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- CockroachDB
- pnpm (workspace package manager)
- Stripe account (for payment processing)
- PayPal developer account (for PayPal payments)

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

### Database Setup
```bash
# Start CockroachDB
cockroach start-single-node --insecure --listen-addr=localhost:26257

# Create database
cockroach sql --insecure --execute="CREATE DATABASE subscription_db;"
```

## 🔗 API Endpoints

### Base URL
```
http://localhost:3020/api/subscription/v1
```

### Subscription Management

#### Core Operations
- `GET /subscriptions` - Get user subscriptions (authenticated)
- `GET /subscriptions/{uid}` - Get subscription by ID (authenticated)
- `POST /subscriptions` - Create new subscription (authenticated)
- `PUT /subscriptions/{uid}` - Update subscription (authenticated)
- `DELETE /subscriptions/{uid}/cancel` - Cancel subscription (authenticated)

#### Subscription Control
- `POST /subscriptions/{uid}/pause` - Pause subscription (authenticated)
- `POST /subscriptions/{uid}/resume` - Resume subscription (authenticated)

### Subscription Plans

#### Public Endpoints
- `GET /plans` - Get available subscription plans (public)
- `GET /plans/{uid}` - Get plan by ID (public)

#### Admin Endpoints
- `GET /plans/admin` - Get all plans including inactive (admin only)
- `POST /plans` - Create subscription plan (admin only)
- `PUT /plans/{uid}` - Update subscription plan (admin only)
- `DELETE /plans/{uid}` - Deactivate subscription plan (admin only)

### Health Check
- `GET /health` - Service health status

## 🔒 Authentication & Authorization

### Integration with IAM Service
This service integrates with the existing `iam_server` for authentication:

- **User Authentication**: Users authenticate through IAM service
- **Admin Authorization**: Admin endpoints require admin group membership
- **Session Management**: Uses cookie-based authentication from IAM

### Authorization Levels
1. **Public**: Available subscription plans
2. **User**: Own subscription management
3. **Admin**: All subscription and plan management

## 💳 Payment Integration

### Supported Providers
1. **Stripe**
   - Credit card processing
   - Subscription management
   - Webhook support
   - Automatic renewals

2. **PayPal**
   - PayPal account payments
   - Subscription plans
   - Billing agreements
   - Webhook notifications

3. **Manual**
   - For internal/enterprise customers
   - Manual billing processes

### Payment Features
- **Recurring Billing**: Monthly and yearly subscriptions
- **Trial Periods**: Configurable trial days
- **Freemium Model**: Free tier with upgrade paths
- **Subscription Changes**: Upgrade/downgrade support
- **Payment Retry**: Automatic retry for failed payments

## 📊 Data Models

### Subscription
```typescript
interface Subscription {
    uid: string
    userId: string              // Reference to IAM user
    planId: string             // Reference to subscription plan
    status: SubscriptionStatus // ACTIVE, INACTIVE, CANCELED, etc.
    paymentProvider: PaymentProvider
    externalSubscriptionId?: string
    trialStartDate?: Date
    trialEndDate?: Date
    currentPeriodStart: Date
    currentPeriodEnd: Date
    autoRenew: boolean
    metadata?: Record<string, any>
}
```

### Subscription Plan
```typescript
interface SubscriptionPlan {
    uid: string
    name: string
    description?: string
    planType: PlanType         // FREE, BASIC, PREMIUM, ENTERPRISE
    price: number
    currency: string
    billingInterval: BillingInterval // MONTHLY, YEARLY, ONE_TIME
    trialDays?: number
    features?: Record<string, any>
    limits?: Record<string, any>
    isActive: boolean
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

### Environment Configuration
Key environment variables (see `.env.example`):

```env
# Database
DATABASE_URL=postgresql://root@localhost:26257/subscription_db

# Payment Providers
STRIPE_SECRET_KEY=sk_test_...
PAYPAL_CLIENT_ID=...

# Authentication
IAM_SERVICE_URL=http://localhost:3010
```

## 🔄 Business Logic

### Subscription Lifecycle
1. **Creation**: User selects plan and payment method
2. **Trial Period**: Optional trial period before billing
3. **Active**: Regular billing cycles
4. **Pause/Resume**: Temporary suspension
5. **Upgrade/Downgrade**: Plan changes
6. **Cancellation**: End of subscription

### Billing Cycles
- **Monthly**: 30-day recurring billing
- **Yearly**: 365-day recurring billing with discount
- **One-time**: Single payment (lifetime access)

### Payment Processing
1. **Stripe Flow**:
   - Create customer in Stripe
   - Attach payment method
   - Create subscription
   - Handle webhooks for status updates

2. **PayPal Flow**:
   - Create billing agreement
   - User approval process
   - Recurring payment setup
   - Webhook processing

## 📈 Monitoring & Analytics

### Health Checks
- Database connectivity
- Payment provider status
- IAM service connectivity
- Subscription processing health

### Key Metrics
- Active subscriptions
- Churn rate
- Revenue tracking
- Plan popularity
- Payment success rates

## 🚨 Error Handling

### Common Error Types
- `SUBSCRIPTION_NOT_FOUND` - Subscription doesn't exist
- `PLAN_NOT_FOUND` - Subscription plan doesn't exist
- `PAYMENT_FAILED` - Payment processing error
- `INVALID_SUBSCRIPTION_STATUS` - Invalid status transition
- `UNAUTHORIZED` - Authentication required

### Error Response Format
```json
{
    "ok": false,
    "timestamp": "2024-01-01T00:00:00.000Z",
    "requestId": "uuid-v4",
    "error": {
        "code": 400,
        "message": "Error description",
        "type": "ERROR_TYPE"
    }
}
```

## 🔧 Integration

### IAM Service Integration
```typescript
// Authentication decorator usage
@AuthDecorators.IsAuthorized()
@AuthDecorators.HasGroups(['admin'])
```

### Database Migrations
```bash
# Run migrations
npx typeorm migration:run

# Generate migration
npx typeorm migration:generate -n MigrationName
```

## 📋 TODO & Roadmap

- [ ] Add billing history endpoint
- [ ] Implement webhook handling
- [ ] Add subscription analytics
- [ ] Implement coupon/discount system
- [ ] Add subscription notifications
- [ ] Payment method management
- [ ] Invoice generation
- [ ] Usage-based billing support
- [ ] Multi-currency support
- [ ] Subscription metrics dashboard

---

## 🤝 Contributing

1. Follow MangoJS framework patterns
2. Use TypeScript strictly
3. Update API documentation
4. Ensure proper error handling
5. Add appropriate logging
6. Test payment integrations

## 📞 Support

For questions or issues related to the subscription service, please contact the development team.