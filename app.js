//const { Howl } = require("./howler.core");

var canvas;
var ctx;
var FPS = 20;
var imgDoor;
var tileMap;
var sonido1;
var sonido2;
var sonido3;
//var backMusic;

sonido1 = new Howl({
  src: ["sound/efecto1.wav"],
  loop: false,
});

sonido2 = new Howl({
  src: ["sound/efecto2.wav"],
  loop: false,
  volume: 0.0,
});

sonido3 = new Howl({
  src: ["sound/efecto3.wav"],
  loop: false,
});

// backMusic = new Howl({
//   src:["music/01.mp3"],
//   loop: true,
//   volume: 0.5,
// })

var length = 25;
var width = 25;

var stage = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 0, 1, 1, 0, 1, 1, 1, 1, 3, 0],
  [0, 1, 1, 0, 1, 0, 1, 0, 1, 0, 0, 1, 1, 0, 1, 0, 1, 0, 1, 0],
  [0, 0, 1, 1, 1, 1, 0, 1, 1, 0, 0, 0, 1, 1, 1, 1, 4, 1, 1, 0],
  [0, 1, 1, 0, 1, 0, 1, 0, 1, 0, 0, 1, 1, 0, 1, 0, 1, 0, 1, 0],
  [0, 0, 0, 1, 0, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 1, 1, 1, 1, 0],
  [0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0],
  [0, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 0],
  [0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0],
  [0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 5, 0],
  [0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
  [0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0],
  [0, 1, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0],
  [0, 0, 1, 1, 1, 1, 4, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0, 1, 1, 0],
  [0, 1, 1, 0, 1, 0, 1, 0, 1, 0, 0, 1, 1, 0, 1, 0, 1, 0, 1, 0],
  [0, 0, 0, 1, 0, 1, 1, 1, 1, 0, 0, 2, 0, 1, 0, 1, 1, 1, 1, 0],
  [0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0],
  [0, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 0],
  [0, 3, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 3, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
];

var enemy = [];


function drawStage() {
  for (y = 0; y < 20; y++) {
    for (x = 0; x < 20; x++) {
      var tile = stage[y][x]

      ctx.drawImage(tileMap,tile*32, 0, 32,32,x*width,y*length,width, length );

    }
  }
}

function cleanCanvas() {
  canvas.width = "500";
  canvas.height = "500";
};


function Door(tile, x, y) {

  this.visible = false;

  this.draw = function() {

    if(this.visible){

      ctx.drawImage(tileMap,tile*32, 1*32, 32, 32,x,y,25, 25);
    
    };
  };

  this.discover = function(){
    this.visible = true;
  };

  this.resetDoors = function(){
    this.visible = false;

  };
}

function Player() {
  this.x = 1;
  this.y = 1;
  this.key = 0;
  this.sDoor = false;
  this.eDoor = false;
  this.steps = 0;
  this.name = undefined;
  this.bScore = 1000;

  this.toSaveGame =function (){
    var coordenadas = [];
    coordenadas.push(this.x);
    coordenadas.push(this.y);
    coordenadas.push(this.sDoor);
    coordenadas.push(secretDoor1.visible);
    coordenadas.push(secretDoor2.visible);
    coordenadas.push(this.eDoor);
    coordenadas.push(exitDoor.visible);
    coordenadas.push(this.steps);
    coordenadas.push(this.key);
    //valores de key en el tablero
    coordenadas.push(stage[18][1]);
    coordenadas.push(stage[1][18]);
    coordenadas.push(stage[18][18]);
    
    return (coordenadas);

  };

  this.toSetGame = function(x,y,sd, v1, v2, ed, v3, st,key, k1, k2, k3){
    this.x = x;
    this.y = y;
    this.sDoor = sd ;
    secretDoor1.visible = v1;
    secretDoor2.visible = v2;
    this.eDoor = ed;
    exitDoor.visible = v3;
    this.steps = st;
    this.key = key;
    stage[18][1] = k1;
    stage[1][18] = k2;
    stage[18][18] = k3;

  };

  this.draw = function () {

    ctx.drawImage(tileMap,32, 32 , 32, 32,this.x*25,this.y*25,25, 25);

      
    
  };

  this.path = function(x,y) {

    var border = false;

    if (stage[y][x] == 0||stage[y][x] == 4||stage[y][x] == 5){
        border = true;
    }
    if (stage[y][x] == 4 && this.sDoor == true){
      border = false;
    }
    if (stage[y][x] == 5 && this.eDoor == true){
      border = false;
    }
    return border;
  }

    this.moveUp = function() {

        if (this.path(this.x, (this.y-1)) == false){
            this.y --; 
            this.steps++;
        } 
        
        this.objectAnalisis();

    };

    this.moveDown = function() {

        if (this.path(this.x, (this.y+1)) == false){
            this.y ++;
            this.steps++;
        }

        this.objectAnalisis();

    };

    this.moveLeft = function() {

        if (this.path((this.x-1), this.y) == false){
            this.x --;
            this.steps++;
        }

        this.objectAnalisis();

    };

    this.moveRight = function() {

        if (this.path((this.x+1), this.y) == false){
            this.x ++;
            this.steps++;
        }

       this.objectAnalisis();

    };

    this.objectAnalisis = function() {

      var object = stage[this.y][this.x];

      if (object == 3) {
        this.key ++;

        sonido3.play();

        console.log("keys"+this.key);
        console.log("posicio" + stage[this.y][this.x]);

        stage[this.y][this.x] = 1;

        console.log("posicion" + stage[this.y][this.x]);

      
        this.sDoor = true;
        console.log("puerta secreta activa?" + this.sDoor);
        

        if(this.key == 3){
          this.eDoor = true;
          exitDoor.discover();
          console.log("puerta de salida: " + this.eDoor);
          console.log("puerta de salida visible:" + exitDoor.visible)
        }
        else {console.log("faltan llaves")}
     };
      
      if (object == 4 && this.sDoor == true) {

        secretDoor1.discover();
        secretDoor2.discover();
        console.log("puerta visible:" + secretDoor1.visible)

        //puerta secreta
        if (this.x == 6 && this.y == 13){
          this.x =16;
          this.y= 3;
        } else{
          this.x = 6;
          this.y = 13;

        };
      };

      if (object == 5 && this.eDoor == true) {

        player1.savedScore();
        console.log(this.bScore)
        //puerta salida
        alert("Felicitaciones " + this.name + "!, has completado el nivel con: " + this.steps + " pasos.");
        player1.resetGame();
      };
    };

    this.enemyCrash = function(x,y){

      if(this.x == x && this.y == y ){

        sonido1.play();
        console.log ( "moriste pajuo");

        alert(this.name + " has muerto!... Intenta de nuevo :D");
        player1.resetGame();
      }
    }

    this.savedScore = function(){

        if (this.steps <= this.bScore) {
          this.bScore = this.steps;

        }
      }

    this.resetGame = function(){

      this.x = 1;
      this.y = 1;
      this.color = "#ffffff";
      this.key = 0;
      this.sDoor = false;
      this.eDoor = false;
      this.steps = 0;
      this.name = undefined;
      stage[1][18] = 3;
      stage[18][18] = 3;
      stage[18][1] = 3;

      secretDoor1.resetDoors();
      secretDoor2.resetDoors();
      exitDoor.resetDoors();

      console.log("el juego se ha reiniciado");

    }

};

function Enemy (x, y){

  this.x = x;
  this.y = y;
  this.direction = 1;
  this.count = 0;
  this.slower = 7;

  this.draw = function () {

    ctx.drawImage(tileMap,0, 32 , 32, 32,this.x*25,this.y*25,25, 25);
  };

  this.checkCrash = function(x,y){

    var crash = false;

    if (stage[y][x] == 0 ){

      crash = true;

    };

    return crash

  };

  this.move = function() {

    player1.enemyCrash(this.x, this.y);

    if(this.count<this.slower){
       
      this.count++;
       
    } else {

      this.count = 0

      if (this.direction == 0){

        if(this.checkCrash((this.x-1), this.y) == false){

          this.x --; 

        } else { 

          this.direction = 1;

        };
      };
  
      if (this.direction == 1){
  
        if(this.checkCrash((this.x+1), this.y) == false){
  
          this.x ++; 
  
        } else{ 

          this.direction = 0;

        };
      };
    };

    
  };
 };

//  var ObjCamara = function(X, Y, dimX, dimY, posx, posy){

//   this.X = X;
//   this.Y = Y;
//   this.dimX = dimX;
//   this.dimY = dimY;

//   this.draw = function () {

//     for (y = this.Y; y < (this.Y + this.dimY); y++) {

//       for (x = this.X; x < (this.X + this.dimX); x++) {

//         var tile = stage[y][x]
//         ctx.drawImage(tileMap,tile*32, 0, 32,32,(x-X)*width,(y-Y)*length,width, length );
  
//       };
//     };
//   };

//   this.move = function(){


//   }

//  };



function saveGame(){
  var coordP = [];
  coordP = player1.toSaveGame();

  localStorage.setItem("x", coordP[0]);
  localStorage.setItem("y", coordP[1]);
  localStorage.setItem("sd", coordP[2]);
  localStorage.setItem("v1", coordP[3]);
  localStorage.setItem("v2", coordP[4]);
  localStorage.setItem("ed", coordP[5]);
  localStorage.setItem("v3", coordP[6]);

  localStorage.setItem("st", coordP[7]);
  localStorage.setItem("key", coordP[8]);
  localStorage.setItem("k1", coordP[9]);
  localStorage.setItem("k2", coordP[10]);
  localStorage.setItem("k3", coordP[11]);
  
  console.log("guardada partida");

};

function setGame(){
  
  var x = parseInt(localStorage.getItem("x"));
  var y = parseInt(localStorage.getItem("y"));
  var sd = JSON.parse(localStorage.getItem("sd"));
  var v1 = JSON.parse(localStorage.getItem("v1"));
  var v2 = JSON.parse(localStorage.getItem("v2"));
  var ed = JSON.parse(localStorage.getItem("ed"));
  var v3 = JSON.parse(localStorage.getItem("v3"));
  var st = parseInt(localStorage.getItem("st"));
  var key = parseInt(localStorage.getItem("key"));
  var k1 = parseInt(localStorage.getItem("k1"));
  var k2 = parseInt(localStorage.getItem("k2"));
  var k3 = parseInt(localStorage.getItem("k3"));

  player1.toSetGame(x, y, sd, v1, v2, ed, v3, st, key, k1, k2, k3);
  console.log( x + "-" + y + "-" + sd + "-" + v1 + "-" + v2 + "-" + ed + "-" + v3 + "-" + st + "-" + key + "-" + k1 + "-" + k2 + "-" + k3);

};
 
function principal() {

  cleanCanvas();
  //camara.draw()
  drawStage();
  player1.draw();
  secretDoor2.draw();
  secretDoor1.draw();
  exitDoor.draw();
 

  for (c=0; c < enemy.length; c++){
    enemy[c].move();
    enemy[c].draw();
  }

  // displayScores()
  
};

function inicializa() {

  
  canvas = document.getElementById("canvas");
  ctx = canvas.getContext("2d");

  imgDoor = new Image();
  imgDoor.src = "imagenes/tilemap2.png";
  tileMap = new Image();
  tileMap.src = "imagenes/tilemap2.png";
  console.log("inicializo");

 
  

  setInterval(function(){

  principal();


  },1000/FPS)
};

//backMusic.play();

var player1 = new Player();

enemy.push(new Enemy(5,18));
enemy.push(new Enemy(7,11));
enemy.push(new Enemy(17,13));
enemy.push(new Enemy(14,6));

var secretDoor1= new Door(4, 150, 325);
var secretDoor2= new Door(4, 400, 75);
var exitDoor= new Door(3, 450, 225);

//var camara = new ObjCamara(2,2,10,10);


//if (player1.name != undefined){
document.addEventListener("keydown", function (tecla) {
    //para repasar codigo de cada tecla;
    //console.log(tecla.key);

    switch (tecla.key) {
          case "Down":
          case "ArrowDown":
            player1.moveDown();
            sonido2.play();
            break;
          case "Up":
          case "ArrowUp":
            player1.moveUp();
            sonido2.play();
            break;
          case "Left":
          case "ArrowLeft":
            player1.moveLeft();
            sonido2.play();
            break;
          case "Right":
          case "ArrowRight":
            player1.moveRight();
            sonido2.play();
            break;
          case "g":
            //guardar jugada
            saveGame();
            console.log("se guarda partida");
            break;
          case "b":
            //borrar jugada
            console.log("se borra partida");
            break;
          case "c":
            //cargar jugada
            setGame();
            console.log("se carga partida");
            break;
        
          default:
            return;
        };
  });
//}

  // const userName = document.getElementById("playerName");
  // const startButton = document.getElementById("start-btn");
  // const resetButton = document.getElementById("reset-btn");
  // const bScores = document.getElementById("bScore");
  // const scores = document.getElementById("score");

  // startButton.addEventListener("click", () =>{

  //   player1.name = userName.Value;
  //   console.log(player1.name);

  // });

  // resetButton.addEventListener("click", () =>{

  //   player1.resetGame();

  // });

  // function displayScores(){

  //   scores.innerHTML = player1.steps;

  //   bScores.innerHTML = player1.bScore;

  // }




