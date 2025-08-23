
# Digital Ocean Web Service Deployment Configuration

## Required Package.json Changes (Manual Step)

Add the following to your package.json scripts section:

```json
{
  "scripts": {
    "start": "node server.js",
    "build": "tsc -b && vite build",
    "preview": "vite preview"
  }
}
```

## Web Service Deployment Steps for Digital Ocean App Platform

### Option 1: Docker Container Deployment (Recommended)
1. **Repository**: Connect your GitHub/GitLab repository
2. **Type**: Select "Docker" as the resource type
3. **Dockerfile Path**: Use the root Dockerfile
4. **Port**: 8080 (automatically configured)
5. **Health Check**: Built-in health check endpoint at `/`

### Option 2: Node.js App Deployment
1. **Build Command**: `npm run build`
2. **Start Command**: `npm start`
3. **Port**: 8080 (configured in server)
4. **Node Version**: 18.x
5. **Build Output Directory**: `dist`

## Environment Variables
- Set `NODE_ENV=production` in your Digital Ocean app settings
- Set `PORT=8080` (optional, defaults to 8080)

## Web Service Features
- **Express Server**: Serves built React application
- **Client-Side Routing**: Handles React Router with proper fallback
- **Health Checks**: Built-in endpoint monitoring
- **Production Optimized**: Separate build and runtime stages
- **Auto-scaling**: Compatible with Digital Ocean's scaling features

## Troubleshooting

### Docker Build Issues
- **"exit status 127"**: Fixed by using consistent npm package manager
- **Missing TypeScript**: All dev dependencies installed during build phase
- **Port binding**: Server binds to 0.0.0.0:8080 for container compatibility

### Runtime Issues
- Check application logs in Digital Ocean dashboard
- Verify environment variables are set correctly
- Ensure health check endpoint is responding

### Performance Optimization
- Static assets are served directly by Express
- Gzip compression enabled by default
- Production builds are minified and optimized

## Deployment Commands Summary
- **Build**: Compiles TypeScript and bundles with Vite
- **Start**: Runs Express server serving the built application
- **Health**: Automatic health monitoring on port 8080
- **Scaling**: Horizontal scaling supported via Digital Ocean

This configuration creates a proper Node.js web service that can handle dynamic requests and scale automatically.
