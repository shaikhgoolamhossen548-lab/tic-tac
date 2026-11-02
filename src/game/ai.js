const LINES = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], //rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], //columns
    [0, 4, 8], [2, 4, 6] //diagonals
];

//return {the winner: 'x' | 'o', line: [a,b,c]} or null
export function getWinner(board) {
    for(const [a, b, c] of LINES) {
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            return { winner: board[a], line: [a, b, c] };
        }
    }
    return null;
}

const emptyCells = (board) =>
    board.map((v, i) => (v === null ? i : null)).filter((i) => i !==null);

// AI is 'O' (maximizing), human is 'X' (minimizing).
function minimax(board, depth, isAiTurn) {
    const result = getWinner(board);
    if (result) return result.winner === 'O' ? 10 - depth : depth - 10;

    const empties = emptyCells(board);
    if (empties.length === 0) return 0; //draw

    let best = isAiTurn ? -Infinity : Infinity;
    for (const i of empties) {
        board[i] = isAiTurn ? 'O' : 'X';
        const score = minimax(board, depth + 1, !isAiTurn);
        board[i] = null;
        best = isAiTurn ? Math.max(best, score) : Math.min(best, score);
    }
    return best;
}

function getBestMove(board) {
    let bestScore = -Infinity;
    let bestMove;

    for (const i of emptyCells(board)) {
        board[i] = 'O';
        const score = minimax(board, 0, false);
        board[i] = null;

        if (score > bestScore) {
            bestScore = score;
            bestMove = i;
        }
    }

    return bestMove;
}

export function getAiMove(board, level) {
    const empties = emptyCells(board);
    const random = empties[Math.floor(Math.random() * empties.length)];

    if (level === 'easy') return random;
    if (level === 'medium') return Math.random() < 0.5 ? random : getBestMove(board);
    if (level === 'hard') return Math.random() < 0.2 ? random : getBestMove(board);
    return getBestMove(board);

}
