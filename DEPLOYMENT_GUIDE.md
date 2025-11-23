# Portfolio Deployment Guide

## 🚀 Free Hosting Options for Your Portfolio

### Option 1: Vercel (Recommended - Easiest)

#### Steps:
1. **Push your code to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/portfolio-jl.git
   git push -u origin main
   ```

2. **Deploy to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Sign up with GitHub
   - Click "New Project"
   - Import your repository
   - Vercel auto-detects Vite settings
   - Click "Deploy"

3. **Configure Build Settings** (if needed)
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

4. **Add Environment Variables**
   - Go to Project Settings → Environment Variables
   - Add all your `VITE_*` variables from `.env`

**That's it!** Your site will be live in ~2 minutes.

---

### Option 2: Netlify

#### Steps:
1. **Push code to GitHub** (same as above)

2. **Deploy to Netlify**
   - Go to [netlify.com](https://netlify.com)
   - Sign up with GitHub
   - Click "Add new site" → "Import an existing project"
   - Select your repository
   - Configure:
     - Build command: `npm run build`
     - Publish directory: `dist`
   - Click "Deploy site"

3. **Add Environment Variables**
   - Site settings → Environment variables
   - Add all `VITE_*` variables

---

### Option 3: GitHub Pages

#### Steps:
1. **Install gh-pages package**
   ```bash
   npm install --save-dev gh-pages
   ```

2. **Update package.json**
   Add to `scripts`:
   ```json
   "predeploy": "npm run build",
   "deploy": "gh-pages -d dist"
   ```

3. **Update vite.config.js**
   Add base path:
   ```js
   export default defineConfig({
     base: '/portfolio-jl/', // Your repo name
     // ... rest of config
   })
   ```

4. **Deploy**
   ```bash
   npm run deploy
   ```

5. **Enable GitHub Pages**
   - Go to repo Settings → Pages
   - Source: `gh-pages` branch
   - Your site: `https://YOUR_USERNAME.github.io/portfolio-jl`

---

### Option 4: Firebase Hosting

#### Steps:
1. **Install Firebase CLI**
   ```bash
   npm install -g firebase-tools
   ```

2. **Login**
   ```bash
   firebase login
   ```

3. **Initialize**
   ```bash
   firebase init hosting
   ```
   - Select existing project
   - Public directory: `dist`
   - Single-page app: Yes
   - Don't overwrite index.html: No

4. **Build and Deploy**
   ```bash
   npm run build
   firebase deploy --only hosting
   ```

---

## 📋 Pre-Deployment Checklist

- [ ] Create `.env` file with all environment variables
- [ ] Test build locally: `npm run build`
- [ ] Check `dist/` folder is generated correctly
- [ ] Verify all images/assets are loading
- [ ] Test all links and navigation
- [ ] Check mobile responsiveness
- [ ] Test contact form (if applicable)
- [ ] Update any hardcoded URLs to production URLs

## 🔧 Environment Variables Setup

For all platforms, add these in their respective settings:

```
VITE_FIREBASE_API_KEY=your_key
VITE_FIREBASE_AUTH_DOMAIN=your_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

## 🌐 Custom Domain (Optional)

All platforms support custom domains:
- **Vercel**: Project Settings → Domains → Add domain
- **Netlify**: Site settings → Domain management
- **GitHub Pages**: Repo Settings → Pages → Custom domain
- **Firebase**: Hosting → Add custom domain

## 📊 Comparison

| Platform | Ease of Use | Speed | Free Tier | Best For |
|----------|-------------|-------|-----------|----------|
| **Vercel** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | Excellent | React/Vite apps |
| **Netlify** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | Excellent | Static sites |
| **GitHub Pages** | ⭐⭐⭐ | ⭐⭐⭐ | Good | Simple sites |
| **Firebase** | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ | Good | Firebase users |

## 🎯 Recommendation

**Use Vercel** - It's the easiest, fastest, and best optimized for React/Vite applications. Setup takes less than 5 minutes!

---

## 🆘 Troubleshooting

### Build Fails
- Check Node.js version (should be 18+)
- Run `npm install` locally first
- Check for TypeScript errors: `npm run lint`

### Environment Variables Not Working
- Make sure variables start with `VITE_`
- Rebuild after adding variables
- Check variable names match exactly

### 404 Errors on Refresh
- Configure redirects for SPA:
  - **Vercel**: Auto-handled
  - **Netlify**: Add `_redirects` file in `public/`
  - **Firebase**: Configure in `firebase.json`

### Images Not Loading
- Check paths are relative (not absolute)
- Verify assets are in `public/` folder
- Check build output includes assets

---

**Need help?** Each platform has excellent documentation and support!

