# ⚡ Simple Deployment Checklist

## 🚀 Deploy in 3 Steps

### Step 1: Get Database
- Go to [Supabase.com](https://supabase.com) 
- Create project → Copy connection string

### Step 2: Deploy Backend
- Go to [Vercel.com](https://vercel.com)
- New Project → Import your repo → Select `real-estate-backend` folder
- Add environment variables:
  ```
  DATABASE_URL=your_supabase_connection_string
  JWT_SECRET=any_random_secret_key_here
  NODE_ENV=production
  ```
- Deploy → Copy the URL

### Step 3: Deploy Frontend  
- Vercel → New Project → Import your repo (main folder)
- Add environment variable:
  ```
  NEXT_PUBLIC_API_URL=https://your-backend-url.vercel.app/api
  ```
- Deploy → Done! 🎉

## ✅ That's it!
Your Hozn Real Estate platform is live!

Test it: Visit your frontend URL and try the signup/login features.

---
**Need help?** Check the detailed `DEPLOYMENT.md` guide.
