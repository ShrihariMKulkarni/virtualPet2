class Food{

constructor(){


this.foodStock;
this.lastFed;
this.img = loadImage("images/Milk.png")

}

updateFoodStock(foodStock){

    this.foodStock = foodStock;
}

getFoodStock(){

    return this.foodStock;
}

deductFood(){

    if(this.foodStock<0){
this.foodStock -= 1;

    }
}

display(){
var x = 80 , y = 100;

    if(this.foodStock!== null){

        for(var i = 0; i<this.foodStock;i++){

            if(i % 10 === 0){

                x = 80;
                y += 50;

            }

            image(this.img , x , y , 50 , 50);
            x += 30;
        }


    }
}
}