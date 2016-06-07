documentWidth = window.screen.availWidth;
gridContainerWidth = 0.92 * documentWidth;
cellSideLength = 0.18 * documentWidth;
cellSpace = 0.04 * documentWidth;

function getCellColor(num) {
    switch(num) {
        case 2: return "#eee4da"; break;
        case 4: return "#ede0c8"; break;
        case 8: return "#f2b179"; break;
        case 16: return "#f59563"; break;
        case 32: return "#f67e5f"; break;
        case 64: return "#f65e36";  break;
        case 128: return "#edcf72"; break;
        case 256: return "#ed0c61"; break;
        case 512: return "#9c0"; break;
        case 1024: return "#33b5e5"; break;
        case 2048: return "#09c"; break;
        case 4096: return "#a6c"; break;
        case 8192: return "#93c"; break;
    }
}


function canMoveLeft() {
    for (var i = 0; i < 4; i++) {
        for (var j = 1; j < 4; j++) {
            if (board[i][j] != 0) {
                if (board[i][j-1] == 0 || board[i][j] == board[i][j-1]) {
                    return true;
                }
            }
        }
    }
    
    return false;
}

function canMoveRight() {
    for (var i = 0; i < 4; i++) {
        for (var j = 2; j >= 0; j--) {
            if (board[i][j] != 0) {
                if (board[i][j+1] == 0 || board[i][j] == board[i][j+1]) {
                    return true;
                }
            }
        }
    }
    
    return false;
}

function noBlockHorizontal(row, from, to) {
    for (var i = from; i < to; i++) {
        if (board[row][i] != 0) 
            return false;
    }
    return true;
}

function canMoveUp() {
    for (var col = 0; col < 4; col++) {
        for (var row = 1; row < 4; row++) {
            if (board[row][col] != 0) {
                if (board[row-1][col] == 0 || board[row][col] == board[row-1][col]) {
                    return true;
                }
            }
        }
    }
    
    return false;
}

function canMoveDown() {
    for (var col = 0; col < 4; col++) {
        for (var row = 2; row >= 0; row--) {
            if (board[row][col] != 0) {
                if (board[row+1][col] == 0 || board[row][col] == board[row+1][col]) {
                    return true;
                }
            }
        }
    }
    
    return false;
}

function noBlockVertical(col, from, to) {
    for (var row = from; row < to; row++) {
        if (board[row][col] != 0) 
            return false;
    }
    
    return true;
}

function nospace(board) {
    for (var row = 0; row < board.length; row++) {
        for (var col = 0; col < board[row].length; col++) {
            if (board[row][col] == 0) 
                return false;
        }
    }
    
    return true;
}

function canMove() {
    if (canMoveLeft() || canMoveRight || canMoveDown || canMoveUp)
        return true;
    return false;
}