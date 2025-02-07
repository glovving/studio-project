//globally declaring buttons
let feedbutton, playbutton;

//my pet
let mypet;

function setup() {
  createCanvas(windowWidth, windowHeight);

  //creating my pet
  mypet = new pet();

  //buttons
  let xpos = windowWidth - windowWidth/3;
  let ypos = windowHeight/4;
  feedbutton = createButton("feed");
  feedbutton.size(40, 20);
  feedbutton.position(xpos, ypos);

  feedbutton.mouseClicked(() =>{
    mypet.feed();
  })

  playbutton = createButton('play');
  playbutton.size(40, 20);
  playbutton.position(xpos, ypos + feedbutton.height * 2);

  playbutton.mouseClicked(()=>{
    mypet.play();
  })




}

function draw() {
 background(220);

 if(mypet.showtext){
text(mypet.displaytext, windowWidth/4, windowHeight/4);}

}

function windowResized(){
  resizeCanvas(windowWidth, windowHeight);
}

class pet{
  constructor(){
    this.hunger = 1;
    this.health = 10;
    this.exhausted = false;
    this.showtext = false;
    this.displaytext = '';
    
  }
  
  //test to see if button was being pressed 
  testing(){
    background(0, 255, 0);
  }

  //play function to increase (or decrease) pets health
  play(){
    let rand_int = floor(random(1, 11));
    if(rand_int === 4){
      textSize(15);
      this.showtext = true;
      this.displaytext = 'too much play has tired your pet out';
      this.health -= 5;
    }
    else{
      textSize(15);
      this.showtext = true;
      this.displaytext = 'your pet has enjoyed playing';
      this.health += 1;
    }

    //if health goes below 0, the pet becomes exhausted
    if(this.health < 0){
      this.exhaustion();
      this.exhausted = true;
      
    }
    setTimeout(() => {
      this.showtext = false; 
    }, 1500);
  
  }

  // exhaustion function, more to be added
  exhaustion(){
    textSize(15);
    this.showtext = true;
    this.displaytext = "your pet is exhausted,\nplease let it rest";
  }
  
  feed(){
    this.hunger += 1;
    if(this.hunger < 10){
      this.showtext = true;
      textSize(15);
      this.displaytext = 'your pet enjoyed its food';
    }
    if(this.hunger === 0){
      this.showtext = true;
      textSize(15);
      this.displaytext = 'your pet is full';
    }
    if(this.hunger < -3){
      overfed();
    }

    setTimeout(() => {
      this.showtext = false; 
    }, 1500);
  }
  //overfed function more to be added 
  overfed(){
    textSize(15);
    this.showtext = true;
    this.displaytext = "your pet has exploded due to over eating.";
  }
}


