//0 стена
//1 проход

let weidth = 1024;
let height = 640;
let grid = 50;

let row = Math.ceil(height / grid) ;
let col = Math.ceil(weidth / grid) ;
//карта проходов
let playfield = new Array(row);
    for(var i = 0; i < row; i++){
        playfield[i] = new Array(col);
        for(let j = 0; j < col; j++){
            playfield[i][j] = 0;
        }
    } 
//карта объектов
let entityField = new Array(row);
for(var i = 0; i < row; i++){
    playfield[i] = new Array(col);
    for(let j = 0; j < col; j++){
        playfield[i][j] = 0;
    }
}    
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
                //1 проход
                let parent = document.querySelector('.field');
                let p = document.createElement('div');
                p.className = 'tile';
                p.style.top = (grid*i)+'px';
                p.style.left = (grid*j)+'px';
                parent.append(p);
            }
            //0 стена
            if(playfield[i][j] === 0){
                let parent = document.querySelector('.field');
                let p = document.createElement('div');
                p.className = 'tileW';
                p.style.top = (grid*i)+'px';
                p.style.left = (grid*j)+'px';
                parent.append(p);
            }
        }
    }
}

class Entity {
    constructor(id){
        this.coordinate = getRandomCoordinate();
        this.id = id;
    }

    createInPlace(){
        let parent = document.querySelector('.field');
        let p = document.createElement('div');
        p.className = this.className;
        p.id = this.id;
        p.style.top = (grid*this.coordinate[0])+'px';
        p.style.left = (grid*this.coordinate[1])+'px';
        playfield[this.coordinate[0]][this.coordinate[1]] = this.mark;
        parent.append(p);
    }
    
    moveUP(){
        if( playfield[this.coordinate[0]-1][this.coordinate[1]] > 0  &&
            playfield[this.coordinate[0]-1][this.coordinate[1]] < row &&
            playfield[this.coordinate[0]-1][this.coordinate[1]] === 1
            )
            {
                //1 проход
                playfield[this.coordinate[0]][this.coordinate[1]] = 1;
                this.coordinate[0] = this.coordinate[0]-1;
                let el = document.getElementById(this.id);
                el.style.top = (grid*this.coordinate[0])+'px';
                el.style.left = (grid*this.coordinate[1])+'px';
                playfield[this.coordinate[0]][this.coordinate[1]] = this.mark;
            } 
    }

    moveDOWN(){
        if( playfield[this.coordinate[0]+1][this.coordinate[1]] === 1 &&
            playfield[this.coordinate[0]+1][this.coordinate[1]] > 0  &&
            playfield[this.coordinate[0]+1][this.coordinate[1]] < row
            )
            {
                //1 проход
                playfield[this.coordinate[0]][this.coordinate[1]] = 1;
                this.coordinate[0] = this.coordinate[0]+1;
                let el = document.getElementById(this.id);
                el.style.top = (grid*this.coordinate[0])+'px';
                el.style.left = (grid*this.coordinate[1])+'px';
                playfield[this.coordinate[0]][this.coordinate[1]] = this.mark;
            }
    }
    moveRIGHT(){
        if( playfield[this.coordinate[0]][this.coordinate[1]+1] === 1 &&
            playfield[this.coordinate[0]][this.coordinate[1]+1] > 0  &&
            playfield[this.coordinate[0]][this.coordinate[1]+1] < row
            )
            {
                //1 проход
                playfield[this.coordinate[0]][this.coordinate[1]] = 1;
                this.coordinate[1] = this.coordinate[1]+1;
                let el = document.getElementById(this.id);
                el.style.top = (grid*this.coordinate[0])+'px';
                el.style.left = (grid*this.coordinate[1])+'px';
                playfield[this.coordinate[0]][this.coordinate[1]] = this.mark;
            }
    }

