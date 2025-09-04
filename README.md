# 🚀 AI Job Tracker

An AI-powered web application to help users **track job applications, analyze resumes, and match job descriptions with required skills**.  
Built with **Next.js, TypeScript, Prisma, Supabase, and OpenAI API**.

---

## ✨ Features

- 🔐 **Authentication** – Secure login via Google/GitHub using NextAuth.
- 📂 **Job Application Tracker** – Add, edit, and filter applications by status.
- 📄 **Resume Upload** – Upload and store your resume (PDF).
- 🤖 **AI Resume Analyzer** – Get AI-powered suggestions to improve your resume.
- 📊 **AI Job Description Matcher** – Compare resumes with job descriptions and highlight missing skills.
- 📈 **Dashboard & Analytics** – Visualize application success rate and progress with charts.
- 🌐 **Deployment Ready** – Hosted on Vercel with Supabase backend.

---

## 🛠️ Tech Stack

- **Frontend:** [Next.js](https://nextjs.org/) (App Router) + [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [TailwindCSS](https://tailwindcss.com/) + [shadcn/ui](https://ui.shadcn.com/)
- **Backend:** Next.js API Routes + [Prisma](https://www.prisma.io/)
- **Database:** [Supabase](https://supabase.com/) (PostgreSQL)
- **Auth:** [NextAuth.js](https://next-auth.js.org/) (Google/GitHub login)
- **AI:** [OpenAI API](https://platform.openai.com/)
- **Deployment:** [Vercel](https://vercel.com/) + Supabase hosting

---

## 📂 Project Structure

job-ai-tracker/
│── prisma/ # Prisma schema & migrations
│── src/
│ ├── app/ # Next.js app router pages
│ ├── components/ # Reusable UI components
│ ├── lib/ # Utility functions (db, auth, etc.)
│ ├── api/ # API routes (job tracker, resume, AI)
│── public/ # Static assets
│── .env # Environment variables
│── README.md # Project documentation

---

## ⚡ Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/YOUR-USERNAME/job-ai-tracker.git
cd job-ai-tracker
```
