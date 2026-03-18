# Vote App

A simple voting application where users can create topics with multiple options and vote on them.

## Tech Stack

- **Backend**: .NET 8, ASP.NET Core, Entity Framework Core
- **Database**: SQL Server
- **Frontend**: Angular 17, Bootstrap 5
- **Containerization**: Docker

## Prerequisites

- .NET 8 SDK
- Node.js 18+
- SQL Server (or Docker)
- Git

## Project Structure

```
vote-app/
├── Api/                    # Backend .NET API
│   ├── Modules/           # Feature modules
│   │   ├── Topic/         # Topic management
│   │   └── Vote/          # Voting functionality
│   ├── Shared/            # Shared code (DB, models, repositories)
│   ├── Migrations/        # Database migrations
│   └── Program.cs         # API configuration
├── client/                # Frontend Angular application
└── docker-compose.yml     # Docker setup
```

## Setup & Installation

### 1. Backend Setup

Navigate to the Api folder:
```bash
cd Api
```

Install dependencies:
```bash
dotnet restore
```

Set up the database (using Docker):
```bash
docker-compose up -d
```

Apply migrations:
```bash
dotnet ef database update
```

### 2. Frontend Setup

Navigate to the client folder:
```bash
cd client
```

Install dependencies:
```bash
npm install
```

## Running the Application

### Backend

```bash
cd Api
dotnet run
```

API will be available at: `http://localhost:5000`
Swagger documentation: `http://localhost:5000/swagger`

### Frontend

```bash
cd client
npm run start
```

Client will be available at: `http://localhost:4200`
