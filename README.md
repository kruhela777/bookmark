Smart Bookmark App

A modern, production-ready bookmark management web application built with Next.js, Supabase Authentication, and Tailwind CSS.

This project was developed as part of a technical screening task to demonstrate:

Authentication flow implementation

Production deployment handling

OAuth integration

Secure environment configuration

Clean UI/UX implementation

Proper redirect handling in development & production

🚀 Live Demo

🔗 Production URL:
https://bookmark-9lzc.vercel.app/

🛠 Tech Stack

Framework: Next.js (App Router)

Frontend Library: React

Authentication & Backend: Supabase

OAuth Provider: Google

Styling: Tailwind CSS

Deployment: Vercel

Language: TypeScript

✨ Features
🔐 Google OAuth Authentication

Secure login using Supabase Auth

Google OAuth integration

Proper callback handling

Production-safe redirect configuration

📊 Dashboard (Post Login)

Protected route

Session-based access control

Redirect if unauthenticated

🎨 Modern UI

Clean glassmorphism design

Responsive layout

Gradient background elements

Accessible button interactions

🌍 Production Ready

Dynamic OAuth redirect handling

Environment variable configuration

Deployed on Vercel

Supabase URL configuration handled correctly

🔄 Authentication Flow

User clicks Sign in with Google

Redirected to Google OAuth

Google authenticates user

Redirected to Supabase

Supabase returns session to /auth/callback

User redirected to Dashboard

🔁 Dynamic Redirect Handling

Instead of hardcoding localhost, we used:

redirectTo: `${window.location.origin}/auth/callback`


This ensures:

Works in local development (localhost)

Works in production (Vercel URL)

No environment mismatch issues

⚙️ Environment Configuration
Supabase Configuration
1️⃣ Site URL

Set to:

https://bookmark-9lzc.vercel.app/

2️⃣ Redirect URLs

Added:

http://localhost:3000/auth/callback
https://bookmark-9lzc.vercel.app/auth/callback

3️⃣ Google OAuth

Authorized Redirect URI configured as:

https://rjpsegsncyrtulzxqlfd.supabase.co/auth/v1/callback

🖥 Local Development Setup
1️⃣ Clone Repository
git clone https://github.com/kruhela777/bookmark.git
git clone 
cd bookmark

2️⃣ Install Dependencies
npm install

3️⃣ Create .env.local
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY

4️⃣ Run Development Server
npm run dev


Visit:

https://bookmark-9lzc.vercel.app/

🚀 Deployment Process
Connected GitHub to Vercel

Each push to main triggers automatic deployment.

Production Checklist

Node version locked (24.x)

React version compatible with Next.js

Environment variables added in Vercel

Supabase Site URL updated

Redirect URLs configured

Dynamic OAuth redirect implemented

🧠 Challenges Faced & Solutions
❌ Issue: OAuth redirecting to localhost in production

Cause: Hardcoded redirect URL
Solution: Used dynamic origin-based redirect

❌ Issue: Supabase production misconfiguration

Cause: Site URL still pointing to localhost
Solution: Updated Supabase URL Configuration

❌ Issue: Deployment build concerns

Cause: Version mismatches & environment setup
Solution: Locked Node version and aligned dependencies

📂 Project Structure
app/
 ├── page.tsx
 ├── dashboard/
 ├── auth/
 │    └── callback/
lib/
 └── supabaseClient.ts

🔒 Security Considerations

Environment variables stored securely

OAuth handled via Supabase

No secrets exposed in frontend

Production redirect properly validated

📈 Future Improvements

Add bookmark CRUD functionality

Add folder categorization

Add search & filtering

Add user profile page

Add bookmark sharing feature

Add rate limiting & middleware protection

👩‍💻 Author

Kritika Ruhela
Full Stack Developer
