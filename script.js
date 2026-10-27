'use strict';

/*===============================グローバル定数==========================*/

const EMPTY = 0;
const BLACK = 1;
const WHITE = 2;

let board;
let currentPlayer = BLACK;
let gameStatus = "playing";


/*==================================部品================================*/

/**
 * 盤面を初期化する
 * @returns 初期化された盤面を返す。
 */
function createInitialBoard() {
    const initialBoard = Array.from(
        { length: 8 },
        () => Array(8).fill(0)
    );

    initialBoard[3][3] = WHITE;
    initialBoard[3][4] = BLACK;
    initialBoard[4][4] = WHITE;
    initialBoard[4][3] = BLACK;

    return initialBoard;
}

/**
 * 石を表示する
 */
function renderBoard() {
    const rows = document.querySelectorAll("#board tr");

    for (let row = 0; row < 8; row++) {
        for (let col = 0; col < 8; col++) {
            const disc = rows[row].cells[col]
                .querySelector(".disc");

            if (board[row][col] === BLACK) {
                disc.style.backgroundColor = "black";
            } else if (board[row][col] === WHITE) {
                disc.style.backgroundColor = "white";
            } else {
                disc.style.backgroundColor = "transparent";
            }
        }
    }
}

/**
 * 石を置く
 * @param {number} row 
 * @param {number} col 
 */
function placeStone(row, col) {
    board[row][col] = currentPlayer;
}

/**
 * プレイヤーを交代する
 */
function swapPlayer() {
    if (currentPlayer === BLACK) {
        currentPlayer = WHITE;
    } else {
        currentPlayer = BLACK;
    }
}

function bottomStone(row, col) {
    let reverseStoneBoard = Array.from(
        { length: 8 },
        () => Array(8).fill(0)
    );

    for (let i = row + 1; i <= 7; i++) {
        if (board[i][col] === opponent() && i !== 7) {
            reverseStoneBoard[i][col] = 1;
        } else if (board[i][col] === currentPlayer) {
            break;
        } else {
            reverseStoneBoard = Array.from(
                { length: 8 },
                () => Array(8).fill(0)
            );
            break;
        }
    }
    return reverseStoneBoard;
}


function topStone(row, col) {
    let reverseStoneBoard = Array.from(
        { length: 8 },
        () => Array(8).fill(0)
    );

    for (let i = row - 1; i >= 0; i--) {
        if (board[i][col] === opponent() && i !== 0) {
            reverseStoneBoard[i][col] = 1;
        } else if (board[i][col] === currentPlayer) {
            break;
        } else {
            reverseStoneBoard = Array.from(
                { length: 8 },
                () => Array(8).fill(0)
            );
            break;
        }
    }
    return reverseStoneBoard;
}


function rightStone(row, col) {
    let reverseStoneBoard = Array.from(
        { length: 8 },
        () => Array(8).fill(0)
    );
    for (let i = col + 1; i <= 7; i++) {
        if (board[row][i] === opponent() && i !== 7) {
            reverseStoneBoard[row][i] = 1;
        } else if (board[row][i] === currentPlayer) {
            break;
        } else {
            reverseStoneBoard = Array.from(
                { length: 8 },
                () => Array(8).fill(0)
            );
            break;
        }
    }
    return reverseStoneBoard;
}

function leftStone(row, col) {
    let reverseStoneBoard = Array.from(
        { length: 8 },
        () => Array(8).fill(0)
    );

    for (let i = col - 1; i >= 0; i--) {
        if (board[row][i] === opponent() && i !== 0) {
            reverseStoneBoard[row][i] = 1;
        } else if (board[row][i] === currentPlayer) {
            break;
        } else {
            reverseStoneBoard = Array.from(
                { length: 8 },
                () => Array(8).fill(0)
            );
            break;
        }
    }
    return reverseStoneBoard;
}



