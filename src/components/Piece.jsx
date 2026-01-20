import React from 'react';

const PIECE_IMAGES = {
    w: {
        k: 'https://upload.wikimedia.org/wikipedia/commons/4/42/Chess_klt45.svg',
        q: 'https://upload.wikimedia.org/wikipedia/commons/1/15/Chess_qlt45.svg',
        r: 'https://upload.wikimedia.org/wikipedia/commons/7/72/Chess_rlt45.svg',
        b: 'https://upload.wikimedia.org/wikipedia/commons/b/b1/Chess_blt45.svg',
        n: 'https://upload.wikimedia.org/wikipedia/commons/7/70/Chess_nlt45.svg',
        p: 'https://upload.wikimedia.org/wikipedia/commons/4/45/Chess_plt45.svg'
    },
    b: {
        k: 'https://upload.wikimedia.org/wikipedia/commons/f/f0/Chess_kdt45.svg',
        q: 'https://upload.wikimedia.org/wikipedia/commons/4/47/Chess_qdt45.svg',
        r: 'https://upload.wikimedia.org/wikipedia/commons/f/ff/Chess_rdt45.svg',
        b: 'https://upload.wikimedia.org/wikipedia/commons/9/98/Chess_bdt45.svg',
        n: 'https://upload.wikimedia.org/wikipedia/commons/e/ef/Chess_ndt45.svg',
        p: 'https://upload.wikimedia.org/wikipedia/commons/c/c7/Chess_pdt45.svg'
    }
};

export default function Piece({ piece }) {
    if (!piece) return null;

    const imageUrl = PIECE_IMAGES[piece.color][piece.type];

    return (
        <div className="piece-container">
            <img
                src={imageUrl}
                alt={`${piece.color}${piece.type}`}
                className="chess-piece"
                draggable={false} // Prevent default drag to use custom logic if needed, or allow it.
            />
        </div>
    );
}
