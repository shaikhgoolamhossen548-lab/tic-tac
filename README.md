# React + Vite
# React + Vite
TIC TAC

A Tic-Tac-Toe game built with React and Lucide icons.

Features
Classic 3×3 Tic-Tac-Toe for two players
Win and draw detection
Restart the game at any time
Clean icon-based UI powered by lucide-react

Edit this list to match what your game actually does.

Tech Stack
Tool	Purpose
React 19	UI library
lucide-react	Icon set (X / O marks, reset button, etc.)
Getting Started
Prerequisites
Node.js 18 or newer
npm (comes with Node.js)
Installation
bash
# Clone the repository
git clone <your-repo-url>
cd tic-tac

# Install dependencies
npm install
Running the project

Start the dev server using whichever tool your project is set up with, for example:

bash
npm run dev

Your package.json doesn't define any scripts yet. If you're using Vite, Create React App, or similar, add the matching dev / start / build scripts and update this section.

How to Play
Players take turns clicking an empty square to place their mark (X or O).
The first player to get three marks in a row, column, or diagonal wins.
If all nine squares are filled with no winner, the game is a draw.
Press the reset button to start a new game.
Project Structure
tic-tac/
├── package.json
├── package-lock.json
└── src/            # App source code

Update this to reflect your real folder layout.

Scripts
Command	Description
npm install	Install dependencies
npm run dev	Start the development server (once configured)
npm run build	Create a production build (once configured)


