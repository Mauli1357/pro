  var bg, bgImg;
  var astronaut, astronautAni;
  var edges;
  var obstaclesImg, heartImage;
  var obstaclesGroup, heartsGroup;
  var lives = 5;

  function preload(){
    bgImg = loadImage("Images/Bg.jpg");
    astronautAni = loadAnimation("Images/astro1.png", "Images/astro2.png", "Images/astro3.png", "Images/astro4.png", "Images/astro5.png", "Images/astro6.png", "Images/astro7.png", "Images/astro8.png", "Images/astro9.png", "Images/astro10.png", "Images/astro11.png", "Images/astro12.png", "Images/astro13.png", "Images/astro14.png", "Images/astro15.png", "Images/astro16.png", "Images/astro17.png");
    obstaclesImg = loadImage("Images/obstacle1.png");
    heartImage = loadImage("Images/heart.png");
  }

  function setup() {
  createCanvas(600,300);
  
  bg = createSprite(300, 150, 50, 50);
  bg.addImage(bgImg);
  bg.velocityX = -8;
  bg.scale= 1.5;

  astronaut = createSprite(100, 150, 50, 50);
  astronaut.addAnimation("fly",astronautAni);
  astronaut.scale = 0.2;

  obstaclesGroup = new Group();
  heartsGroup = new Group();


  edges = createEdgeSprites();

}

function draw() {
  //scrolling bg  
  background(0);  
  if(bg.x<150){
    bg.x = 300
  }

  // To make the astronaut jump
  if(keyDown("space")){
    astronaut.velocityY = -3;

  }

  // reduce one life after colliding w/ obstacles
  if(obstaclesGroup.collide(astronaut)){
    lives = lives-1;
    obstaclesGroup.destroy();
  }

  astronaut.velocityY += 0.2;
  astronaut.collide(edges[3])

  if(lives<5){
    addlives()
  }

  aliens();
  hearts();
  obstacles();
  drawSprites();

  //text lives
  if(lives>0){
    textSize(20)
    fill("red")
    stroke("white")
    strokeWeight(0.7)
    text("Lives:", 400, 35)
  }
  
}

function obstacles(){
  if(frameCount %400 === 0){
    var obstacle = createSprite(600, 50, 50, 50);
    obstacle.addImage(obstaclesImg);
    obstacle.velocityX = random(-8, 0);
    obstacle.velocityY = random(0, 5);
    obstacle.scale = 0.4;
    obstaclesGroup.add(obstacle);
  }

}

function aliens(){
  if(frameCount %100 === 0){
    var alien = createSprite(600, 150, 50, 50)
    alien.velocityX = -8;
    alien.shapeColor = ("green");
    obstaclesGroup.add(alien);
  }

}

function hearts(){
  for(var i = 0 ; i < lives; i++){
    life = createSprite(470+25*i, 30, 10, 10);
    life.addImage(heartImage);
    life.scale = 0.08;
    
  }
}

function addlives(){
  if(frameCount %1000 === 0){
    heart = createSprite(600, 200, 10, 10);
    heart.addImage(heartImage);
    heart.velocityX = -8;
    heart.scale = 0.08;
    heartsGroup.add(heart);
  }


}