let weidth = 1024;
let height = 640;
let grid = 50;

let row = Math.ceil(height / grid) ;
let col = Math.ceil(weidth / grid) ;
let playfield = new Array(row);
    for(var i = 0; i < row; i++){
        playfield[i] = new Array(col);
        for(let j = 0; j < col; j++){
            playfield[i][j] = 0;
        }
    }
//
function getPassages(){
    // проложить вертикальные и горизонтальные проходы
    let rowRandom = new Array(getRandomInt(3, 5));
    let colRandom = new Array(getRandomInt(3, 5));

    for(let i = 0; i < rowRandom.length; i++){
        rowRandom[i] = getRandomInt(0, row);
    }
    for(let j = 0; j < colRandom.length; j++){
        colRandom[j] = getRandomInt(0, col);
    }

    for(let i = 0; i < row; i++){
        for(let j = 0; j < col; j++){
            for(let g = 0; g < rowRandom.length; g++){
                if(rowRandom[g] === i)
                playfield[i][j] = 1;
            }
            for(let h = 0; h < colRandom.length; h++){
                if(colRandom[h] === j)
                playfield[i][j] = 1;
            }
        }
    }
}

function getRooms(){
    //сгенерировать комнаты
    let roomsRandom = new Array(getRandomInt(5, 10));
    for(let i = 0; i < roomsRandom.length; i++){
        roomsRandom[i] = new Array(4);
        roomsRandom[i][0] = getRandomInt(0, row);
        roomsRandom[i][1] = roomsRandom[i][0] + getRandomInt(3, 8);
            if(roomsRandom[i][1] > row) 
            roomsRandom[i][1] = row;
        roomsRandom[i][2] = getRandomInt(0, col);
        roomsRandom[i][3] = roomsRandom[i][2] + getRandomInt(3, 8);
            if(roomsRandom[i][3] > col) 
            roomsRandom[i][3] = col;
        //console.log(roomsRandom[i]);
    }

    //нарисовать комнаты
    for(let i = 0; i < row; i++){
        for(let j = 0; j < col; j++){
            for(let g = 0; g < roomsRandom.length; g++){
                if( 
                    j >= roomsRandom[g][0] &&
                    j <= roomsRandom[g][1] &&
                    i >= roomsRandom[g][2] &&
                    i <= roomsRandom[g][3]
                ){
                    playfield[i][j] = 1;
                    //console.log(j + ' ' + i);
                }
                
            }
        }
    }
}

function drawMap(){
        //отрисовать карту
    for(var i = 0; i < row; i++){ 
        for(var j = 0; j < col; j++){       
            if(playfield[i][j] === 1){
                let parent = document.querySelector('.field');
                let p = document.createElement('div');
                p.className = 'tile';
                p.style.left = (grid*j)+'px';
                p.style.top = (grid*i)+'px';
                parent.append(p);
            }
            if(playfield[i][j] === 0){
                let parent = document.querySelector('.field');
                let p = document.createElement('div');
                p.className = 'tileW';
                p.style.left = (grid*j)+'px';
                p.style.top = (grid*i)+'px';
                parent.append(p);
            }
        }
    }
}



function Sword(){
    draw('tileSW');
}

function HealingPotion(){
    draw('tileHP');
}

function Enemy(){
    draw('tileE');
}

function Player(){
    draw('tileP');
}

window.onload = function() {
    getPassages();
    getRooms();
    drawMap();
    Sword();
    Sword();
    for(let i = 0; i < 10; i++){
        HealingPotion();
        Enemy();
    }
    Player();

};

/** утилс**/
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomCoordinate(){
    let x = getRandomInt(0, row-1);
    let y = getRandomInt(0, col-1);
    do{
        x = getRandomInt(0, row-1);
        y = getRandomInt(0, col-1);
    } while (playfield[x][y] === 0);

    let coordinate = [x,y];
    console.log(coordinate);
    return coordinate;
}

function draw(className){
    let coordinate = getRandomCoordinate();
    let parent = document.querySelector('.field');
    let p = document.createElement('div');
    p.className = className;
    p.style.left = (grid*coordinate[1])+'px';
    p.style.top = (grid*coordinate[0])+'px';
    parent.append(p);
}