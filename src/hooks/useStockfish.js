import { useEffect, useRef, useState, useCallback } from 'react';

export function useStockfish() {
    const worker = useRef(null);
    const [bestMove, setBestMove] = useState(null);
    const [evaluation, setEvaluation] = useState(null); // { type: 'cp' | 'mate', value: number }
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        // Initialize Web Worker
        try {
            worker.current = new Worker('/stockfish.js');

            worker.current.onmessage = (event) => {
                const message = event.data;

                // Check ready
                if (message === 'uciok') {
                    setIsReady(true);
                }

                // Parse best move
                if (message.startsWith('bestmove')) {
                    const move = message.split(' ')[1];
                    setBestMove(move);
                }

                // Parse evaluation
                // Example: info depth 10 seldepth 14 multipv 1 score cp 24 nodes 12345 nps 123444 ...
                if (message.startsWith('info') && message.includes('score')) {
                    const parts = message.split(' ');
                    const scoreIndex = parts.indexOf('score');
                    if (scoreIndex !== -1) {
                        const type = parts[scoreIndex + 1]; // cp or mate
                        const value = parseInt(parts[scoreIndex + 2], 10);
                        setEvaluation({ type, value });
                    }
                }
            };

            worker.current.postMessage('uci');
            worker.current.postMessage('isready');
        } catch (error) {
            console.error("Stockfish init error:", error);
        }

        return () => {
            if (worker.current) {
                worker.current.terminate();
            }
        };
    }, []);

    const evaluatePosition = useCallback((fen, depth = 15) => {
        if (worker.current) {
            worker.current.postMessage(`position fen ${fen}`);
            worker.current.postMessage(`go depth ${depth}`);
        }
    }, []);

    const stop = useCallback(() => {
        if (worker.current) {
            worker.current.postMessage('stop');
        }
    }, []);

    return { isReady, bestMove, evaluation, evaluatePosition, stop };
}
