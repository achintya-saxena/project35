var balloon;
var bg;
var balloonImg1,balloonImg2,balloonImg3;
var database;



function preload() {
bg=loadImage("images/bg.png");
balloonImg1=loadImage("images/1.png");
balloonImg2=loadImage("images/2.png");
balloonImg3=loadImage("images/3.png");
}

function setup() {
  database=firebase.database();
  createCanvas(1200,600);
   balloon=createSprite(600,300, 200, 200);
   balloon.addAnimation("hotAirBalloon",balloonImg1);
   balloon.scale=0.5;
   var balloonPosition = database.ref('balloon/position');
    balloonPosition.on("value", readPosition, showError);
}

function draw() {
  background(bg); 
  
  if(keyDown(LEFT_ARROW)) {
    writePosition(-5,0);
}
if(keyDown(RIGHT_ARROW)) {
    writePosition(5,0);
}
if(keyDown(UP_ARROW)) {
    writePosition(0,-5);
    balloon.addAnimation("hotAirBalloon", balloonImg2);
  balloon.scale = balloon.scale + 0.01;
}
if(keyDown(DOWN_ARROW)) {
    writePosition(0,5);
    balloon.addAnimation("hotAirBalloon", balloonImg3);
  balloon.scale = balloon.scale - 0.01;
}
drawSprites();
textSize(30);
fill("black");
textStyle("bold");
text("Use the Arrow Keys to move the hot air Balloon ",30,30);
}

function readPosition(data) {
  position=data.val();
  balloon.x=position.x;
  balloon.y=position.y;  
}

function writePosition(a,b) {
database.ref('balloon/position').set({
x:position.x+a,
y:position.y+b

})
}
function showError() {
    console.log("data not found");
}
