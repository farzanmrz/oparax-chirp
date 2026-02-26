# Vercel Deployment Guide

Step-by-step instructions for deploying the Oparax frontend to Vercel.

## Prerequisites

- GitHub account with this repo pushed
- Vercel account (free tier works — sign up at vercel.com)
- Your Supabase environment variables ready

## Step 1: Connect GitHub to Vercel

1. Go to [vercel.com](https://vercel.com) and sign in (use "Continue with GitHub")
2. Click "Add New..." > "Project"
3. Find and select the `oparax-chirp` repository
4. Vercel will auto-detect it as a Next.js project

## Step 2: Configure Project Settings

Before clicking "Deploy", configure these settings:

- **Root Directory**: Click "Edit" and set to `frontend`
  - This tells Vercel to look in `frontend/` for your Next.js app, not the repo root
- **Framework Preset**: Should auto-detect "Next.js" — leave it
- **Build Command**: Leave default (`next build` or auto-detected)
- **Install Command**: Leave default (Vercel auto-detects pnpm from `pnpm-lock.yaml`)

## Step 3: Set Environment Variables

Still on the project setup page (or later in Settings > Environment Variables):

| Variable | Value | Environment |
| -------- | ----- | ----------- |
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL | Production, Preview, Development |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | Your Supabase publishable key | Production, Preview, Development |

Select all three environments (Production, Preview, Development) for each variable.

## Step 4: Deploy

Click "Deploy." Vercel will:

1. Clone your repo
2. Navigate to `frontend/`
3. Run `pnpm install` (installs all JavaScript packages)
4. Run `pnpm build` (compiles TypeScript, bundles everything)
5. Deploy the output to a global CDN

You'll get a URL like `oparax-chirp.vercel.app`.

## Step 5: Configure Supabase Redirect URL

After deployment, update your Supabase project to recognize the Vercel URL:

1. Go to Supabase Dashboard > Authentication > URL Configuration
2. Add your Vercel URL to "Redirect URLs": `https://your-project.vercel.app/**`
3. This is required for email confirmation links to work in production

## Auto-Deploy on Push

Once connected, every `git push` to `main` triggers a new deployment automatically:

- Push to `main` → Production deployment
- Push to other branches → Preview deployment (separate URL for testing)

## Custom Domain (Optional)

1. In Vercel: Settings > Domains
2. Add your domain (e.g., `app.oparax.com`)
3. Follow Vercel's DNS instructions (usually add a CNAME record)
4. Update Supabase redirect URLs to include the custom domain

## Troubleshooting

- **Build fails**: Check that `frontend/.env.local` variables are set in Vercel's dashboard
- **Auth doesn't work**: Make sure the Vercel URL is in Supabase's redirect URLs
- **Wrong root directory**: Verify "Root Directory" is set to `frontend` in project settings
