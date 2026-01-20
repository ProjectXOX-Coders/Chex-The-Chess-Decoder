import React, { useState, useEffect } from 'react';
import Square from './Square';
import Piece from './Piece';
import EvaluationBar from './EvaluationBar';
import { useChessGame } from '../hooks/useChessGame';
import { useStockfish } from '../hooks/useStockfish';

export default function Board({ gameMode, onBack }) {
    const { game, fen, turn, isCheck, isCheckmate, move, reset } = useChessGame();
    const { isReady, bestMove, evaluation, evaluatePosition, stop } = useStockfish();
    const [selectedSquare, setSelectedSquare] = useState(null);
    const [possibleMoves, setPossibleMoves] = useState([]);
    const [lastMove, setLastMove] = useState(null);

    // Parse board from game instance
    const board = game.board(); // 8x8 array of { type, color } or null

    const getRecentMove = () => {
        // chess.js history({ verbose: true }) gives moves
        const history = game.history({ verbose: true });
        if (history.length > 0) {
            const last = history[history.length - 1];
            return { from: last.from, to: last.to };
        }
        return null;
    };

    useEffect(() => {
        setLastMove(getRecentMove());
        setPossibleMoves([]);
        setSelectedSquare(null);

        // AI / Coach Logic
        if (game.isGameOver()) return;

        // PVE: If it's AI's turn (Black)
        if (gameMode === 'PVE' && turn === 'b') {
            evaluatePosition(fen, 10); // Find best move
            // We need to wait for 'bestmove' message. 
            // Since evaluatePosition sets state 'bestMove' eventually, we watch that in another effect.
        }

        // Coach: Always analyze
        if (gameMode === 'COACH') {
            evaluatePosition(fen, 15);
        }

    }, [fen, gameMode, turn, evaluatePosition, game]);

    // Effect to handle AI Move execution
    useEffect(() => {
        if (gameMode === 'PVE' && turn === 'b' && bestMove) {
            const from = bestMove.substring(0, 2);
            const to = bestMove.substring(2, 4);
            // Add a small delay for realism
            const timer = setTimeout(() => {
                move(from, to, 'q'); // Auto promote to queen
                // Clear best move so we don't loop? useStockfish should handle unique events or we reset it?
                // Actually bestMove state acts as "latest suggestion".
                // We should only move if it matches the current board state's need?
                // Simplified: useChessGame will handle illegal moves (if we try to move twice).
            }, 500);
            return () => clearTimeout(timer);
        }
    }, [bestMove, gameMode, turn, move]);

    const handleSquareClick = (square) => {
        // If selecting the same square, deselect
        if (selectedSquare === square) {
            setSelectedSquare(null);
            setPossibleMoves([]);
            return;
        }

        // Attempt to move if a square is already selected
        if (selectedSquare) {
            const moveResult = move(selectedSquare, square);
            if (moveResult) {
                // Move successful, state updates in effect
                return;
            }
        }

        // Select new piece
        const piece = game.get(square);
        if (piece && piece.color === turn) {
            // Disable selecting opponent pieces in PVE
            if (gameMode === 'PVE' && turn === 'b') return;

            setSelectedSquare(square);
            // Get legal moves for this square
            const moves = game.moves({ square, verbose: true });
            setPossibleMoves(moves.map(m => m.to));
        } else {
            setSelectedSquare(null);
            setPossibleMoves([]);
        }
    };

    const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
    const ranks = ['8', '7', '6', '5', '4', '3', '2', '1'];

    // Calculate captures
    const history = game.history({ verbose: true });
    const whiteCaptures = history.filter(m => m.color === 'w' && m.captured).map(m => m.captured);
    const blackCaptures = history.filter(m => m.color === 'b' && m.captured).map(m => m.captured);

    return (
        <div className="board-container">
            {gameMode === 'COACH' && <EvaluationBar evaluation={evaluation} />}

            <div className="status-bar">
                <span>Turn: {turn === 'w' ? 'White' : 'Black'}</span>
                {isCheck && <span className="check-alert">CHECK!</span>}
                {isCheckmate && <span className="mate-alert">CHECKMATE!</span>}

                <div className="captures">
                    <div className="capture-row">
                        <span>Black Pieces Lost:</span>
                        {whiteCaptures.map((p, i) => <div key={i} style={{ width: 30, height: 30 }}><Piece piece={{ type: p, color: 'b' }} /></div>)}
                    </div>
                    <div className="capture-row">
                        <span>White Pieces Lost:</span>
                        {blackCaptures.map((p, i) => <div key={i} style={{ width: 30, height: 30 }}><Piece piece={{ type: p, color: 'w' }} /></div>)}
                    </div>
                </div>

                <button onClick={reset} className="reset-btn">Reset Game</button>
                <button onClick={onBack} className="reset-btn" style={{ marginTop: '10px', background: '#444' }}>Back to Menu</button>
            </div>

            <div className="chess-board">
                {ranks.map((rank, rIndex) => (
                    <div key={rank} className="board-row">
                        {files.map((file, fIndex) => {
                            const position = `${file}${rank}`;
                            const piece = board[rIndex][fIndex];
                            const isLight = (rIndex + fIndex) % 2 === 0;
                            const isSelected = selectedSquare === position;
                            const isLast = lastMove && (lastMove.from === position || lastMove.to === position);
                            const isValid = possibleMoves.includes(position);

                            // Find if king is in check (visual rendering)
                            const isKingInCheck = isCheck && piece && piece.type === 'k' && piece.color === turn;

                            const isBestMoveSource = gameMode === 'COACH' && bestMove && bestMove.startsWith(position);
                            const isBestMoveDest = gameMode === 'COACH' && bestMove && bestMove.endsWith(position);

                            return (
                                <Square
                                    key={position}
                                    position={position}
                                    piece={piece ? <Piece piece={piece} /> : null}
                                    isLight={isLight}
                                    isSelected={isSelected}
                                    isLastMove={isLast}
                                    inCheck={isKingInCheck}
                                    isValidMove={isValid}
                                    isBestMove={isBestMoveSource || isBestMoveDest}
                                    onSquareClick={handleSquareClick}
                                />
                            );
                        })}
                    </div>
                ))}
            </div>
        </div>
    );
}
