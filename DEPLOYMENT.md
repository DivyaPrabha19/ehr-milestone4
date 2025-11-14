# Deployment Guide - Get Your Live Link

## 🚀 Quick Deploy Options

### 1. Railway (Recommended - Free Tier)
1. Go to [railway.app](https://railway.app)
2. Connect your GitHub repository
3. Add MySQL database service
4. Set environment variables:
   - `DB_HOST`: railway-mysql-host
   - `DB_PASSWORD`: divya1936
   - `DB_NAME`: brain_tumor_ehr
5. Deploy - Get instant live link!

### 2. Render (Free Tier)
1. Go to [render.com](https://render.com)
2. Create new Web Service from GitHub
3. Use `render.yaml` configuration
4. Add PostgreSQL database (free tier)
5. Deploy - Live link ready!

### 3. Heroku
```bash
# Install Heroku CLI
heroku create your-ehr-app
heroku addons:create cleardb:ignite
heroku config:set DB_HOST=your-cleardb-host
heroku git:remote -a your-ehr-app
git push heroku main
```

### 4. Google Cloud Run
```bash
gcloud run deploy ehr-system --source . --platform managed --region us-central1 --allow-unauthenticated
```

### 5. AWS App Runner
1. Create App Runner service
2. Connect to GitHub repository
3. Use `Dockerfile` for build
4. Add RDS MySQL database
5. Configure environment variables

## 🔗 Expected Live URLs
- Railway: `https://your-app-name.up.railway.app`
- Render: `https://your-app-name.onrender.com`
- Heroku: `https://your-ehr-app.herokuapp.com`
- Google Cloud: `https://ehr-system-xxx.a.run.app`

## 📊 Database Setup
Most platforms offer free MySQL/PostgreSQL databases. Update connection strings in deployment settings.

## ⚡ One-Click Deploy
Click these buttons for instant deployment:

[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/new/template)
[![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com/deploy)

Your EHR system will be live with a public URL in minutes!