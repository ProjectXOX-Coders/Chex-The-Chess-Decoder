import React from 'react';

export default function EvaluationBar({ evaluation, orientation = 'w' }) {
    // evaluation: { type: 'cp' | 'mate', value: number }
    // value is from White's perspective usually in engines.
    // cp 100 = 1 pawn advantage.

    if (!evaluation) return null;

    let percent = 50;
    let text = '0.0';

    if (evaluation.type === 'mate') {
        // Mate in X
        text = `M${Math.abs(evaluation.value)}`;
        percent = evaluation.value > 0 ? 100 : 0;
    } else {
        // cp
        // Clamp between -500 and 500 roughly for the bar visualization
        const clamped = Math.max(-1000, Math.min(1000, evaluation.value));
        percent = 50 + (clamped / 20); // 500cp = 25% shift -> 75%
        text = (evaluation.value / 100).toFixed(1);
        if (evaluation.value > 0) text = `+${text}`;
    }

    // If playing as Black, we might want to flip the bar visually, but standard is White is bottom/top?
    // Usually White is bottom. If White has advantage, bar fills white (upwards or rightwards).

    return (
        <div className="eval-bar-container">
            <div
                className="eval-bar-fill"
                style={{ height: `${percent}%` }}
            ></div>
            <span className={`eval-text ${percent > 50 ? 'white-adv' : 'black-adv'}`}>
                {text}
            </span>
        </div>
    );
}
