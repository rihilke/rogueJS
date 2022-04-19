//let var




let weidth = 1024;
let height = 640;

let grid = 50;


let row = Math.ceil(height / grid) ;
//console.log(row);
let col = Math.ceil(weidth / grid) ;
//console.log(col);

let playfield = new Array(row);
    for(var i = 0; i < row; i++){
        playfield[i] = new Array(col);
    }

//

//заполнить стеной
for(let i = 0; i < row; i++){
    for(let j = 0; j < col; j++){
        playfield[i][j] = 0;
    }
}
window.onload = function() {
    //отрисовать стену
    for(var i = 0; i < row; i++){ 
        for(var j = 0; j < col; j++){       
            if(playfield[i][j] === 0){
                let parent = document.querySelector('.field');
                let p = document.createElement('div');
                p.className = 'tile';
                p.style.left = (grid*j)+'px';
                p.style.top = (grid*i)+'px';
                parent.append(p);
            }
        }
    }
};


/*

const rooms = {
    'A': [
        [0,0,0,0],
        [1,1,1,1],
        [0,0,0,0],
        [0,0,0,0]
    ],
};


function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);

    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function rotate(matrix) {
    const N = matrix.length - 1;
    const result = matrix.map((row, i) =>
        row.map((val, j) => matrix[N - j][i])
    );
    return result;
}

function isValidMove(matrix, cellRow, cellCol) {
    for (let row = 0; row < matrix.length; row++) {
        for (let col = 0; col < matrix[row].length; col++) {
            if (matrix[row][col] && (
                cellCol + col < 0 ||
                cellCol + col >= playfield[0].length ||
                cellRow + row >= playfield.length ||
                playfield[cellRow + row][cellCol + col])
            ){
                return false;
            }
        }
    }
    return true;
}
*/