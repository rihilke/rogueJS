//0 стена
//1 проход
//2 игрок
//3 противник
//4 меч
//5 лечилка

let weidth = 1024;
let height = 640;
let grid = 50;
let entitiesArray = new Array();

let row = Math.ceil(height / grid) ;
let col = Math.ceil(weidth / grid) ;
//карта проходов
//0 стена
let playfield = new Array(row);
    for(var i = 0; i < row; i++){
        playfield[i] = new Array(col);
        for(let j = 0; j < col; j++){
            playfield[i][j] = 0;
        }
    } 
//карта объектов
//1 пустота
let entityField = new Array(row);
    for(var i = 0; i < row; i++){
        entityField[i] = new Array(col);
        for(let j = 0; j < col; j++){
            entityField[i][j] = 1;
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
            //1 проход
            if(playfield[i][j] === 1){
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
//0 стена
//1 проход
//2 игрок
//3 противник
//4 меч
//5 лечилка
class Entity {
    constructor(){
        this.coordinate = getRandomCoordinate();
        //this.id = id;
        //вместо id индекс
    }
    
    createInPlace(){
        entitiesArray.push(this);
        this.index = entitiesArray.length - 1;
        let parent = document.querySelector('.field');
        let p = document.createElement('div');
        p.className = this.className;
        p.id = this.index;
        p.style.top = (grid*this.coordinate[0])+'px';
        p.style.left = (grid*this.coordinate[1])+'px';

            //если не игрок и не враг
        if(this.mark !== 2 && this.mark !== 3){
                    //прописываем на карте итемов
            entityField[this.coordinate[0]][this.coordinate[1]] = this.mark;
        }
        
        //console.log(this.mark);
        parent.append(p);
    }
    
    moveUP(){
        if( playfield[this.coordinate[0]-1][this.coordinate[1]] > 0  &&
            playfield[this.coordinate[0]-1][this.coordinate[1]] < row &&
            playfield[this.coordinate[0]-1][this.coordinate[1]] === 1
            )
            {
                //1 проход
                //entityField[this.coordinate[0]][this.coordinate[1]] = 1;
                this.coordinate[0] = this.coordinate[0]-1;
                let el = document.getElementById(this.index);
                el.style.top = (grid*this.coordinate[0])+'px';
                el.style.left = (grid*this.coordinate[1])+'px';
                //entityField[this.coordinate[0]][this.coordinate[1]] = this.mark;
                if(this.mark === 2){
                    this.getItem();
                }
            }
    }

    moveDOWN(){
        if( playfield[this.coordinate[0]+1][this.coordinate[1]] === 1 &&
            playfield[this.coordinate[0]+1][this.coordinate[1]] > 0  &&
            playfield[this.coordinate[0]+1][this.coordinate[1]] < row
            )
            {
                //1 проход
                //entityField[this.coordinate[0]][this.coordinate[1]] = 1;
                this.coordinate[0] = this.coordinate[0]+1;
                let el = document.getElementById(this.index);
                el.style.top = (grid*this.coordinate[0])+'px';
                el.style.left = (grid*this.coordinate[1])+'px';
                //entityField[this.coordinate[0]][this.coordinate[1]] = this.mark;
                if(this.mark === 2){
                    this.getItem();
                }

            }
    }
    moveRIGHT(){
        if( playfield[this.coordinate[0]][this.coordinate[1]+1] === 1 &&
            playfield[this.coordinate[0]][this.coordinate[1]+1] > 0  &&
            playfield[this.coordinate[0]][this.coordinate[1]+1] < row
            )
            {
                //1 проход
                //entityField[this.coordinate[0]][this.coordinate[1]] = 1;
                this.coordinate[1] = this.coordinate[1]+1;
                let el = document.getElementById(this.index);
                el.style.top = (grid*this.coordinate[0])+'px';
                el.style.left = (grid*this.coordinate[1])+'px';
                //entityField[this.coordinate[0]][this.coordinate[1]] = this.mark;
                if(this.mark === 2){
                    this.getItem();
                }
            }
    }

    moveLEFT(){
        if( playfield[this.coordinate[0]][this.coordinate[1]-1] === 1 &&
            playfield[this.coordinate[0]][this.coordinate[1]-1] > 0  &&
            playfield[this.coordinate[0]][this.coordinate[1]-1] < row
            )
            {
                //1 проход
                //entityField[this.coordinate[0]][this.coordinate[1]] = 1;
                this.coordinate[1] = this.coordinate[1]-1;
                let el = document.getElementById(this.index);
                el.style.top = (grid*this.coordinate[0])+'px';
                el.style.left = (grid*this.coordinate[1])+'px';
                //entityField[this.coordinate[0]][this.coordinate[1]] = this.mark;
                if(this.mark === 2){
                    this.getItem();
                }
            }
    }
    /*
    //вернуть функцию
    arrRandomMove = [this.moveUP, this.moveDOWN, this.moveLEFT, this.moveRIGHT];
    moveRandom() {
       return arrRandomMove[getRandomInt(0, this.arrRandomMove.length)]();
    }
    */
    
    deleteEntity(){
        if(this.mark !== 2){
            let el = document.getElementById(this.index);
            //1 проход
            entityField[this.coordinate[0]][this.coordinate[1]] = 1;
            //console.log(this.coordinate);
            
            //delete entitiesArray[this.index];
//            entitiesArray.splice(this.index, 1);

            entitiesArray.slice(this.index);
            el.remove();
        }
    }

    getItem(){
        if(this.lookItem()){
            //5 лечилка
            if(this.lookItem().mark === 5){
                this.health += this.lookItem().health;
                this.showHealth();
                this.lookItem().deleteEntity();
            } else
            //5 меч
            if(this.lookItem().mark === 4){
                this.hit += this.lookItem().hit;
                this.lookItem().deleteEntity();
            }
        }
    }

    lookItem(){
        if(entityField[this.coordinate[0]][this.coordinate[1]] !== 1){
            
            for(let i = 0; i < entitiesArray.length; i++){
                if( this.coordinate[0] === entitiesArray[i].coordinate[0] &&
                    this.coordinate[1] === entitiesArray[i].coordinate[1] &&
                    entitiesArray[i].mark !== 2
                ){
                   // console.log(entitiesArray[i]);
                    return entitiesArray[i];
                }
            }
        }
    }

    


} //конец сущности
//0 стена
//1 проход
//1 пустота
//2 игрок
//3 противник
//4 меч
//5 лечилка
class Person extends Entity{
    maxHealth = 2;
    health = this.maxHealth;
    hit = 1;

    showHealth(){
        let percent = (this.health*100) / this.maxHealth;

        let parent = document.querySelectorAll('.'+this.className);
        for(let i = 0; i < parent.length; i++){
            if(parent[i].id == this.index){
                if(parent[i].firstChild){
                    parent[i].removeChild(parent[i].firstChild);
                }
                let p = document.createElement('div');
                p.className = 'health';
                p.style.width = grid;
                p.style.position = 'relative';
                p.style.width = percent + '%';
        //        p.style.top = (grid*this.coordinate[0])+'px';
        //        p.style.left = (grid*this.coordinate[1])+'px';
                parent[i].append(p);
            }
        }
    }

    checkHealth(){
        if(this.health <= 0){
            this.deletePerson();
            console.log(this.index + ' dead');
        }
        this.showHealth();
    }
    
    deletePerson(){
            let el = document.getElementById(this.index);
            //1 проход
            entityField[this.coordinate[0]][this.coordinate[1]] = 1;
            console.log(this.index);
            
            //delete entitiesArray[this.index];
            //entitiesArray.splice(this.index, 1);
            entitiesArray.slice(this.index);

            el.remove();
    }
}
//конец Сущности
//0 стена
//1 проход
//2 игрок
//3 противник
//4 меч
//5 лечилка
class Sword extends Entity{
    className ='tileSW';
    mark = 4;
    //для плюсования
    hit = 2;
}

class HealingPotion extends Entity{
    className = 'tileHP';
    mark = 5;
    //для плюсования
    health = 2;
}

class Enemy extends Person{
    className ='tileE';
    mark = 3;
    maxHealth = 2;
    //hit =
}

class Player extends Person{
    className ='tileP';
    mark = 2;
    maxHealth = 20;
    health = this.maxHealth;
    //hit =
    attackAll(){
        for(let i = 0; i < entitiesArray.length; i++){
            if( (
                //по прямой
                 Math.abs(this.coordinate[0] - entitiesArray[i].coordinate[0]) + 
                 Math.abs(this.coordinate[1] - entitiesArray[i].coordinate[1]) <= 1 ||

                 //по диагонали
                 Math.hypot(
                    Math.abs(this.coordinate[0] - entitiesArray[i].coordinate[0]),
                    Math.abs(this.coordinate[1] - entitiesArray[i].coordinate[1])
                 ) <= Math.hypot(1,1)
                 
            ) &&
        
                entitiesArray[i].mark === 3
            ){
                console.log(entitiesArray[i]);

                this.health -= entitiesArray[i].hit;
                entitiesArray[i].health -= this.hit;
                this.checkHealth();
                entitiesArray[i].checkHealth();
            }
        }
    }
}

window.onload = function() {
    getPassages();
    getRooms();
    drawMap();

    let player = new Player();
    player.createInPlace();
    player.showHealth();
  
    
    for(let i = 0; i < 10; i++){
        let enemy = new Enemy();
        enemy.createInPlace();
        enemy.showHealth();
    }
    
    for (let i = 0; i < 3; i++){
        let sword = new Sword();
        sword.createInPlace();    
        let HP   = new HealingPotion();
        HP.createInPlace();
    }
    

    //console.log(entitiesArray);

    document.addEventListener('keydown', function(e) {
        //Space
        if (e.which ===  32){
            //sword.deleteEntity();
            //console.log(entitiesArray);
            player.attackAll();
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

        //random for enemy
        if(
            e.which === 38 || e.which === 87 ||
            e.which === 40 || e.which === 83 ||
            e.which === 39 || e.which === 68 ||
            e.which === 37 || e.which === 65
        ){  
            console.log(entitiesArray);
            for(let i = 0; i < entitiesArray.length; i++){
                let x = getRandomInt(0, 4);
                if(entitiesArray[i].mark === 3){
                    switch(x) {
                        case 0:  
                        entitiesArray[i].moveDOWN();
                            break
                        case 1:  
                        entitiesArray[i].moveLEFT();
                            break
                        case 2:
                            entitiesArray[i].moveRIGHT();
                            break
                        case 3:
                            entitiesArray[i].moveUP();
                            break
                        case 4:
                            break
                        default:
                            break
                    }
                }
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

/*
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