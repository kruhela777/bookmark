# Smart Bookmark App

A modern, production-ready bookmark management web application built with Next.js, Supabase Authentication, Google OAuth, and Tailwind CSS.

This project was developed as part of a technical screening task to demonstrate real-world authentication flow, deployment handling, OAuth integration, and secure environment configuration.

## 🚀 Live Demo

🔗 Production URL:
👉 https://bookmark-9lzc.vercel.app/

## 🛠 Tech Stack

- Framework: Next.js (App Router)

- Frontend Library: React

- Authentication & Backend: Supabase

- OAuth Provider: Google

- Styling: Tailwind CSS

- Deployment: Vercel

- Language: TypeScript

## ✨ Features
### 🔐 Google OAuth Authentication

- Secure login using Supabase Auth

- Google OAuth integration

- Proper callback handling

- Production-safe redirect configuration

### 📊 Dashboard (Post Login)

- Protected route

- Session-based access control

- Automatic redirect if unauthenticated

### 🎨 Modern UI

- Glassmorphism UI design

- Responsive layout

- Gradient background elements

- Accessible button interactions

### 🌍 Production Ready

- Dynamic OAuth redirect handling

- Environment variable configuration

- Deployed on Vercel

- Supabase URL configured correctly

## 🔄 Authentication Flow

1. User clicks Sign in with Google

2. Redirected to Google OAuth

3. Google authenticates user

4. Redirected to Supabase

5. Supabase returns session to /auth/callback
 
6. User is redirected to Dashboard

## 🔁 Dynamic Redirect Handling

Instead of hardcoding localhost, the app uses:

redirectTo: `${window.location.origin}/auth/callback`

## ✅ This ensures:

- Works in local development (localhost)

- Works in production (Vercel)

- No environment mismatch issues

## ⚙️ Environment Configuration

### 1️⃣ Supabase Site URL
```bash
https://bookmark-9lzc.vercel.app/
```
### 2️⃣ Redirect URLs Added in Supabase
```bash
http://localhost:3000/auth/callback

https://bookmark-9lzc.vercel.app/auth/callback
```
### 3️⃣ Google OAuth Authorized Redirect URI
```bash
https://rjpsegsncyrtulzxqlfd.supabase.co/auth/v1/callback
```

## 🖥 Local Development Setup

### 1️⃣ Clone Repository
```bash
git clone https://github.com/kruhela777/bookmark.git

cd bookmark
```
### 2️⃣ Install Dependencies
```bash
npm install
```
### 3️⃣ Create .env.local
```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url

NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
```
### 4️⃣ Run Development Server
```bash
npm run dev
```
## 🚀 Deployment Process

- Connected GitHub repository to Vercel

- Each push to main triggers automatic deployment

### Production Checklist

- Node version locked (24.x)

- React version aligned with Next.js

- Environment variables added in Vercel

- Supabase Site URL updated

- Redirect URLs configured

- Dynamic OAuth redirect implemented

## 🧠 Challenges Faced & Solutions
### ❌ OAuth redirecting to localhost in production

Cause: Hardcoded redirect URL

Solution: Used dynamic origin-based redirect

### ❌ Supabase production misconfiguration

Cause: Site URL still pointing to localhost

Solution: Updated Supabase Site URL

### ❌ Deployment build issues

Cause: Version mismatches & environment setup

Solution: Locked Node version and aligned dependencies

📂 Project Structure
```
app/
 ├── page.tsx
 ├── dashboard/
 ├── auth/
 │   └── callback/
lib/
 └── supabaseClient.ts
```
## 🔒 Security Considerations

- Environment variables stored securely

- OAuth handled via Supabase

- No secrets exposed in frontend

- Production redirect properly validated

## 📈 Future Improvements

- Bookmark CRUD functionality

- Folder categorization

- Search & filtering

- User profile page

- Bookmark sharing

- Rate limiting & middleware protection
  
## 👩‍💻 Author
### Kritika Ruhela
### Full Stack Developer

🌐 Portfolio: https://kruhela.tech/

🔗 GitHub: https://github.com/kruhela777
