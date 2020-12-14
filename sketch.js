var hero,jail
var gameState=1
var bullet
var frame=0
var score=0


function preload(){
  heroImage=loadImage("hero img.png")
  bombImage=loadImage("bomb1.png")
  villianImage=loadImage("villian 1 img.png")
  jail1=loadImage("jail 1.jpg")
  backgroundimage=loadImage("background 2.jpg")
  jail2=loadImage("jail 2.jpg")
  jail3=loadImage("jail 3.jpg")
  bulletImage=loadImage("bullet.png")
}
function setup(){
  createCanvas(800,400)
  backGround=createSprite(400,200)
  backGround.addImage(backgroundimage)
  backGround.scale=1.8
  hero=createSprite(50,300)
  hero.addImage(heroImage)
  hero.scale=0.4
  hero.setCollider("rectangle",0,0,50,450)
  hero.debug=true

  ground=createSprite(400,390,1600,10)
  backGround.velocityX=-2
  bombGroup=createGroup()

  villiangroup=createGroup()
  bulletgroup=createGroup()
  jailgroup=createGroup()
}
function draw(){
  background("white")
  hero.collide(ground)
  
  if(gameState===1){
  if(keyDown ("space")&&hero.y>250){
      hero.velocityY=-15
    }
    hero.velocityY=hero.velocityY+0.8
  if(hero.isTouching(bombGroup)){
      gameState=2
    }
  
  if(backGround.x<0){
    backGround.x=400
  }
  createBomb()
  createvillian()
  console.log(hero.y)
  if(keyDown(RIGHT_ARROW)){
    createBullet()
  }
  if(bulletgroup.isTouching(villiangroup)){
    score=score+50
     bulletgroup.destroyEach()
     villiangroup.destroyEach()
     frame=frameCount
    createjail()
  }
 
  if(frame+50===frameCount){
    jailgroup.destroyEach()
  }
}

 if(gameState===2){
   
  
   bombGroup.setVelocityXEach(0)
   bombGroup.setLifetimeEach(-1)
   ground.velocityX=0
   backGround.velocityX=0
   hero.velocityY=0

  
 }

  
  drawSprites()
  textSize(25)
  fill("red")
  text("score:"+score,10,50)

  if(gameState===2){
    textSize(40)
    text("gameOver",300,200)
  }
}
function createBomb(){
if(frameCount%150===0){
  bomb=createSprite(800,350,5,786)
  bomb.addImage(bombImage)
  bomb.velocityX=-(8+score/50)
  bomb.lifetime=400
  bomb.scale=0.2

bombGroup.add(bomb)

}
}
function createvillian(){
  if(frameCount%750===0){
    villian=createSprite(800,300,5,786)
    villian.addImage(villianImage)
    villian.velocityX=-(5+score/50)
    villian.lifetime=400
    villian.scale=0.1
    villiangroup.add(villian)
  
  }
}
function createBullet(){
  bullet=createSprite(hero.x,hero.y,15,15)
  bullet.velocityX=+10
  bullet.lifetime=400
  bullet.addImage(bulletImage)
  bullet.scale=0.5
  bulletgroup.add(bullet)
  
}
 function createjail(){
  jail=createSprite(400,200)
 
  jail.scale=0.3
  var number=Math.round(random(1,3))
  if(number===1){
    jail.addImage(jail1)
  }
  if(number===2){
    jail.addImage(jail2)
  }
  if(number===3){
    jail.addImage(jail3)
  }
  jailgroup.add(jail)

}