function upperLeft(row, col) {
    let reverseStoneBoard = Array.from(
        { length: 8 },
        () => Array(8).fill(0)
    );

    let count = 0;
    for (let i = row - 1; i >= 0; i--) {
        count++;

        if ((col - count) < 0) {
            break;
        } else if (board[i][col - count] === opponent() && (i !== 0 && (col - count) !== 0)) {
            reverseStoneBoard[i][col - count] = 1;
        } else if (board[i][col - count] === currentPlayer) {
            break;
        } else {
            reverseStoneBoard = Array.from(
                { length: 8 },
                () => Array(8).fill(0)
            );
            break;
        }

    }
    return reverseStoneBoard;
}

function upperRight(row, col) {
    let reverseStoneBoard = Array.from(
        { length: 8 },
        () => Array(8).fill(0)
    );

    let count = 0;
    for (let i = row - 1; i >= 0; i--) {
        count++;

        if ((col + count) > 7) {
            break;
        } else if (board[i][col + count] === opponent() && (i !== 0 && (col + count) !== 7)) {
            reverseStoneBoard[i][col + count] = 1;
        } else if (board[i][col + count] === currentPlayer) {
            break;
        } else {
            reverseStoneBoard = Array.from(
                { length: 8 },
                () => Array(8).fill(0)
            );
            break;
        }

    }
    return reverseStoneBoard;
}

function lowerLeft(row, col) {
    let reverseStoneBoard = Array.from(
        { length: 8 },
        () => Array(8).fill(0)
    );

    let count = 0;
    for (let i = row + 1; i <= 7; i++) {
        count++;

        if ((col - count) < 0) {
            break;
        } else if (board[i][col - count] === opponent() && (i !== 7 && (col - count) !== 0)) {
            reverseStoneBoard[i][col - count] = 1;
        } else if (board[i][col - count] === currentPlayer) {
            break;
        } else {
            reverseStoneBoard = Array.from(
                { length: 8 },
                () => Array(8).fill(0)
            );
            break;
        }

    }
    return reverseStoneBoard;
}

function lowerRight(row, col) {
    let reverseStoneBoard = Array.from(
        { length: 8 },
        () => Array(8).fill(0)
    );

    let count = 0;
    for (let i = row + 1; i <= 7; i++) {
        count++;

        if ((col + count) > 7) {
            break;
        } else if (board[i][col + count] === opponent() && (i !== 7 && (col + count) !== 7)) {
            reverseStoneBoard[i][col + count] = 1;
        } else if (board[i][col + count] === currentPlayer) {
            break;
        } else {
            reverseStoneBoard = Array.from(
                { length: 8 },
                () => Array(8).fill(0)
            );
            break;
        }

    }
    return reverseStoneBoard;
}


function canPlace(row, col) {
    const reverseStoneBoard = Array.from(
        { length: 8 },
        () => Array(8).fill(0)
    );

    const rBorad = rightStone(row, col);
    const lBorad = leftStone(row, col);
    const tBorad = topStone(row, col);
    const bBorad = bottomStone(row, col);
    const ulBorad = upperLeft(row, col);
    const urBorad = upperRight(row, col);
    const lLBorad = lowerLeft(row, col);
    const lrBorad = lowerRight(row, col);

    for (let i = 0; i < reverseStoneBoard.length; i++) {
        for (let j = 0; j < reverseStoneBoard[0].length; j++) {
            if (rBorad[i][j] === 1 || lBorad[i][j] === 1 || tBorad[i][j] === 1 ||
                bBorad[i][j] === 1 || ulBorad[i][j] === 1 || urBorad[i][j] === 1 ||
                lLBorad[i][j] === 1 || lrBorad[i][j] === 1) {
                reverseStoneBoard[i][j] = 1;
            }
        }
    }

    return reverseStoneBoard;
}


/**
 * 石をひっくり返す
 * @param turnOverBoard
 * @return count ひっくり返した石の数
 */
