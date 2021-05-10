
var dog, happyDog, sadDog, database, foodS, foodStock;
var feedPet , addFood;
var fedTime , lastFed , foodObj;

function preload()
{
	sadDog = loadImage("images/dogImg.png")
	happyDog = loadImage("images/dogImg1.png")

}

function setup() {
	createCanvas(500, 500);
  database = firebase.database();

foodObj = new Food();

  foodStock = database.ref("food");
  foodStock.on("value",(data)=>{

    foodS = data.val();
    foodObj.updateFoodStock(foodS);
  })

  feedPet = createButton("feed Pet");
  feedPet.position(700 , 80)

  feedPet.mousePressed(feedDog);

  addFood = createButton("Add Food");
  addFood.position(770 , 80)

  addFood.mousePressed(addFoods);

  dog = createSprite(width/2+80 , height/2-70 , 10 ,10);
  dog.addImage(sadDog);
  dog.scale = 0.19

  
}


function draw() {
  background("green");


foodObj.display();

fedTime = database.ref("FeedTime");
fedTime.on("value" , function(data){
  lastFed = data.val();
})

textSize(20);
fill("white");

if(lastFed>=12){

text("last Feed : " + lastFed%12 + " PM" , width/2-40 , 20);
}else if(lastFed== 0){

  text("last Feed : " + lastFed + " AM" , width/2-40  , 20)
}else{

  text("last Feed : " + lastFed + " AM" , width/2-40  , 20)
}


  drawSprites();
}
function addFoods(){

  foodS ++
  database.ref("/").update({food:foodS});
}
function feedDog(){

  dog.addImage(happyDog);

if(foodObj.getFoodStock()<=0){
  foodObj.updateFoodStock(foodObj.getFoodStock()*0);

}else{
  foodObj.updateFoodStock(foodObj.getFoodStock()-1);

}

  database.ref("/").update({

    food:foodObj.getFoodStock(),
    FeedTime:hour()
  });


}

