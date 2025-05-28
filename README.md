# Frontend Developer Assignment by <Mulinti Rohith Naidu>

## Project info

**Live Deployment URL:** [Add your live deployment URL here]

## How can I edit this code?

There are several ways of editing your application.

### Use your preferred IDE

You can clone this repository and work locally using your favorite IDE.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

Follow these steps:


# Step 1: Clone the repository using the project's Git URL.
`git clone <YOUR_GIT_URL>`

# Step 2: Navigate to the project directory.
`cd <YOUR_PROJECT_NAME>`

# Step 3: Install the necessary dependencies.
`npm i`

# Step 4: Start the development server with auto-reloading and an instant preview.
`npm run dev`

## ✏️ Editing Files in GitHub

### Option 1: Edit a File Directly
1. Navigate to the desired file in the repository.
2. Click the **pencil icon** (🖉) at the top right to enter edit mode.
3. Make your changes.
4. Scroll down, add a commit message, and click **Commit changes**.

### Option 2: Use GitHub Codespaces
1. Go to the main page of your repository.
2. Click the **Code** button (green).
3. Select the **Codespaces** tab.
4. Click **New codespace** to launch the environment.
5. Edit your files directly and commit/push as needed.

---

## ⚙️ Technologies Used

This project is built with:

- ⚡ [Vite](https://vitejs.dev/)
- 🟦 [TypeScript](https://www.typescriptlang.org/)
- ⚛️ [React](https://react.dev/)
- 🧩 [shadcn/ui](https://ui.shadcn.com/)
- 🎨 [Tailwind CSS](https://tailwindcss.com/)

---

## 🚀 Deployment

You can deploy this project using your preferred hosting platform:

- 🌐 [Vercel](https://vercel.com/)
- 🔗 [Netlify](https://netlify.com/)
- Or any static site hosting service

Just follow the platform's instructions for deploying a Vite + React project.

# React/Vite Autofill Input with Debounce, Highlight & LRU Cache

This project implements an **Autofill Input** component using React and Vite with TypeScript or JavaScript. The component filters dummy data based on user input, highlights the matched substrings, debounces the input, and uses an LRU cache for improved performance.

---

## Features

- **Filter Dummy Data:** Matches user input with data items.
- **Debounce Input:** Waits 300ms after the last keystroke before filtering.
- **Highlight Matches:** Matched substring is shown in **bold**.
- **LRU Cache:** Caches up to 10 recent queries for faster response.
- **Simple & Fast:** Built with React + Vite.

---

## Dummy Data

```json
[
  { "id": 1, "name": "React Query" },
  { "id": 2, "name": "React Hooks" },
  { "id": 3, "name": "React Router" },
  { "id": 4, "name": "React State Management" },
  { "id": 5, "name": "React Performance Optimization" },
  { "id": 6, "name": "React Tutorial" },
  { "id": 7, "name": "React Best Practices" },
  { "id": 8, "name": "React vs Vue" },
  { "id": 9, "name": "React Interview Questions" },
  { "id": 10, "name": "React Roadmap" },
  { "id": 11, "name": "Next.js Server Components" },
  { "id": 12, "name": "Next.js API Routes" },
  { "id": 13, "name": "Next.js Middleware" },
  { "id": 14, "name": "Next.js Authentication" },
  { "id": 15, "name": "Next.js Performance Optimization" },
  { "id": 16, "name": "Next.js Tutorial" },
  { "id": 17, "name": "Next.js vs React" },
  { "id": 18, "name": "Next.js SEO Best Practices" },
  { "id": 19, "name": "Next.js Roadmap" },
  { "id": 20, "name": "Next.js Interview Questions" },
  { "id": 21, "name": "TypeScript Basics" },
  { "id": 22, "name": "TypeScript Interfaces" },
  { "id": 23, "name": "TypeScript Generics" },
  { "id": 24, "name": "TypeScript Utility Types" },
  { "id": 25, "name": "TypeScript vs JavaScript" },
  { "id": 26, "name": "TypeScript Tutorial" },
  { "id": 27, "name": "TypeScript Best Practices" },
  { "id": 28, "name": "TypeScript Roadmap" },
  { "id": 29, "name": "TypeScript Interview Questions" },
  { "id": 30, "name": "TypeScript Performance Optimization" },
  { "id": 31, "name": "Node.js Streams" },
  { "id": 32, "name": "Node.js Event Loop" },
  { "id": 33, "name": "Node.js File System" },
  { "id": 34, "name": "Node.js Authentication" },
  { "id": 35, "name": "Node.js WebSockets" },
  { "id": 36, "name": "Node.js Tutorial" },
  { "id": 37, "name": "Node.js Best Practices" },
  { "id": 38, "name": "Node.js vs Deno" },
  { "id": 39, "name": "Node.js Performance Optimization" },
  { "id": 40, "name": "Node.js Interview Questions" },
  { "id": 41, "name": "Redux Toolkit" },
  { "id": 42, "name": "Redux Middleware" },
  { "id": 43, "name": "Redux Thunk" },
  { "id": 44, "name": "Redux Saga" },
  { "id": 45, "name": "Redux vs Context API" },
  { "id": 46, "name": "Redux Tutorial" },
  { "id": 47, "name": "Redux Best Practices" },
  { "id": 48, "name": "Redux Performance Optimization" },
  { "id": 49, "name": "Redux Interview Questions" },
  { "id": 50, "name": "Redux Roadmap" },
  { "id": 51, "name": "Tailwind CSS Grid" },
  { "id": 52, "name": "Tailwind CSS Flexbox" },
  { "id": 53, "name": "Tailwind CSS Animations" },
  { "id": 54, "name": "Tailwind CSS Responsive Design" },
  { "id": 55, "name": "Tailwind CSS Dark Mode" },
  { "id": 56, "name": "Tailwind CSS Tutorial" },
  { "id": 57, "name": "Tailwind CSS Best Practices" },
  { "id": 58, "name": "Tailwind CSS vs Bootstrap" },
  { "id": 59, "name": "Tailwind CSS Performance Optimization" },
  { "id": 60, "name": "Tailwind CSS Interview Questions" }
]

'''



