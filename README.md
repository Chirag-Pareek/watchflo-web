# WatchFlo Web

The official website for **WatchFlo** — a beautifully designed, AI-driven YouTube companion application. WatchFlo helps you take back control of your time, generate instant video summaries, filter distractions, and keep focus on Android.

🔗 **Official Website:** [watchfloapp.com](https://watchfloapp.com)

---

## Features

- **Sleek Landing Page**: Premium, custom-styled dark and light theme layouts.
- **Early Access Waitlist**: A modern, accessible modal sign-up form allowing users to apply for alpha/beta testing.
- **Email Delivery Integration**: Form submissions automatically forward to the developer's email using Web3Forms.
- **Fluid Visuals**: Dynamic animations powered by GSAP and smooth scrolling powered by Lenis.
- **Interactive Mockups**: Responsive phone mockups displaying screenshots of the Android app.

## Tech Stack

- **Framework**: React 19 + TypeScript + Vite
- **Styling**: Tailwind CSS + custom design variables (light/dark themes)
- **Animations**: GSAP (GreenSock Animation Platform) + Lenis Scroll
- **UI Components**: Radix UI Dialog primitives
- **Notifications**: Sonner

---

## Local Development

### 1. Prerequisites
Ensure you have [Node.js](https://nodejs.org) installed.

### 2. Installation
Clone the repository and install dependencies:
```bash
npm install
```

### 3. Environment Setup
Create a `.env` file in the root folder:
```env
VITE_WEB3FORMS_KEY=your-web3forms-access-key-here
```
*(You can obtain a free key at [web3forms.com](https://web3forms.com))*

### 4. Run Development Server
```bash
npm run dev
```

### 5. Production Build
To build and check the production package:
```bash
npm run build
```
The static files will build into the `dist/` directory.

---

## Deployment
This project is configured for serverless deployment on **Vercel**. 
To trigger a new deployment from the terminal:
```bash
vercel --prod
```

