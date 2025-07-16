# Resource Management Application - POC

A proof-of-concept resource management application built with modern technologies.

## Overview

This repository contains a full-stack resource management application designed to efficiently track, allocate, and manage organizational resources including personnel, equipment, and facilities.

## Technology Stack

- **Backend**: Java 21 + Spring Boot 3.x
- **Frontend**: React 19 + TypeScript
- **Database**: PostgreSQL
- **Containerization**: Docker & Docker Compose
- **Architecture**: Monorepo structure

## Repository Structure

```
resource-management-poc/
├── backend/          # Java Spring Boot application
├── frontend/         # React application
├── docker-compose.yml
└── REQUIREMENTS.md   # Detailed requirements document
```

## Quick Start

### Prerequisites
- Docker and Docker Compose
- Java 21 (for local development)
- Node.js 20+ (for local development)

### Running with Docker
```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

### Local Development
See individual README files in `backend/` and `frontend/` directories for detailed setup instructions.

## Documentation

- [Requirements Document](REQUIREMENTS.md) - Comprehensive technical requirements
- [Backend README](backend/README.md) - Backend setup and API documentation
- [Frontend README](frontend/README.md) - Frontend setup and development guide

## Features

- Resource inventory management
- Resource allocation and scheduling
- User management with role-based access
- Real-time availability tracking
- Reporting and analytics dashboard
- RESTful API with OpenAPI documentation

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Submit a pull request

## License

This project is a proof-of-concept and is provided as-is for demonstration purposes.
