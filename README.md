# Clive App

Clive is a React-based web application designed to provide users with an interactive experience for analyzing and discussing YouTube videos. Users can paste a YouTube URL, toggle a "No Spoilers" mode, and engage in a conversation-like interface to explore video content in detail.

## Features

- **YouTube Video Analysis**: Paste a YouTube URL to analyze its content.
- **No Spoilers Mode**: Toggle a mode to avoid spoilers while exploring video details.
- **Interactive Conversation**: Engage in a chat-like interface to ask questions about the video.
- **Responsive Design**: Optimized for both desktop and mobile devices.

## Tech Stack

- **Frontend**: React, React Router, TailwindCSS
- **Build Tool**: Vite
- **Linting**: ESLint with React Hooks and React Refresh plugins

## Prerequisites

Before running the app locally, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (version 16 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

## Getting Started

Follow these steps to run the app locally:

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/clive-app-v0.git
cd clive-app-v0
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Start the Development Server

```bash
npm run dev
```
### 4. Configure the environment variable to the right port where your node server is running 

```bash
npm run dev
```

## Project Structure

clive-app-v0/
├── src/
│   ├── components/       # React components
│   ├── utils/            # Utility functions
│   ├── App.jsx           # Main App component
│   ├── main.jsx          # Entry point
│   ├── index.css         # Global styles
│   ├── App.css           # Component-specific styles
├── public/               # Static assets
├── .gitignore            # Git ignore file
├── package.json          # Project metadata and dependencies
├── vite.config.js        # Vite configuration
├── eslint.config.js      # ESLint configuration
└── README.md             # Project documentation