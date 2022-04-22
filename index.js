//0 стена
//1 проход
//2 игрок
//3 противник
//4 меч
//5 лечилка
//6 мертв, использован

let height = 550;
let weidth = 900;
let grid = 40;
let entitiesArray = new Array();

let row = Math.ceil(height / grid) ;
let col = Math.ceil(weidth / grid) ;
//карта проходов
//0 стена
let playField = new Array(row);
    for(var i = 0; i < row; i++){
        playField[i] = new Array(col);
        for(let j = 0; j < col; j++){
            playField[i][j] = 0;
        }
    } 
//карта объектов
//1 пустота
let itemField = new Array(row);
    for(var i = 0; i < row; i++){
        itemField[i] = new Array(col);
        for(let j = 0; j < col; j++){
            itemField[i][j] = 1;
        }
    }
//карта противников
//1 пустота
let enemyField = new Array(row);
    for(var i = 0; i < row; i++){
        enemyField[i] = new Array(col);
        for(let j = 0; j < col; j++){
            enemyField[i][j] = 1;
        }
    }
//      
class Room{
    init(){
        this.getPassages();
        this.getRooms();
        this.drawMap();
    }

    getPassages(){
        // проложить вертикальные и горизонтальные проходы
        let rowRandom = new Array(getRandomInt(3, 5));
        let colRandom = new Array(getRandomInt(3, 5));
    
        for(let i = 0; i < rowRandom.length; i++){
            rowRandom[i] = getRandomInt(0, row);
        }
        for(let j = 0; j < colRandom.length; j++){
            colRandom[j] = getRandomInt(0, col);
        }
    
        // отметить проходы на карте
        for(let i = 0; i < row; i++){
            for(let j = 0; j < col; j++){
                for(let g = 0; g < rowRandom.length; g++){
                    if(rowRandom[g] === i)
                        playField[i][j] = 1;
                }
                for(let h = 0; h < colRandom.length; h++){
                    if(colRandom[h] === j)
                        playField[i][j] = 1;
                }
            }
        }
    }
    
    getRooms(){
        //сгенерировать координаты комнат
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
        //отметить комнаты на карте
        for(let i = 0; i < row; i++){
            for(let j = 0; j < col; j++){
                for(let g = 0; g < roomsRandom.length; g++){
                    if( 
                        j >= roomsRandom[g][0] &&
                        j <= roomsRandom[g][1] &&
                        i >= roomsRandom[g][2] &&
                        i <= roomsRandom[g][3]
                    ){
                        playField[i][j] = 1;
                    }
                }
            }
        }
    }
    