function turnOverStone(turnOverBoard) {
    let count = 0;
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            if (turnOverBoard[i][j] === 1) {
                board[i][j] = currentPlayer;
                count++;
            }
        }
    }
    return count;
}

/**
 * 石がひっくり返せるか判定する
 * @param turnOverBoard
 * @return isTurnOver ひっくり返せるか
 */
function isTurnOverStone(turnOverBoard) {
    let isTurnOver = false;
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[0].length; j++) {
            if (turnOverBoard[i][j] === 1) {
                isTurnOver = true;
                break;
            }
        }
    }
    return isTurnOver;
}

function canPlaceStone() {
    let isCanPlace = false;
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[0].length; j++) {
            if (board[i][j] === EMPTY) {
                if (isTurnOverStone(canPlace(i, j))) {
                    isCanPlace = true;
                    break;
                }
            }
        }
        if (isCanPlace) {
            break;
        }
    }
    return isCanPlace;
}

function StoneCounter(player) {
    let count = 0;
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[0].length; j++) {
            if (board[i][j] === player) {
                count++;
            }
        }
    }
    return count;
}


function isGameEnd(black, white) {
    let isEnd = false;
    swapPlayer();
    const isCanPlaceOpp = canPlaceStone();
    swapPlayer();

    if ((black + white) === 64) {
        isEnd = true;
    } else if (black === 0 || white === 0) {
        isEnd = true;
    } else if (!canPlaceStone() && !isCanPlaceOpp) {
        isEnd = true;
    }

    return isEnd;
}

function checkWinCondition(black, white) {
    if (black > white) {
        alert("player1の勝利！");
    } else if (white > black) {
        alert("player2の勝利！");
    } else {
        alert("引き分け！");
    }
}

function viewStoneCount(blackStone, whiteStone) {
    document.getElementById("blackStone").textContent = `${blackStone}枚`;
    document.getElementById("whiteStone").textContent = `${whiteStone}枚`;
}


function turnChange() {
    document.getElementById("turnLabel").textContent = `Player${currentPlayer}のターン`;
}


/**
 * 相手の判定につかう
 * @returns 相手
 */
function opponent() {
    let result;
    if (currentPlayer === BLACK) {
        result = WHITE;
    } else {
        result = BLACK;
    }
    return result;
}


function canPlaceAlert() {
    if (!canPlaceStone()) {
        alert("置ける場所がありません。");
        swapPlayer();
    }
}

// function canAnyPlace() {
//     for (let i = 0; i < board.length; i++) {
//         for (let j = 0; j < board[0].length; j++) {
//              if (isTurnOverStone(canPlace())) {
//                 document.getElementById(`${i}${j}`).style.visibility = "visible";
//              } else {
//                 document.getElementById(`${i}${j}`).style.visibility = "hidden";
//              }
//         }
//     }
// }


/*==================================実行================================*/

// ゲーム開始
function startGame() {
    board = createInitialBoard();
    currentPlayer = BLACK;
    viewStoneCount(StoneCounter(BLACK), StoneCounter(WHITE));
    turnChange();
    renderBoard();
}

// 石を置いた時
function putStone(row, col) {
    if (board === undefined) {
        return null;
    } else {
        if (board[row][col] !== BLACK && board[row][col] !== WHITE) {
            const plant = turnOverStone(canPlace(row, col));
            if (plant !== 0) {
                placeStone(row, col);
                const black = StoneCounter(BLACK);
                const white = StoneCounter(WHITE);
                viewStoneCount(black, white);
                renderBoard();
                swapPlayer();
                turnChange();
                if (isGameEnd(black, white)) {
                    setTimeout(checkWinCondition, 1000, black, white);
                } else {
                    setTimeout(canPlaceAlert, 1000);
                    turnChange();
                }
            } else {
                alert("そこは置けません。");
            }
        }
    }
}

/*=====================================================================*/
