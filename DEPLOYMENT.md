# MoodFlow Deployment Guide

## Deployment Options

### Option 1: Vercel (Recommended)

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Deploy**
   ```bash
   vercel
   ```

3. **Add Environment Variables** in Vercel Dashboard:
   - `VITE_FIREBASE_API_KEY`
   - `VITE_FIREBASE_AUTH_DOMAIN`
   - `VITE_FIREBASE_PROJECT_ID`
   - `VITE_FIREBASE_STORAGE_BUCKET`
   - `VITE_FIREBASE_MESSAGING_SENDER_ID`
   - `VITE_FIREBASE_APP_ID`
   - `VITE_GITHUB_TOKEN`

### Option 2: Netlify

1. **Install Netlify CLI**
   ```bash
   npm i -g netlify-cli
   ```

2. **Build and Deploy**
   ```bash
   npm run build
   netlify deploy --prod
   ```

3. **Configure Environment Variables** in Netlify Dashboard

### Option 3: Firebase Hosting

1. **Install Firebase CLI**
   ```bash
   npm i -g firebase-tools
   ```

2. **Initialize Firebase**
   ```bash
   firebase init hosting
   ```

3. **Deploy**
   ```bash
   npm run build
   firebase deploy
   ```

## Firebase Setup

1. **Create Firebase Project**
   - Go to [Firebase Console](https://console.firebase.google.com/)
   - Create a new project
   - Enable Authentication with Google and Apple providers

2. **Set up Firestore**
   - Create a Firestore Database
   - Deploy security rules from `firestore.rules`

3. **Configure OAuth**
   - Add authorized domains in Firebase Console
   - Set up OAuth consent screen
   - Configure redirect URIs

4. **Get Configuration**
   - Go to Project Settings > General
   - Copy your Firebase config
   - Add to `.env` file

## GitHub Models Setup

1. **Get GitHub Token**
   - Go to GitHub Settings > Developer settings > Personal access tokens
   - Generate a new token with appropriate scopes
   - Add to `.env` as `VITE_GITHUB_TOKEN`

## Custom Domain

### Vercel
1. Go to Project Settings > Domains
2. Add your domain
3. Update DNS records as instructed

### Netlify
1. Go to Domain settings
2. Add custom domain
3. Configure DNS

### Firebase
1. Go to Hosting > Add custom domain
2. Follow verification steps
3. Wait for SSL provisioning

## Environment Variables

Create a `.env` file with:

```env
# Firebase
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id

# GitHub Models
VITE_GITHUB_TOKEN=your_github_token
VITE_GITHUB_MODEL_ENDPOINT=https://models.inference.ai.azure.com
```

## Post-Deployment Checklist

- [ ] Test authentication flows
- [ ] Verify database writes
- [ ] Test AI features
- [ ] Check responsive design
- [ ] Verify HTTPS is enabled
- [ ] Test on multiple browsers
- [ ] Monitor error logs
- [ ] Set up analytics (optional)

## Troubleshooting

### Build Errors
- Clear `node_modules` and reinstall: `rm -rf node_modules && npm install`
- Clear build cache: `rm -rf dist .vite`

### Authentication Issues
- Verify OAuth redirect URIs
- Check Firebase authorized domains
- Ensure environment variables are set

### Database Errors
- Check Firestore security rules
- Verify user permissions
- Check Firebase console logs

## Monitoring

Set up monitoring using:
- Firebase Analytics
- Vercel Analytics
- Sentry for error tracking
- Google Lighthouse for performance

## Continuous Deployment

Both Vercel and Netlify support automatic deployments:
1. Connect your GitHub repository
2. Configure build settings
3. Push to main branch to deploy automatically
