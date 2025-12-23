# Docker Deployment Guide

This guide explains how to build and deploy the portfolio web app using Docker.

## Prerequisites

- Docker installed on your system
- Docker Compose (optional, but recommended)

## Quick Start

### Using Docker Compose (Recommended)

1. **Build and start the container:**
   ```bash
   docker-compose up -d
   ```

2. **View logs:**
   ```bash
   docker-compose logs -f portfolio
   ```

3. **Stop the container:**
   ```bash
   docker-compose down
   ```

### Using Docker CLI

1. **Build the image:**
   ```bash
   docker build -t animated-journey-portfolio .
   ```

2. **Run the container:**
   ```bash
   docker run -d \
     --name portfolio \
     -p 8080:80 \
     --restart unless-stopped \
     animated-journey-portfolio
   ```

3. **View logs:**
   ```bash
   docker logs -f portfolio
   ```

4. **Stop and remove the container:**
   ```bash
   docker stop portfolio
   docker rm portfolio
   ```

## Accessing the Application

Once the container is running, access the application at:
- **Local:** http://localhost:8080
- **Network:** http://YOUR_SERVER_IP:8080

## Health Check

The container includes a health check endpoint:
```bash
curl http://localhost:8080/health
```

## Production Deployment

### Deploy to Azure Container Instances

```bash
# Login to Azure
az login

# Create a resource group
az group create --name portfolio-rg --location eastus

# Create container registry
az acr create --resource-group portfolio-rg --name portfolioregistry --sku Basic

# Build and push to ACR
az acr build --registry portfolioregistry --image portfolio:latest .

# Deploy to ACI
az container create \
  --resource-group portfolio-rg \
  --name portfolio-container \
  --image portfolioregistry.azurecr.io/portfolio:latest \
  --dns-name-label mxsarmiento-portfolio \
  --ports 80 \
  --cpu 1 \
  --memory 1
```

### Deploy to AWS ECS

```bash
# Login to ECR
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin YOUR_ACCOUNT_ID.dkr.ecr.us-east-1.amazonaws.com

# Create ECR repository
aws ecr create-repository --repository-name portfolio

# Tag and push
docker tag animated-journey-portfolio:latest YOUR_ACCOUNT_ID.dkr.ecr.us-east-1.amazonaws.com/portfolio:latest
docker push YOUR_ACCOUNT_ID.dkr.ecr.us-east-1.amazonaws.com/portfolio:latest

# Deploy using ECS (use AWS Console or CLI)
```

### Deploy to Google Cloud Run

```bash
# Build and push to Google Container Registry
gcloud builds submit --tag gcr.io/YOUR_PROJECT_ID/portfolio

# Deploy to Cloud Run
gcloud run deploy portfolio \
  --image gcr.io/YOUR_PROJECT_ID/portfolio \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated \
  --port 80
```

## Docker Image Details

- **Base Image:** nginx:alpine (production)
- **Build Image:** node:20-alpine
- **Port:** 80
- **Size:** ~50MB (compressed)

## Features

- ✅ Multi-stage build for optimized image size
- ✅ Nginx web server with custom configuration
- ✅ Gzip compression enabled
- ✅ Static asset caching
- ✅ SPA routing support
- ✅ Security headers
- ✅ Health check endpoint
- ✅ Automatic restart on failure

## Troubleshooting

### Container won't start
```bash
docker logs portfolio
```

### Check container health
```bash
docker inspect --format='{{json .State.Health}}' portfolio
```

### Rebuild without cache
```bash
docker build --no-cache -t animated-journey-portfolio .
```

## Environment Variables

No environment variables are required for basic deployment. The app is configured to work out of the box.

## Custom Domain

To use a custom domain:

1. Configure your DNS to point to your server IP
2. Update nginx configuration in the Dockerfile to include your domain
3. Add SSL/TLS certificates (recommended: use a reverse proxy like Caddy or Traefik)

## Support

For issues or questions, contact: mxsarmiento@live.com
