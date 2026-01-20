import { useState, useCallback } from 'react';
import { Chess } from 'chess.js';

export function useChessGame() {
    const [game, setGame] = useState(new Chess());
    const [fen, setFen] = useState(game.fen());
    const [isCheck, setIsCheck] = useState(false);
    const [isCheckmate, setIsCheckmate] = useState(false);
    const [turn, setTurn] = useState('w');

    const updateGameState = useCallback((newGame) => {
        setGame(newGame);
        setFen(newGame.fen());
        setIsCheck(newGame.inCheck());
        setIsCheckmate(newGame.isCheckmate());
        setTurn(newGame.turn());
    }, []);

    const move = useCallback((from, to, promotion = 'q') => {
        try {
            const newGame = new Chess(game.fen());
            const result = newGame.move({ from, to, promotion });

            if (result) {
                updateGameState(newGame);
                return true;
            }
            return false;
        } catch (e) {
            return false;
        }
    }, [game, updateGameState]);

    const reset = useCallback(() => {
        const newGame = new Chess();
        updateGameState(newGame);
    }, [updateGameState]);

    return {
        fen,
        turn,
        isCheck,
        isCheckmate,
        move,
        reset,
        game // Exposing raw instance for moves generation if needed
    };
}
