# Bookster

Bookster is a web application built with **Next.js** and **Tailwind CSS**. This application allows you to manage and organize your bookmarks in a user-friendly interface.

## Features

- Add, edit, and remove bookmarks.
- Organize bookmarks by folders.
- Built with a responsive design using Tailwind CSS.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- [Node.js](https://nodejs.org/en/) version 14 or later
- [npm](https://www.npmjs.com/) (Node Package Manager)

## Getting Started

Follow these steps to run the project locally.

### 1. Clone the repository
```bash
git clone https://github.com/xaalofficial/bookster.git 
```
### 2. Navigate into the project directory
```bash
cd bookster
```

### 3. Install dependencies
```bash
npm install
```

### 4. Run the application
```bash
npm run dev
```
## Folder Structure
Here’s a brief overview of the key folders and files in the project:

app/: Contains the Next.js pages and layout components.
components/: Contains reusable React components such as BookmarkForm, BookmarkItem, and BookmarkList.
public/: Contains static files like images and icons.
next.config.mjs: The Next.js configuration file.
tailwind.config.ts: Tailwind CSS configuration file.
tsconfig.json: TypeScript configuration file.
package.json: Contains project dependencies and scripts.

## Troubleshooting
If you encounter issues running the project, ensure the following:
Ensure you have the latest version of Node.js installed.
If you encounter issues with dependencies, try deleting the node_modules folder and the package-lock.json file and reinstalling the dependencies:
```bash
rm -rf node_modules
rm package-lock.json
npm install
```
