# 🚀 Vercel Deployment Guide for Hozn Real Estate

## Prerequisites
- [Vercel Account](https://vercel.com) (free)
- Your code in Git repository (GitHub recommended for easier Vercel integration)
- PostgreSQL Database (recommend: [Supabase](https://supabase.com) or [Neon](https://neon.tech))

## 📋 Step-by-Step Deployment

### 1. Database Setup
Choose one of these PostgreSQL providers:

#### Option A: Supabase (Recommended)
1. Go to [Supabase](https://supabase.com)
2. Create new project
3. Get your database URL from Settings > Database > Connection string
4. Format: `postgresql://[user]:[password]@[host]:[port]/[database]`

#### Option B: Neon
1. Go to [Neon](https://neon.tech)
2. Create new project
3. Copy the connection string

### 2. Deploy Backend First

1. **Backend Repository Setup:**
   - Make sure your `/real-estate-backend` folder is in a Git repository
   - Can be separate repo or subfolder of main repo

2. **Deploy to Vercel:**
   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Click "New Project"
   - Import your backend repository (or select the backend folder)
   - Configure environment variables:
     ```
     DATABASE_URL=your_postgresql_connection_string
     JWT_SECRET=your_super_secure_jwt_secret
     NODE_ENV=production
     PORT=5000
     ```

3. **Note your backend URL:** `https://your-backend-name.vercel.app`

### 3. Deploy Frontend

1. **Update Frontend Environment:**
   - Create `.env.local` in root directory:
     ```
     NEXT_PUBLIC_API_URL=https://your-backend-name.vercel.app/api
     ```

2. **Deploy to Vercel:**
   - Import your main repository to Vercel
   - Vercel will auto-detect Next.js
   - Add environment variable:
     ```
     NEXT_PUBLIC_API_URL=https://your-backend-name.vercel.app/api
     ```

### 4. Database Migration

After backend deployment, run migrations:

1. **Install Vercel CLI:**
   ```bash
   npm i -g vercel
   ```

2. **Run Migrations:**
   ```bash
   vercel env pull .env.local
   npx sequelize-cli db:migrate --env production
   ```

## 🔧 Environment Variables Checklist

### Backend (.env)
- ✅ `DATABASE_URL`
- ✅ `JWT_SECRET`
- ✅ `NODE_ENV=production`
- ✅ `PORT=5000`

### Frontend (.env.local)
- ✅ `NEXT_PUBLIC_API_URL`

## 🎯 Post-Deployment Steps

1. **Test API endpoints:**
   ```bash
   curl https://your-backend-name.vercel.app/api/health
   ```

2. **Test frontend:**
   - Visit your Vercel frontend URL
   - Try signup/login functionality
   - Test property listings

## 🐛 Troubleshooting

### Common Issues:

1. **Database Connection Failed:**
   - Check DATABASE_URL format
   - Ensure database is accessible from Vercel
   - Verify credentials

2. **CORS Errors:**
   - Update CORS settings in backend
   - Add frontend domain to allowed origins

3. **Build Failures:**
   - Check TypeScript errors
   - Ensure all dependencies are installed
   - Review Vercel build logs

### Helpful Commands:
```bash
# Check Vercel deployment logs
vercel logs your-project-name

# Test local backend connection
curl http://localhost:5000/api/health

# Test production backend
curl https://your-backend-name.vercel.app/api/health
```

## 📞 Support
If you encounter issues, check:
- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Deployment Guide](https://nextjs.org/docs/deployment)
- [Sequelize Production Setup](https://sequelize.org/docs/v6/other-topics/deployment/)

---
🚀 **Happy Deploying!** Your Hozn Real Estate platform will be live in minutes!
