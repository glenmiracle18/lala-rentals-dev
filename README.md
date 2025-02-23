# LaLa Rental Booking Platform

A seamless property rental and booking system built with modern web technologies, featuring authentication, property listings, and a robust booking system.

![image](https://github.com/user-attachments/assets/12051fe3-b8a5-4fc1-8b8b-a591898ccca8)

https://www.loom.com/share/1c9285a87c9e43fcaafb8328ce76ee1c?t=24&sid=219eb2d0-45b4-40bb-9d31-482e90accd8e

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Architecture](#architecture)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
- [Development](#development)
  - [Project Structure](#project-structure)
  - [Database Schema](#database-schema)
  - [API Endpoints](#api-endpoints)
- [Deployment](#deployment)
  - [Docker](#docker)
  - [Google Cloud Run](#google-cloud-run)
  - [CI/CD Pipeline](#cicd-pipeline)
- [Performance Optimizations](#performance-optimizations)
- [Security Features](#security-features)
- [Future Enhancements](#future-enhancements)
- [Troubleshooting](#troubleshooting)
- [License](#license)

## Overview

LaLa Rental Platform is a comprehensive solution for property rentals, allowing hosts to list their properties and renters to book them for specific date ranges. The platform features a sleek, user-friendly interface with robust backend functionality to handle authentication, listings, and bookings efficiently.

## Features

### User Authentication
- Clerk OAuth integration for secure login
- Role-based access control (Host/Renter)
- Protected routes
- Session management
- Sever side (middleware) route protection

### Property Management
- Create, read, update, and delete property listings
- Detailed property information (bedrooms, bathrooms, location, description)
- Pricing and availability management

### Booking System
- Real-time availability checking
- Double-booking prevention
- Booking status workflows (Pending, Confirmed, Canceled)
- Date range selection
- Automated notifications (future intergration)

### User Interface
- Responsive design for all devices
- Intuitive property search and filtering
- Clean, modern aesthetics
- Optimized user flows for both hosts and renters

## Technology Stack

### Core Technologies Overview

1. **Next.js (App Router)**
   * **Version**: 15.01
   * **Purpose**: Full-stack React framework for the application
   * **Key Features Used**:
      * App Router for enhanced routing and layouts
      * Server Components for improved performance
      * API Routes for backend functionality
      * Dynamic routing for property listings (/properties/[id])
      * Metadata API for SEO optimization
      * Image optimization with next/image

2. **Neon (PostgreSQL)**
   * **Purpose**: Serverless Postgres database
   * **Key Benefits**:
      * Serverless architecture
      * Built-in connection pooling
      * Automatic scaling
      * Branch feature for development
   * **Database Schema Areas**:
      * User profiles (extending Clerk data)
      * Property listings
      * Bookings
      * Reviews and ratings
3. **Ngrok**
   * **Purpose**: Secure Webhook Tunneling
   * **Key Benefits**:
      * Tunneling for Clerk webhooks
      * Start at build time features
      * Realtime Processing and updates
    
3. **Server Actions**
   * **Purpose**: Handle server-side mutations and data processing
   * **Implementation Areas**:
      * Property creation and updates
      * Booking management
      * Image upload processing
      * Search functionality
   * **Key Features**:
      * Progressive enhancement
      * Built-in error handling
      * Form validation
      * Optimistic updates

4. **TanStack React Query**
   * **Version**: v5
   * **Purpose**: State management and server state synchronization
   * **Implementation**:
      * Custom hooks for data fetching
      * Mutations for data updates
      * Optimistic updates for better UX
      * Infinite loading for property listings
   * **Key Features Used**:
      * Automatic background refetching
      * Cache management
      * refetch calls
      * Error handling
      * Loading states

5. **Uploadthing**
   * **Purpose**: Handle image uploads for property listings
   * **Implementation**:
      * Property image uploads
      * User avatar uploads
      * Multiple image upload support
   * **Features**:
      * Direct-to-cloud uploads
      * React Dropzone multi upload
      * Image optimization
      * Progress tracking
      * File type validation

6. **Clerk**
   * **Purpose**: Authentication and user management
   * **Implementation**:
      * Role-based access control (Host/Renter)
      * Social authentication (Google)
      * User profile management
   * **Key Features**:
      * Protected routes
      * Middleware for auth checks
      * User roles and permissions
      * Session management

7. **shadcn/ui**
   * **Purpose**: UI component library
   * **Key Components Used**:
      * Form elements (inputs, selects, buttons)
      * Dialog modals
      * Date pickers for bookings
      * Cards for property listings
      * Navigation components
      * Tables for booking management
   * **Customization**:
      * Custom theme configuration
      * Tailwind CSS integration
      * Responsive design patterns

8. **TailwindCSS**
   * **Purpose**: Utility-first CSS framework
   * **Configuration**:
      * Custom color scheme
      * Extended theme configuration
      * Custom container queries
      * Responsive breakpoints
   * **Organization**:
      * Component-specific styles
      * Global styles
      * Dark mode support
      * Animation classes

### Additional Technologies

#### Frontend
- **React**: Component-based UI development
- **TypeScript**: Type-safe code
- **React Hook Form**: Form validation

#### Backend
- **Node.js**: JavaScript runtime
- **Prisma**: ORM for database operations
- **Next Server (onlly): server calls

#### Infrastructure
- **Docker**: Containerization
- **Google Cloud Run**: Serverless deployment
- **Github Action: CI/CD workflows
- **Google Cloud Build**: CI/CD integration
- **Google Cloud Storage**: Image storage

## Architecture

The application follows a modern architecture:

1. **Client Layer**: Next.js server and client components
2. **API Layer**: API routes handling business logic
3. **Data Access Layer**: Prisma ORM interfacing with PostgreSQL
4. **Infrastructure**: Containerized with Docker, deployed to Google Cloud Run

This separation of concerns ensures maintainability and scalability of the codebase.

## Getting Started

### Prerequisites

- Node.js (v18 or later)
- npm or yarn
- PostgreSQL database
- Google OAuth credentials
- Clerk account
- Docker (for containerization)

### Installation

```bash
# Clone the repository
git clone https://github.com/glenmiracle18/lala-rental-platform.git
cd lala-rental-platform

# Install dependencies
npm install

# Set up the database
npx prisma migrate dev
npx prisma generate

# Run the development server
npm run dev
```

### Environment Variables

Create a `.env` file in the root directory:

```
DATABASE_URL=
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=

NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up

SIGNING_SECRET=

UPLOADTHING_TOKEN='
UPLOADTHING_SECRET=
```

## Development

### Project Structure

```
├── app/
│   ├── (auth)/             # Authentication routes
│   ├── (main)/             # Main application routes
│   ├── api/                # API endpoints
│   └── globals.css         # Global styles
├── components/             # UI components
│   ├── ui/                 # Shadcn components
│   ├── modals/             # Modal components
│   └── forms/              # Form components
├── lib/                    # Utility functions
├── prisma/                 # Database schema and migrations
├── public/                 # Static assets
└── src/
    ├── actions/            # Server actions
    ├── hooks/              # Custom React hooks
    └── types/              # TypeScript types
```

### Database Schema

The database uses Prisma ORM with the following key models:

```prisma
model User {
  id        String    @id @default(cuid())
  email     String    @unique
  name      String?
  role      Role      @default(RENTER)
  properties Property[]
  bookings  Booking[]
}

model Property {
  id          String        @id @default(cuid())
  title       String
  description String
  price       String
  location    String
  hostId      String
  images      PropertyImage[]
  bookings    Booking[]
  bedrooms    Int
  bathrooms   Int
  // ...other fields
}

model Booking {
  id          String        @id @default(cuid())
  propertyId  String
  property    Property      @relation(fields: [propertyId], references: [id])
  renterId    String
  checkIn     DateTime
  checkOut    DateTime
  status      BookingStatus @default(PENDING)
  // ...other fields
}
```

## Deployment

### Docker

The application is containerized using Docker for consistency across environments:

```dockerfile
FROM node:18-alpine AS base

FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package*.json ./
RUN npm ci --legacy-peer-deps

FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NEXT_TELEMETRY_DISABLED 1

RUN npx prisma generate
RUN npm run build 

FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["npm", "start"]
```

### Google Cloud Run

Deployment to Google Cloud Run:

1. **Build and push the Docker image**:
```bash
gcloud builds submit --tag gcr.io/your-project-id/lala-rental-platform
```

2. **Deploy to Cloud Run**:
```bash
gcloud run deploy lala-rental-platform \
  --image gcr.io/your-project-id/lala-rental-platform \
  --platform managed \
  --allow-unauthenticated \
  --region us-central1 \
  --set-env-vars "DATABASE_URL=your-connection-string,CLERK_SECRET_KEY=your-key"
```

### CI/CD Pipeline

The project uses Google Cloud Build for CI/CD with the following workflow:

1. **On push to main branch**:
   - Run tests
   - Build Docker image
   - Push to Container Registry
   - Deploy to Cloud Run

Example `cloudbuild.yaml`:

```yaml
steps:
  - name: 'gcr.io/cloud-builders/npm'
    args: ['install', '--legacy-peer-deps']
  
  - name: 'gcr.io/cloud-builders/npm'
    args: ['run', 'test']
  
  - name: 'gcr.io/cloud-builders/docker'
    args: ['build', '-t', 'gcr.io/$PROJECT_ID/lala-rental-platform', '.']
  
  - name: 'gcr.io/cloud-builders/docker'
    args: ['push', 'gcr.io/$PROJECT_ID/lala-rental-platform']
  
  - name: 'gcr.io/google.com/cloudsdktool/cloud-sdk'
    entrypoint: gcloud
    args:
      - 'run'
      - 'deploy'
      - 'lala-rental-platform'
      - '--image=gcr.io/$PROJECT_ID/lala-rental-platform'
      - '--platform=managed'
      - '--region=us-central1'
      - '--allow-unauthenticated'
```

## Performance Optimizations

- **Image Optimization**: Using Next.js Image component
- **Lazy Loading**: Components and routes
- **Server Components**: Reducing client-side JavaScript
- **Edge Caching**: For static content
- **Database Indexing**: Optimized queries
- **Connection Pooling**: For database efficiency

## Security Features

- **OAuth Authentication**: Secure user login
- **Role-Based Access Control**: Limiting actions by user type
- **Input Validation**: Preventing injection attacks
- **CSRF Protection**: Cross-site request forgery prevention
- **Rate Limiting**: Preventing abuse
- **Environment Variable Encryption**: Secure configuration

## Future Enhancements

- Payment processing integration
- Review and rating system
- Advanced search and filtering
- Messaging system between hosts and renters
- Calendar integration
- Mobile app development
- Analytics dashboard for hosts

## Troubleshooting

### Common Issues

**Database Connection Errors**
- Ensure your DATABASE_URL is correctly formatted
- Check that your database server is running
- Verify network access to the database

**Deployment Issues**
- Regenerate Prisma client in the build process
- Use `--legacy-peer-deps` flag for npm installations
- Check environment variables in your deployment environment

**Authentication Problems**
- Verify Clerk API keys are correct
- Ensure redirect URLs are properly configured
- Check browser console for Clerk-related errors

## License

[MIT License](LICENSE)

---

© 2025 LaLa Rental Platform by Glen Miracle. All Rights Reserved.
