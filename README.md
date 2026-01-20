# 🧠 Mind Mate: The Chess Brain

**Mind Mate** is a premium, AI-powered Chess application designed not just to play, but to *teach*. Built with modern web technologies, it integrates the powerful Stockfish engine to provide real-time coaching, evaluation, and competitive play in a visually stunning interface.

![Mind Mate Preview](./public/preview.png)
*(Note: Add a screenshot here named `preview.png` in the public folder)*

## ✨ Features

### 🎮 Game Modes
- **🤖 Play vs AI**: Challenge the integrated Stockfish engine (running locally via WebAssembly).
- **🎓 Coach Mode**: Learn as you play!
    - **Real-time Evaluation Bar**: Visualizes the win probability dynamically.
    - **Best Move Suggestions**: Green highlights show the engine's recommended path.
    - **Mistake Analysis**: Immediate visual feedback on positioning.
- **👥 Play vs Friend**: Classic offline 2-player local multiplayer.

### 💎 Premium Experience
- **Logic**: Complete Chess rules implementation (Castling, En Passant, Promotion) via `chess.js`.
- **UI/UX**: Smooth Drag & Drop, Legal move highlights, and "Wood & Dark" premium aesthetic.
- **Performance**: Engine calculates in a background Web Worker, ensuring zero UI lag.

## 🛠️ Tech Stack

- **Frontend**: [React](https://reactjs.org/) + [Vite](https://vitejs.dev/)
- **Engine**: [Stockfish.js](https://github.com/nmrugg/stockfish.js) (WASM)
- **Logic**: [Chess.js](https://github.com/jhlywa/chess.js)
- **Styling**: Vanilla CSS (CSS Modules approach)

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/mind-mate.git
   cd mind-mate
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Play!**
   Open your browser and navigate to `http://localhost:5173`.

## 📂 Project Structure

```
src/
├── components/
│   ├── Board.jsx         # Main chess grid and logic wrapper
│   ├── Piece.jsx         # SVG Piece rendering
│   ├── Square.jsx        # Individual cell interactions
│   ├── Menu.jsx          # Game mode selection screen
│   └── EvaluationBar.jsx # Visual advantage indicator
├── hooks/
│   ├── useChessGame.js   # Wrapper for chess.js logic
│   └── useStockfish.js   # Wrapper for Web Worker engine communication
├── App.jsx               # Layout and State Manager
└── main.jsx             # Entry point
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.