    //отрисовать карту
    drawMap(){
        for(var i = 0; i < row; i++){ 
            for(var j = 0; j < col; j++){ 
                let parent = document.querySelector('.field');
                let p = document.createElement('div');
                //1 проход
                //0 стена
                p.className = playField[i][j] === 1? 'tile' :'tileW';
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
//6 мертв, использован
class Entity {
    constructor(){
        this.coordinate = getRandomCoordinate();
    }

    init(){
        this.createInPlace();
    }
    
    createInPlace(){
        entitiesArray.push(this);
        this.id = entitiesArray.length - 1; 
        let parent = document.querySelector('.field');
        let p = document.createElement('div');
        p.className = this.className;
        p.id = this.id;
        p.style.width  = grid+'px';
        p.style.height = grid+'px';
        p.style.top  = (grid*this.coordinate[0])+'px';
        p.style.left = (grid*this.coordinate[1])+'px';
        parent.append(p);

            //если не игрок и не враг
        if(this.mark !== 2 && this.mark !== 3){
            //прописываем на карте итемов
            itemField[this.coordinate[0]][this.coordinate[1]] = this.mark;
        }else {
            enemyField[this.coordinate[0]][this.coordinate[1]] = this.mark;
        }
    }
    
    move(coord){
        //1 проход
        enemyField[this.coordinate[0]][this.coordinate[1]] = 1;
        let el = document.getElementById(this.id);
        el.style.top  = (grid*this.coordinate[0])+'px';
        el.style.left = (grid*this.coordinate[1])+'px';
        enemyField[this.coordinate[0]][this.coordinate[1]] = this.mark;
        if(this.mark === 2){
            this.getItem();
        }
    }
    
    moveUP(){
        if( this.coordinate[0] > 0 &&
            playField[this.coordinate[0]-1][this.coordinate[1]] === 1
            ) 
            {
                let coord = this.coordinate;
                coord[0]--;
                this.move(coord);
            }
    }

    moveDOWN(){
        if( this.coordinate[0]+1 < row &&
            playField[this.coordinate[0]+1][this.coordinate[1]] === 1
            )
            {
                let coord = this.coordinate;
                coord[0]++;
                this.move(coord);
            }
    }
    moveRIGHT(){
        if( playField[this.coordinate[0]][this.coordinate[1]+1] === 1 )
            {
                let coord = this.coordinate;
                coord[1]++;
                this.move(coord);
            }
    }

    moveLEFT(){
        if( playField[this.coordinate[0]][this.coordinate[1]-1] === 1 )
            {
                let coord = this.coordinate;
                coord[1]--;
                this.move(coord);
            }
    }

    moveRandom(){
        let x = getRandomInt(0, 4);
        switch(x) {
            case 0:  
                this.moveDOWN();
                break;
            case 1:  
                this.moveLEFT();
                break;
            case 2:
                this.moveRIGHT();
                break;
            case 3:
                this.moveUP();
                break;
            case 4:
                break;
            default:
                break;    
        } 
    }

    deleteItem(){
        if(this.mark !== 2){
            let el = document.getElementById(this.id);
            //1 проход
            itemField[this.coordinate[0]][this.coordinate[1]] = 1;            
            entitiesArray[this.id].mark = 6;
            el.remove();
        }
    }

    getItem(){
        if(this.lookItem()){
            //5 лечилка
            if(this.lookItem().mark === 5){
                this.health + this.lookItem().health > this.maxHealth ? 
                    this.health = this.maxHealth : 
                    this.health + this.lookItem().health;
                this.checkHealth();
                this.lookItem().deleteItem();
            } else
            //4 меч
            if(this.lookItem().mark === 4){
                this.hit += this.lookItem().hit;
                this.lookItem().deleteItem();
            }
        }
    }

    lookItem(){
        if(itemField[this.coordinate[0]][this.coordinate[1]] !== 1){
            for(let i = 0; i < entitiesArray.length; i++){
                if( //не игрок
                    entitiesArray[i].mark !== 2 &&
                    //не противник
                    entitiesArray[i].mark !== 3 &&
                    //не убитый противник или использованный итем
                    entitiesArray[i].mark !== 6 &&
                    this.coordinate[0] === entitiesArray[i].coordinate[0] &&
                    this.coordinate[1] === entitiesArray[i].coordinate[1]
                ){
                    return entitiesArray[i];
                }
            }
        }
    }
}//конец Entity
//0 стена
//1 проход
//1 пустота
//2 игрок
//3 противник
//4 меч
//5 лечилка
//6 мертв, использован
class Person extends Entity{
    maxHealth = 2;
    health = this.maxHealth;
    hit = 1;
    init(){
        this.createInPlace();
        this.showHealth();
    }

    showHealth(){
        let percent = (this.health*100) / this.maxHealth;
        let parent = document.querySelectorAll('.'+this.className);
        for(let i = 0; i < parent.length; i++){
            if(parent[i].id == this.id){
                if(parent[i].firstChild){
                    parent[i].removeChild(parent[i].firstChild);
                }
                let p = document.createElement('div');
                p.className = 'health';
                p.style.position = 'relative';
                p.style.width = percent + '%';
                parent[i].append(p);
            }
        }
    }

    checkHealth(){
        if(this.health <= 0){
            this.deletePerson();
            console.log(this.id + ' dead');
        }
        this.showHealth();
    }
    
    deletePerson(){
            let el = document.getElementById(this.id);
            //1 проход
            enemyField[this.coordinate[0]][this.coordinate[1]] = 1;
            entitiesArray[this.id].mark = 6;
            el.remove();
    }
}
//конец Person
//0 стена
//1 проход
//2 игрок
//3 противник
//4 меч
//5 лечилка
//6 мертв, использован
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
    health = 20;
}

class Enemy extends Person{
    className ='tileE';
    mark = 3;
    maxHealth = 2;
    health = this.maxHealth;
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
            if( entitiesArray[i].mark === 3 && 
                (
                //по прямой
                 Math.abs(this.coordinate[0] - entitiesArray[i].coordinate[0]) + 
                 Math.abs(this.coordinate[1] - entitiesArray[i].coordinate[1]) <= 1 ||

                 //по диагонали
                 Math.hypot(
                    Math.abs(this.coordinate[0] - entitiesArray[i].coordinate[0]),
                    Math.abs(this.coordinate[1] - entitiesArray[i].coordinate[1])
                    ) <= Math.hypot(1,1) 
                )
            ){
                this.health -= entitiesArray[i].hit;
                entitiesArray[i].health -= this.hit;
                this.checkHealth();
                entitiesArray[i].checkHealth();
            }
        }
    }
}

class Game{
    init(){
        let room = new Room();
        room.init();
    
        let player = new Player();
        player.init();
      
        for(let i = 0; i < 10; i++){
            let enemy = new Enemy();
            enemy.init();
        }
        
        for (let i = 0; i < 3; i++){
            let sword = new Sword();
            sword.init();    
            let HP   = new HealingPotion();
            HP.init();
        }

        window.onload = function() {
            document.addEventListener('keydown', function(e) {
                //Space
                if (e.which ===  32){
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
                    //если поднял лечилку
                    player.checkHealth();
                    for(let i = 0; i < entitiesArray.length; i++){  
                        if( 
                            //3 противник
                            entitiesArray[i].mark === 3
                        ){  
                            entitiesArray[i].moveRandom();     
                        }
                    }
                }
            });
        };
    }
}


/** утилс**/

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomCoordinate(){
    let x; //= getRandomInt(0, row-1);
    let y; //= getRandomInt(0, col-1);
    //в while и do проверяется только одно условие
    while(true) {
        x = getRandomInt(0, row-1);
        y = getRandomInt(0, col-1);
        if( enemyField[x][y] == 1 &&
            itemField[x][y]  == 1 &&
            playField[x][y]  == 1 
            ){ 
                break;
            } 
    } 
    let coordinate = [x,y];
    return coordinate;
}