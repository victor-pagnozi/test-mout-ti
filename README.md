# Mouts

## Getting Started

### Prerequisites

- Docker and Docker Compose
- pnpm

### Running the Application

#### Backend Setup

1. Start the required services:

```bash
docker compose up backend-database backend-cache-redis -d
```

2. Navigate to the backend directory:

```bash
cd apps/backend
```

3. Copy the environment file:

```bash
cp .env.example .env
```

4. Install dependencies:

```bash
pnpm install
```

5. Start the development server:

```bash
pnpm start:dev
```

#### Frontend Setup

1. Navigate to the frontend directory:

```bash
cd apps/frontend
```

2. Copy the environment file:

```bash
cp .env.example .env
```

3. Install dependencies:

```bash
pnpm install
```

4. Start the development server:

```bash
pnpm dev
```

Your application should now be running!

## API Documentation

The API documentation is available via Swagger UI at:
```
http://localhost:3001/docs
```

Replace `localhost:3000` with your backend URL if running on a different host or port.
