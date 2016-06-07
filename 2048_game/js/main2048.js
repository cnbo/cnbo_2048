var board = new Array();
var score = 0;

var startx = 0;
var starty = 0;
var endx = 0;
var endy = 0;

$(function() {
    prepareForMobile();
    newGame(); 
});

function prepareForMobile() {
    if (documentWidth > 500) {
        gridContainerWidth = 500;
        cellSideLength = 100;
        cellSpace = 20;
    }
    $("#grid-container").css("width", gridContainerWidth-2*cellSpace);
    $("#grid-container").css("height", gridContainerWidth-2*cellSpace);
    $("#grid-container").css("padding", cellSpace);
    $("#grid-container").css("border-radius", 0.02*gridContainerWidth);
    
    $(".grid-cell").css("width", cellSideLength);
    $(".grid-cell").css("height", cellSideLength);
    $(".grid-cell").css("border-radius", 0.02*cellSideLength);
}

function newGame() {
    //初始化棋盘格
    init();
    //在两个随机的位置生成一个随机数
    generateOneNumber();
    generateOneNumber();
}

function init() {
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            var theNumCell = $("#grid-cell-" + i + "-" + j);
            theNumCell.css("top", getPosTop(i));
            theNumCell.css("left", getPosLeft(j));
        }
    }
    for (var i = 0; i < 4; i++) {
        board[i] = new Array();
        for (var j = 0; j < 4; j++) {
            board[i][j] = 0;
        }
    }
    
    
    score = 0;
}

$(window).keydown(function(event) {
       switch(event.keyCode) {
           case 37:
               if (moveLeft()) {
                   generateOneNumber();
                   isGameOver();
               }
               
               break;
           case 38:
               if (moveUp()) {
                   generateOneNumber();
                   isGameOver();
               }
               break;
           case 39:
               if (moveRight()) {
                   generateOneNumber();
                   isGameOver();
               }
               break;
           case 40:
               if (moveDown()) {
                   generateOneNumber();
                   isGameOver();
               }
               break;
           default:
               break;
       } 
});
    
document.addEventListener("touchstart", function(event) {
    startx = evet.touches[0].pageX;
    starty = evet.touches[0].pageY;
});

document.addEventListener("touchend", function(event) {
    endx = event.changedTouches[0].pageX;
    endy = event.changedTouches[0].pageY;
    
    var detax = endx - startx;
    var detay = endy - starty;
    
    //x
    if (Math.abs(detax) > Math.abs(detay)) {
        if (detax > 0) {
            //right;
            if (moveRight()) {
                generateOneNumber();
                isGameOver();
            }
        } else {
            //left;
            if (moveLeft()) {
                generateOneNumber();
                isGameOver();
            }
        }
    }
        
    //y
    else {
        if (detay > 0) {
            //down
            if (moveDown()) {
                generateOneNumber();
                isGameOver();
            }
        } else {
            //up
            if (moveUp()) {
                generateOneNumber();
                isGameOver();
            }
        }
    }
});

function generateOneNumber() {
    if (nospace(board)) 
        return false;
    
    randX = Math.floor(Math.random() * 4);
    randY = Math.floor(Math.random() * 4);
    while(board[randX][randY] != 0) {
        randX = Math.floor(Math.random() * 4);
        randY = Math.floor(Math.random() * 4);
    }
    
    board[randX][randY] = Math.random() < 0.5 ? 2 : 4;

    updateNumberView();
}

function  updateNumberView() {
    
    $(".grid-cell").remove();
    
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            $("#grid-container").append("<div class='grid-cell' id='grid-cell-" + i + "-" + j + "'></div>");
            var theNumCell = $("#grid-cell-" + i + "-" + j);
            
            if (board[i][j] == 0) {
                theNumCell.css("position", "absolute");
                theNumCell.css("top",  getPosTop(i));
                theNumCell.css("left", getPosLeft(j));
                theNumCell.css("background-color", "#ccc0b3");
                theNumCell.text("");
            } else {
                theNumCell.css("position", "absolute");
                theNumCell.css("top",  getPosTop(i));
                theNumCell.css("left", getPosLeft(j));
                theNumCell.text(board[i][j]);
                theNumCell.css("background-color", getCellColor(board[i][j]));
                theNumCell.css("font-size", "20px");
                theNumCell.css("text-align", "center");
            }
        }
    }
    
    $(".grid-cell").css("width", cellSideLength);
    $(".grid-cell").css("height", cellSideLength);
    $(".grid-cell").css("border-radius", 0.08*cellSideLength+"px");
    $(".grid-cell").css("line-height", cellSideLength+"px");
    $(".grid-cell").css("font-size", 0.6*cellSideLength+"px");
    $("#score").text(score);
}

