# DSA Mentor AI

**Live Demo:** [https://dsa-mentor-ai-roan.vercel.app/](https://dsa-mentor-ai-roan.vercel.app/)

## What I Built & Why I Picked This Topic
For this assignment, I built a highly-focused, conversational AI assistant explicitly designed to help developers prepare for Data Structures and Algorithms (DSA) interviews.

I chose this specific niche because preparing for technical interviews is a universally shared pain point among software engineers. Generic AI chatbots often give bloated, over-complicated code answers. I wanted to build a purpose-built tool that behaves like an actual senior engineer — providing hints, breaking down time/space complexity simply, and encouraging the user, rather than just dumping code.

## Frontend Thinking & UX Decisions

A major goal for this project was moving beyond a basic chat "wrapper" and building an interface that feels like a premium, consumer-ready startup product.

### 1. Presentation & The First Impression
Instead of dropping the user into a blank, intimidating chat window, the first thing they see is a polished Hero section with a modern glowing orb effect and **Suggested Prompts** (e.g., "Explain Binary Search" or "Dynamic Programming Roadmap"). This beautifully guides the user, eliminates "blank canvas" anxiety, and immediately communicates the bot's capabilities.

### 2. State Management (Loading, Errors, Empty)
* **Loading:** Rather than a generic loading spinner, I built a custom, staggered bouncing-dot "Typing Indicator" that mimics a human typing. It makes the LLM wait time feel significantly more natural.
* **Error States:** If the API rate limits or drops, the UI gracefully catches it and renders an inline error message block directly within the chat flow. It explicitly tells the user what happened without breaking the layout or relying on ugly browser `alert()` popups.
* **Empty State:** Clean, distraction-free, and heavily utilizes subtle Tailwind animations (fade-in-up) to feel responsive.

### 3. User-Centric Micro-Interactions (The "Small Details")
To show deep care for the user experience, I packed the UI with strictly purposeful features:
* **Syntax Highlighting & Code Copying:** Because this is a coding tool, users need to copy code. I integrated robust syntax highlighting and built a custom `react-markdown` component that elegantly injects a "Copy code" button *exclusively* onto code blocks, rather than copying the entire conversational message.
* **Smart Auto-scroll & Sticky Down Arrow:** If a user scrolls up to read a long historical explanation, a floating, animated arrow button smoothly fades in, allowing them to instantly snap back to the newest message.
* **Chat Persistence:** Chat state is wired to `localStorage`. If a user accidentally refreshes the tab during an intense study session, they won't lose their entire history. The logo acts as a quick "Clear Chat / Home" reset button.
* **Keyboard Navigation:** The textarea auto-grows, submits on `Enter`, and adds new lines on `Shift+Enter`.

## Tech Stack
* **Frontend:** React (Vite), Tailwind CSS, Lucide React (Icons), React Markdown, React Syntax Highlighter.
* **Backend:** Node.js, Express, Groq SDK (Llama 3.3).
* **Deployment:** Vercel (Frontend), Railway (Backend).

## Running Locally

1. Clone the repository.
2. Start the Backend:
   ```bash
   cd backend
   npm install
   # Add your Groq API key to a .env file (GROQ_API_KEY=gsk_...)
   npm run dev
   ```
3. Start the Frontend:
   ```bash
   cd frontend
   npm install
   npm run dev
   ```