    moveLEFT(){
        if( playfield[this.coordinate[0]][this.coordinate[1]-1] === 1 &&
            playfield[this.coordinate[0]][this.coordinate[1]-1] > 0  &&
            playfield[this.coordinate[0]][this.coordinate[1]-1] < row
            )
            {
                //1 проход
                playfield[this.coordinate[0]][this.coordinate[1]] = 1;
                this.coordinate[1] = this.coordinate[1]-1;
                let el = document.getElementById(this.id);
                el.style.top = (grid*this.coordinate[0])+'px';
                el.style.left = (grid*this.coordinate[1])+'px';
                playfield[this.coordinate[0]][this.coordinate[1]] = this.mark;
            }
    }
    /*
    arrRandomMove = [this.moveUP, this.moveDOWN, this.moveLEFT, this.moveRIGHT];
    moveRandom() {
       return arrRandomMove[getRandomInt(0, this.arrRandomMove.length)]();
    }
    */
    
    delete(){
        let el = document.getElementById(this.id);
        //1 проход
        playfield[this.coordinate[0]][this.coordinate[1]] = 1;
        el.remove();
    }

}
//конец Сущности
class Sword extends Entity{
    className ='tileSW';
    mark = 'Sword';
}

class HealingPotion extends Entity{
    className = 'tileHP';
    mark = 'HP';
}

class Person extends Entity{
    maxHealth = 2;
    health = 2;
    hit = 1;

    showFullHealth(){
        let parent = document.querySelector('.'+this.className);
        let p = document.createElement('div');
        p.className = 'health';
        p.style.width = grid;
        p.style.position = 'relative';
//        p.style.top = (grid*this.coordinate[0])+'px';
//        p.style.left = (grid*this.coordinate[1])+'px';
        parent.append(p);
    }
}

class Enemy extends Person{
    className ='tileE';
    mark = 'Enemy';
    health = 1;
}

class Player extends Person{
    className ='tileP';
    mark = 'Player';

}

window.onload = function() {
    getPassages();
    getRooms();
    drawMap();
    let sword = new Sword('s');
    sword.createInPlace();

    //TODO factory
    
    let HP   = new HealingPotion('hp');
    HP.createInPlace();
    let enemy = new Enemy('e');
    enemy.createInPlace();
    enemy.showFullHealth();
    
    let player = new Player('player');
    player.createInPlace();
    player.showFullHealth();

    document.addEventListener('keydown', function(e) {
        //Space
        if (e.which ===  32){
        //    sword.delete();
        }
        //Arrow Up, W	
        if( e.which === 38 || e.which === 87 ){
            player.moveUP();
        }

        //Arrow Down, S	
        if( e.which === 40 || e.which === 83 ){
            player.moveDOWN();
        }
        //Arrow Right, D	
        if( e.which === 39 || e.which === 68 ){
            player.moveRIGHT();
        }
        //Arrow Left, A	
        if( e.which === 37 || e.which === 65 ){
            player.moveLEFT();
        }

        //random
        if(
            e.which === 38 || e.which === 87 ||
            e.which === 40 || e.which === 83 ||
            e.which === 39 || e.which === 68 ||
            e.which === 37 || e.which === 65
        ){
            let i = getRandomInt(0, 3)
            switch(i) {
                case 0:  
                    enemy.moveDOWN();
                    break
                case 1:  
                    enemy.moveLEFT();
                    break
                case 2:
                    enemy.moveRIGHT();
                    break
                case 3:
                    enemy.moveUP();
                    break
                default:
                    break
            }
        }
    });
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
    do {
        x = getRandomInt(0, row-1);
        y = getRandomInt(0, col-1);
    } while (playfield[x][y] != 1);

    let coordinate = [x,y];
    return coordinate;
}

function createInRandomPlace(className){
    let coordinate = getRandomCoordinate();
    let parent = document.querySelector('.field');
    let p = document.createElement('div');
    p.className = className;
    p.style.top  = (grid*coordinate[0])+'px';
    p.style.left = (grid*coordinate[1])+'px';
    parent.append(p);
}

/*
function draw(coordinate){
    this.style.top = (grid*coordinate[0])+'px';
    this.style.left = (grid*coordinate[1])+'px';
}
*/
/*
function createInPlace(className, coordinate){
    let parent = document.querySelector('.field');
    let p = document.createElement('div');
    p.className = className;
    p.style.top = (grid*coordinate[0])+'px';
    p.style.left = (grid*coordinate[1])+'px';
    parent.append(p);
}
*/