function getPosTop(i) {
    //return 20 + i * 120;
    return cellSpace + i*(cellSpace+cellSideLength);
}

function getPosLeft(j) {
    //return 20 + j * 120;
    return cellSpace + j*(cellSpace+cellSideLength);
}

function moveLeft() {
    if (! canMoveLeft()) {
        return false;
    }
    
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            if (board[i][j] != 0) {
                for (var k = j + 1; k < 4; k++) {
                    if (board[i][j] == board[i][k] && noBlockHorizontal(i, j+1, k)) {
                        board[i][j] += board[i][k];
                        board[i][k] = 0;
                        score += board[i][j];
                        break;
                    }
                }
            }
        }
    }
    
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            if (board[i][j] == 0) {
                for (var k = j + 1; k < 4; k++) {
                    if (board[i][k] != 0) {
                        board[i][j] = board[i][k];
                        board[i][k] = 0;
                        break;
                    }
                }
            }
        }
    }
    
    return true;
}

function moveRight() {
    if (! canMoveRight()) {
        return false;
    }
    
    for (var i = 0; i < 4; i++) {
        for (var j = 3; j >= 0; j--) {
            if (board[i][j] != 0) {
                for (var k = j - 1; k >= 0; k--) {
                    if (board[i][j] == board[i][k] && noBlockHorizontal(i, k+1, j)) {
                        board[i][j] += board[i][k];
                        board[i][k] = 0;
                        score += board[i][j];
                        break;
                    }
                }
            }
        }
    }
    
    for (var i = 0; i < 4; i++) {
        for (var j = 3; j > 0; j--) {
            if (board[i][j] == 0) {
                for (var k = j - 1; k >= 0; k--) {
                    if (board[i][k] != 0) {
                        board[i][j] = board[i][k];
                        board[i][k] = 0;
                        break;
                    }
                }
            }
        }
    }
    
    return true;
}

function moveUp() {
    if (! canMoveUp()) {
        return false;
    }
    
    for (var col = 0; col < 4; col++) {
        for (var row = 0; row < 4; row++) {
            if (board[row][col] != 0) {
                for (var rowK = row + 1; rowK < 4; rowK++) {
                    if (board[row][col] == board[rowK][col] && noBlockVertical(col, row+1, rowK)) {
                        board[row][col] += board[rowK][col];
                        board[rowK][col] = 0;
                        score += board[row][col];
                        break;
                    }
                }
            }
        }
    }
    
    for (var col = 0; col < 4; col++) {
        for (var row = 0; row < 4; row++) {
            if (board[row][col] == 0) {
                for (var rowK = row + 1; rowK < 4; rowK++) {
                    if (board[rowK][col] != 0) {
                        board[row][col] = board[rowK][col];
                        board[rowK][col] = 0;
                        break;
                    }
                }
            }
        }
    }
    
    return true;
}

function moveDown() {
    if (! canMoveDown()) {
        return false;
    }
    
    for (var col = 0; col < 4; col++) {
        for (var row = 3; row >= 0; row--) {
            if (board[row][col] != 0) {
                for (var rowK = row - 1; rowK >= 0; rowK--) {
                    if (board[row][col] == board[rowK][col] && noBlockHorizontal(col, rowK+1, row)) {
                        board[row][col] += board[rowK][col];
                        board[rowK][col] = 0;
                        score += board[row][col];
                        break;
                    }
                }
            }
        }
    }
    
    for (var col = 0; col < 4; col++) {
        for (var row = 3; row > 0; row--) {
            if (board[row][col] == 0) {
                for (var rowK = row - 1; rowK >= 0; rowK--) {
                    if (board[rowK][col] != 0) {
                        board[row][col] = board[rowK][col];
                        board[rowK][col] = 0;
                        break;
                    }
                }
            }
        }
    }
    
    return true;
}

function isGameOver() {
    if (!canMove())
        alert("Game Over");
}