//creating sprites and gamestates 

var PLAY=1;
var END=0;
var gameState=PLAY;
var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup
var score;
var ground;
var survivalTime= 0;

function preload(){
  
  //loading the images
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
createCanvas (500,500)  
//creating the monkey sprite
monkey=createSprite (50,350,20,50)
monkey.addAnimation ("running",monkey_running) 
monkey.scale=0.1;
//creating the ground and giving velocity to it
ground = createSprite(200,390,800,20);
ground.x = ground.width/2;
ground.shapeColor="brown";

//ground.visible=false;
 //creating groups for food and obstacles 
foodGroup= new Group ();
obstacleGroup=new Group ();
//assigning value to score  
score=0;
}


function draw() {

//creating a green background  
background ("green")



  
 //assigning steps to be done in gamestate play 
 if (gameState===PLAY){
 fill ("black")
text("Score: "+ score, 380,50);
   
survivalTime=Math.ceil(frameCount/frameRate())  
stroke ("black")
textSize (20)
fill ("black")
text ("Survival Time      "+survivalTime,100,50)
 
   
   
   if (ground.x < 0){
      ground.x = ground.width/2;
}
 if(keyDown("space")&& monkey.y >= 100) {
monkey.velocityY = -12;
 }
monkey.velocityY=monkey.velocityY+0.8
monkey.collide(ground)
  
if (monkey.isTouching (foodGroup)){
foodGroup.destroyEach ();
score=score+2;
}

if (monkey.isTouching (obstacleGroup)){
obstacleGroup.destroyEach ();
foodGroup.destroyEach ();

gameState=END;
 }
   
   
spawnBananas ();
spawnObstacles ();  
drawSprites (); 
}
  
  //assigning steps to be done in gamestate end
if (gameState===END){

   ground.velocityY=0;
  monkey.velocityY=0;
  monkey.velocityX=0;
  stroke ("yellow")
  fill ("red")
  textSize (50)
  text ("GAME OVER",100,250)

}

 
}



function spawnBananas(){
 if (frameCount % 90 === 0){
   var banana = createSprite(500,0,10,40);
   banana.velocityX = -(6+3*score/100);
 banana.y=Math.round (random(120,200))
banana.addImage("spawn2",bananaImage);
//assign scale and lifetime to the obstacle           
 banana.scale = 0.1;
 banana.lifetime = 300;
   
   //add each obstacle to the group
    foodGroup.add(banana);
 }
}
    

function spawnObstacles(){
 if (frameCount % 60 === 0){
   var obstacle = createSprite(500,350,10,40);
obstacle.addImage("spawn",obstacleImage);
obstacle.velocityX = -(6+3*score/100);
   
obstacle.scale = 0.15;
obstacle.lifetime = 300;
obstacleGroup.add(obstacle);
 }
}