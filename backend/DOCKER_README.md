# Docker Setup for Course Planner Backend

This project is now configured to run with Docker containers, including the TypeScript backend server and MongoDB database.

## Prerequisites

- Docker Desktop installed and running
- Docker Compose (usually comes with Docker Desktop)

## Quick Start

1. **Install dependencies** (first time only):
   ```bash
   cd backend
   npm install
   ```

2. **Start all services**:
   ```bash
   docker-compose up --build
   ```

3. **Access your services**:
   - Backend API: http://localhost:8000
   - MongoDB: localhost:27017
   - MongoDB Express (optional): http://localhost:8081 (admin/admin123)

## Docker Commands

### Start Services
```bash
# Start in foreground (see logs)
docker-compose up --build

# Start in background
docker-compose up -d --build

# Start without rebuilding
docker-compose up
```

### Stop Services
```bash
# Stop and remove containers
docker-compose down

# Stop and remove containers + volumes
docker-compose down -v
```

### View Logs
```bash
# View all logs
docker-compose logs

# View backend logs
docker-compose logs -f backend

# View MongoDB logs
docker-compose logs -f mongo
```

### Rebuild and Restart
```bash
# Rebuild and restart specific service
docker-compose up --build backend

# Restart without rebuilding
docker-compose restart backend
```

## Development Workflow

1. **Code changes** are automatically reflected due to volume mounting
2. **Restart the backend container** when you make changes:
   ```bash
   docker-compose restart backend
   ```
3. **View logs** to debug:
   ```bash
   docker-compose logs -f backend
   ```

## Environment Variables

Create a `.env` file in the backend directory:
```env
NODE_ENV=development
DB_URI=mongodb://mongo:27017/course-planner
PORT=8000
```

## Troubleshooting

### Port Already in Use
If port 8000 is already in use:
```bash
# Find what's using the port
lsof -i :8000

# Kill the process or change the port in docker-compose.yml
```

### MongoDB Connection Issues
```bash
# Check if MongoDB is running
docker-compose ps mongo

# View MongoDB logs
docker-compose logs mongo

# Restart MongoDB
docker-compose restart mongo
```

### Rebuild Everything
```bash
# Stop and remove everything
docker-compose down -v

# Remove all images
docker system prune -a

# Start fresh
docker-compose up --build
```

## Production Deployment

For production, consider:
- Using the production Dockerfile
- Setting up proper environment variables
- Using a reverse proxy (nginx)
- Setting up SSL certificates
- Using Docker Swarm or Kubernetes for orchestration
