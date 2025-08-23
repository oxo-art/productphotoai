
# Digital Ocean Deployment Configuration

## Required Package.json Changes

Add the following to your package.json scripts section:

```json
{
  "scripts": {
    "start": "serve -s dist -l 8080",
    "build": "tsc && vite build",
    "preview": "vite preview"
  }
}
```

## Deployment Steps for Digital Ocean App Platform

1. **Build Command**: `npm run build`
2. **Start Command**: `npm start`
3. **Port**: 8080 (already configured in vite.config.ts)
4. **Build Output Directory**: `dist`

## Environment Variables (if needed)
- Set `NODE_ENV=production` in your Digital Ocean app settings

## Troubleshooting

### Common npm Warnings
- **"npm warn config only Use `--omit=dev`"**: This warning appears when using deprecated `--only=production` flag. The Dockerfile has been updated to use `--omit=dev` instead.

### Build Issues
- Ensure all dependencies are properly installed
- Verify the build command completes successfully
- Check that the dist folder is created after build

## Alternative: Static Site Deployment

If you prefer to deploy as a static site instead of an app:

1. Use Digital Ocean's Static Sites feature
2. Build Command: `npm run build`
3. Output Directory: `dist`
4. Add the following to handle client-side routing:

Create a `_redirects` file in the public folder with:
```
/*    /index.html   200
```

This ensures all routes are handled by React Router.
