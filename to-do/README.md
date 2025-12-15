# React To-Do List App

A feature-rich To-Do application built with React (hooks) during self-study.

**Live Demo**: https://morvayne1.github.io/react-to-do-app/

## Features
- Add / remove tasks
- Mark tasks as completed (with strikethrough styling)
- Reorder tasks (Up / Down buttons with disabled state on edges)
- Empty state message ("No tasks yet..")
- Unique IDs using `crypto.randomUUID()`
- Clean, maintainable code with immutable updates
- Dark theme & modern UI
- Responsive design


## Technologies
- React 18 (hooks)
- JavaScript (ES6+)
- CSS3 (custom styling)
- Playwright

## E2E Testing
Covered with 5 Playwright end-to-end tests:
- Adding and removing tasks
- Moving tasks up/down
- Toggling completion with checkbox

## Setup & Run & TEST Locally
```bash
npx playwright test
git clone https://github.com/morvayne1/react-to-do-app.git
cd react-to-do-app
npm install
npm start