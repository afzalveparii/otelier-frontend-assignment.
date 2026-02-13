# 📌 Otelier – Hotel Search & Price Visualization App

<p align="center">
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" />
  <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" />
  <img src="https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white" />
  <img src="https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white" />
</p>

<p align="center">
  <a href="https://otelier-frontend-by-afzal-vepari-hjpcxf7a5.vercel.app/" target="_blank">
    <img src="https://img.shields.io/badge/🚀_Live_Demo-View_Project-blueviolet?style=for-the-badge&logo=vercel" alt="Live Demo" />
  </a>
</p> 

### 🚀 Overview
Otelier is a high-performance, full-stack hotel search application. It integrates the **Amadeus Hotel Offers API** via a secure serverless proxy, implements real-time authentication with **Supabase**, and provides interactive data visualization using **Chart.js**.

---

## 🏗 Architecture Overview

The project follows a modern decoupled architecture to ensure security and scalability:

```text
Frontend (React + Vite)
│
├── Supabase Authentication (User Auth & Persistence)
├── Context API (Global State: Hotels, Loading, Errors)
├── Chart.js (Interactive Price Visualization)
│
└── Vercel Serverless Proxy (The "Backend" Layer)
      └── Amadeus API (OAuth 2.0 + Hotel Search v3)
```
## 🔑 Key Architectural Decisions
### Serverless Proxy (Vercel API Route) Amadeus OAuth token <br>
  * Used to securely handle Amadeus OAuth token generation and protect API credentials from frontend exposure.
### Data Normalization at Backend Layer
  * Third-party API responses are normalized before sending to frontend to maintain a clean and stable UI data model.
### Context API for State Management
  * Centralized handling of hotel data, loading states, pagination, and error management.

## 🛠 Tech Stack
### 🔐 Authentication
<ul>
  <li> Supabase email/password login </li>
  <li> Protected routes </li>
  <li> Session persistence </li>
</ul>

### 🔐 Authentication-1
<ul>
  <li> Supabase email/password login </li>
  <li> Protected routes </li>
  <li> Session persistence </li>
</ul>

### 🔎 Hotel Search
<ul>
  <li> City-based hotel search </li>
  <li> Check-in / Check-out date selection </li>
  <li> Adults count filter </li>
</ul>

### 📊 Data Visualization
<ul>
  <li> Price comparison bar chart </li>
  <li> Dynamic update based on search results </li>
  <li> Price filter slider </li>
</ul>

### 📑 Data Controls
<ul>
  <li> Sorting (Low → High / High → Low) </li>
  <li> Pagination </li>
  <li> Debounced API calls </li>
  <li> Loading skeletons </li>
  <li> Clean error handling </li>
</ul>

### ❤️ Favorites
<ul>
  <li> Save / Remove favorite hotels </li>
  <li> Persisted using localStorage </li>
</ul>

### 🎨 UI Enhancements
<ul>
  <li> Skeleton loaders </li>
  <li> Animated hotel cards </li>
  <li> Responsive grid layout </li>
  <li> Clean UX state handling </li>
</ul>

### 🔐 Security Considerations
<ul>
  <li> API credentials stored in environment variables </li>
  <li> OAuth handled server-side </li>
  <li> No sensitive data exposed in frontend </li>
  <li> Proxy abstraction for third-party API </li>
</ul>

### 🧪 Running Locally
1️⃣ Install dependencies
```bash
npm install
```
2️⃣ Setup environment variables
Create a .env file:
```ini
VITE_SUPABASE_URL=your_supabse_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
AMADEUS_CLIENT_ID=your_client_id
AMADEUS_CLIENT_SECRET=your_client_secret
```
3️⃣ Run locally using Vercel Dev
```bash
vercel dev
```

### 🔐 Security Considerations
<ul>
  <li> Deployed on Vercel </li>
  <li> Environment variables configured in Vercel dashboard </li>
</ul>

### 📈 Future Improvements
<ul>
  <li> Infinite scrolling pagination </li>
  <li> Server-side caching for API calls </li>
  <li> Dark mode </li>
  <li> Better error boundary handling </li>
  <li> Unit testing with Jest / React Testing Library </li>
</ul>

### 👨‍💻 Author
<div align="center">
<img src="https://github.com/afzalveparii.png" width="100px;" alt="Afzal Vepari"/><br />
<strong>Afzal Vepari</strong><br />
<em>Full Stack Developer & Tech Enthusiast</em>
</div>

<p align="center">
<a href="https://linkedin.com/in/afzalveparii"><img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white" /></a>
<a href="https://job-portal-system-by-afzal-vepari.netlify.app/about"><img src="https://img.shields.io/badge/Portfolio-FF5722?style=for-the-badge&logo=google-chrome&logoColor=white" /></a>
<a href="mailto:afzal.vepariii@gmail.com"><img src="https://img.shields.io/badge/Email-D14836?style=for-the-badge&logo=gmail&logoColor=white" /></a>
</p>
