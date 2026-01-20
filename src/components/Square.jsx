import React from 'react';
import { useMemo } from 'react';

export default function Square({
    position, // 'a1', 'h8' etc
    piece,
    isLight,
    isSelected,
    isLastMove,
    inCheck,
    isValidMove,
    isBestMove,
    onSquareClick,
    color // 'w' or 'b' needed? NO, isLight determines it.
}) {

    const className = [
        'square',
        isLight ? 'light' : 'dark',
        isSelected ? 'selected' : '',
        isLastMove ? 'last-move' : '',
        inCheck ? 'check' : '',
        isValidMove ? 'valid-move' : '',
        isBestMove ? 'best-move' : ''
    ].filter(Boolean).join(' ');

    return (
        <div
            className={className}
            onClick={() => onSquareClick(position)}
            data-position={position}
        >
            <div className="square-content">
                {piece}
                {isValidMove && !piece && <div className="valid-move-marker" />}
                {isValidMove && piece && <div className="valid-capture-marker" />}
            </div>
        </div>
    );
}
