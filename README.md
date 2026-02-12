# Workspace OS

Workspace OS is an advanced, integrated productivity environment designed to streamline professional workflows. It provides a modular architecture for managing tasks, project pipelines, research notes, and informational bookmarks within a unified, high-performance interface.

## Core Features

- **Integrated Task Management**: Robust task tracking with status transitions and priority handling.
- **Dynamic Project Pipelines**: Flexible Kanban-style boards for visual project progress tracking and stage management.
- **Contextual Note-Taking**: A sophisticated system for capturing and organizing internal documentation and research.
- **Resource Management**: Efficient bookmarking system for external references and cross-platform resource curation.
- **Personalized Dashboard**: A data-driven overview featuring real-time statistics, activity streams, and customizable interface widgets.
- **User Preferences**: Persistent configuration for application behavior and interface presentation.

## Technology Stack

- **Framework**: Next.js 15 (App Router)
- **Programming Language**: Javascript/TypeScript
- **State Management**: Redux Toolkit
- **Persistence Layer**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth.js
- **Styling**: Tailwind CSS
- **Interactions**: Framer Motion
- **Component Library**: Radix UI / Shadcn UI

## System Requirements

- Node.js 20 or higher
- PostgreSQL 14 or higher
- npm or equivalent package manager

## Installation and Setup

### 1. Repository Setup

Clone the repository to your local environment:

```bash
git clone <repository-url>
cd workspace-os
```

### 2. Dependency Installation

Install the required package dependencies:

```bash
npm install
```

### 3. Environment Configuration

Create a `.env` file in the root directory based on the following template:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/workspace_db"
AUTH_SECRET="your-secret-key"
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
```

### 4. Database Initialization

Generate the Prisma client and synchronize the database schema:

```bash
npx prisma generate
npx prisma db push
```

### 5. Development Environment

Initialize the development server:

```bash
npm run dev
```

The application will be accessible at `http://localhost:3000`.

## Production Deployment

### Building for Production

To generate a production-optimized build:

```bash
npm run build
```

### Starting the Application

To execute the application in production mode:

```bash
npm run start
```

## Maintenance and Testing

### Linting

Ensure code quality and style consistency:

```bash
npm run lint
```

## Continuous Integration

The project includes a GitHub Actions workflow that performs automated installation, linting, and build verification on every push and pull request to the main branch.
