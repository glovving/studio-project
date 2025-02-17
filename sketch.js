//globally declaring buttons
let feedbutton, playbutton, testbutton, okaybutton;

//my pet
let mypet;

//adding tricks selection
let select_trick, trick_array, trick_response;

//xpos and ypos
let xpos, ypos;

//testing sprite sheet
let sheet;

//adding bg object
let mybg;

//bg() drawing flag
let drawbg;

//my catching pet game
let catchpet;

//into screen flag
let intro_flag;

//end screen sprite sheet
let dead_pet;
let draw_deadpet = false;
let mydead_pet;

//adding audio
let song1, song2, song3;

function preload(){
  //loading sprite sheet
  sheet = loadImage("vis/newpetsprite.png");
  dead_pet = loadImage("vis/deadpet.png");

  //loading songs
  song1 = loadSound("Songs/glitchy_out.ogg");
  song2 = loadSound("Songs/Water_level_out.ogg");
  song3 = loadSound("Songs/water3_out.ogg");

  
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  //creating my pet
  mypet = new pet();

  //buttons
  xpos = windowWidth - windowWidth/3;
  ypos = windowHeight/4;
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

  //adding button for testing
  testbutton = createButton('test');
  testbutton.position(xpos, ypos + (feedbutton.height * 2) + (playbutton.height * 4));
  testbutton.mouseClicked(()=>{
    mypet.strikes += 3;
    
  })

  //adding trick selection
  select_trick = createSelect();
  
  select_trick.position(xpos, ypos + (feedbutton.height * 2) + (playbutton.height * 3));

  //array of tricks
  trick_array = ['sit', 'shake', 'bark', 'roll', 'fetch'];
  //array of responses to tricks;
  trick_response = ['your pet does not want to sit down.', 'your pet does not want to shake your hand.', 'your pet stays silent.', 'your pet does not want to roll.', 'your pet reluctantly fetched the ball.', 'your pet lost the ball.'];

  
  for(let x = 0; x< trick_array.length; x++){
    select_trick.option(trick_array[x]);}

  select_trick.changed(() => {
      let selectedTrick = select_trick.value();
      mypet.perform_trick(selectedTrick);
    });  

   //okay button to start game
   okaybutton = createButton("okay");
   okaybutton.position(windowWidth/4, windowHeight/2.5);
   okaybutton.mouseClicked(()=>{
    intro_flag = false;
   })

  //hiding my buttons and select
  feedbutton.hide();
  playbutton.hide();
  select_trick.hide();  
 testbutton.hide();

  //setting up mybg
  mybg = new bg();
  drawbg = false;

  //setting up my catch pet game
  catchpet = new catch_pet_game();

  //intro screen flag
  intro_flag = true;

  //my dead pet
  mydead_pet = new GoodbyeSprite(dead_pet, windowWidth/2, windowHeight/4);


}


function draw() {

textSize(windowWidth/45);

//im just going to use a giant if else im sorry
if(intro_flag){
  intro();
}else{
if(!song1.isPlaying()){
  song1.setVolume(0.07);
  song1.loop();
}
  //hiding okay button
  okaybutton.hide();  

//showing my button
feedbutton.show();
playbutton.show();
select_trick.show(); 


if(!drawbg){
background("white");
if(mypet.showtext){
  
  textSize(windowWidth/50)/
  fill("grey");
  text(mypet.displaytext, windowWidth/4, windowHeight/5);
  textSize(windowWidth/45);
}
}
else{
  frameRate(20);

  //play song2 when bg is drawn
  if(!song2.isPlaying()){
    song2.setVolume(0.05);
    song2.loop();
  }


  mybg.create_light();
  mybg.create_bg();
  fill('black');
  text(catchpet.mytext, windowWidth/4, windowHeight/5);
  catchpet.text_instr_clear();

  
  
}
if(!mypet.can_run()){
  mypet.end();
  setTimeout(()=>{
    mypet.displaytext = "";
  }, 3000);
  
}
else{
  //playing song1 for black box segment
  

  //pet status text moved into else so it updates with interaction
 //checking pet hunger level
  mypet.check_hunger();
  mypet.draw_box();
  
  //moved trick text into coditional
  text('tricks:', xpos, ypos + (feedbutton.height * 2) + (playbutton.height * 2.5)); 
  text(`Energy: ${mypet.energy} Fullness: ${mypet.fullness} Strikes: ${mypet.strikes}`, windowWidth/4, windowHeight/6);
}

//checking if sprite is to be drawn
catchpet.clear_sprite();
if(catchpet.draw_sprite){
  catchpet.pet.draw();
  fill('black');
  text(`${10 - catchpet.sprite_clicked}`,windowWidth/4, windowHeight/5);
  
}

if(draw_deadpet){
  mydead_pet.draw();
}
}




}

function windowResized(){
  resizeCanvas(windowWidth, windowHeight);
}

class pet{
  constructor(){
    //hunger changed to fullness for accuracy
    this.fullness = 4;
    this.energy = 4;
    //tired and exhausted states 
    this.tired = false;
    this.exhausted = false;
    
    // text variables 
    this.showtext = false;
    this.displaytext = '';

    //strikes until pet is taken
    this.strikes = 0;

    //calling auto health regeneration and fullness degeneration functions
    this.energy_regen();
    this.hunger_regen();

    //calling hunger check
    this.check_hunger();

    //strike for every ... seconds spent starving 
    this.starving_strike = 0;

    //checking can_run()
    this.can_run();

    //drawing box check
    this.drawbox = true;

    //end text message
    this.endtext_show = false;


}
  
  //test to see if button was being pressed 
  testing(){
    background(0, 255, 0);
  }


  //play function to increase (or decrease) pets health
  play(){
    let rand_int = floor(random(0, 4));

    // 3 strikes and out

    if (!this.exhausted){
      if(rand_int%3 === 0){ /// changed tired value to be multiples of 3
        
        this.showtext = true;
        this.displaytext = 'too much play has tired your pet out';
        this.energy -= 3;
      }
      else{
        
        this.showtext = true;
        
        if(this.health < 5){
        this.displaytext = 'your pet played reluctantly.';
        this.energy += 1;}
        // health starts decreasing at max valuye
        else{
          this.displaytext = 'you have played with your pet.';
          this.energy -= 1;
        }
      }}

    //if health goes below 0, the pet becomes exhausted
    if(this.energy < 0){
      this.exhausted = true;
      this.exhaustion();
    }

    setTimeout(() => {
      this.showtext = false; 
    }, 2500);
  
  }

  // exhaustion function, more to be added
  exhaustion(){
    
    this.showtext = true;
    this.displaytext = "your pet is exhausted,\nplease let it rest";
    
    //hiding play button, the showing again after  time out period
    playbutton.hide();
    setTimeout(() => {
      playbutton.show();
      this.exhausted = false;
    }, 4000);

    // adding a strike 
    this.strikes += 1;
  }

  //auto health regeneration
  energy_regen(){
    setInterval(() =>{
      if(this.energy < 5){
        this.energy += 1;
      }
    }, 3000)
  }

  hunger_regen(){
    setInterval(() => {
      if(this.fullness > 0){
        this.fullness -= 1;
      }
    }, 3000)
  }

  //when pet is taken 
  end(){
    song1.stop();
    playbutton.hide();
    feedbutton.hide();
    select_trick.hide();

    //showing text temporarily
    this.endtext_show = true

    this.drawbox = false;

    //clearing display text
    this.showtext = true;
    this.displaytext = 'you have accrued 3 strikes,\nyour pet ran away.';

    setTimeout(()=>{
      drawbg = true
      this.clear_text();
      
      
    }, 3500);}

   //making separate function to finally clear all text
   clear_text(){
    //making sure that there is no text by leaving blank
    this.displaytext = "";
    this.showtext = false;
    
   } 
   
    
  
  feed(){

    //adding call to end() if 3 stikes reached


    if(this.fullness <= 0){
      this.showtext = true;
      this.displaytext = "your pet is starving, please feed it."
    }

   if(this.fullness < 5){
    this.fullness += 1;
    this.showtext = true;
    this.displaytext = 'your pet ate reluctantly..';
   }
   else{
    if(this.fullness < 7){
      this.fullness += 1;
      this.showtext = true;
      this.displaytext = 'your pet is getting too full.';
    }
    else{
      this.overfed();
    }
   }
 

    setTimeout(() => {
      this.showtext = false; 
    }, 5000);
  }
  //overfed function more to be added 
  overfed(){
    
    this.showtext = true;
    this.displaytext = "your pet is sick due to over eating.";

    // adding strikes
    this.strikes += 1;

    // feed button in time out
    feedbutton.hide()
    setTimeout(() => {
      feedbutton.show();
    }, 4000);

  }

  check_hunger(){
    if(this.fullness <=0){
      this.showtext = true;
      this.displaytext = "your pet is starving, please feed it.";

    }

    if(this.starving_strike <= 0 && this.fullness <= 0){
      this.strikes += 1;
      this.starving_strike = 800000;
    }

    if(this.starving_strike > 0){
      this.starving_strike -= 1000;
    }

    }


  can_run(){
      if(this.strikes < 3){
        return true;
      }
      return false;

    }

   //perform trick function
   
   perform_trick(mytrick){
  
    this.showtext = true;

    switch (mytrick){
      case 'sit':
      this.displaytext = trick_response[0];
      break;
  
      case 'shake':
        this.displaytext = trick_response[1];
        break;

      case 'bark':
        this.displaytext = trick_response[2];
        break;
        
      case 'roll':
        this.displaytext = trick_response[3];
        break;
        
     case 'fetch':
      this.displaytext = this.fetch();
      break;
          
    }
   }
   
   //fetch function
   fetch(){
    let rand_int = floor(random(0, 4));
    if(rand_int%2 === 0){
      return trick_response[4];
    }
    else{
    return trick_response[5];}

  }

  //adding draw box function
  draw_box(){
    if(this.drawbox){
    let size = windowWidth/4;
    fill('black');
    rect(windowWidth/4, ypos, size, size);}
  }
  


}



class bg{
  constructor(){
    this.width = windowWidth;
    this.height = windowHeight;


    
  }

  create_light(){
    //amount of clouds
    this.light_count = random(1, 6);

    //rgb limits
    this.max_r = 250;
    this.max_g = 250;
    this.max_b = 250;
    this.min_r = 200;
    this.min_g = 200;
    this.min_b = 200;


    for(let x = 0; x< this.light_count; x++){
      let r_x = random(0, windowWidth);
      let r_y = random(0, windowHeight);
      let r_size = random(5, 20);
   
      noStroke();
      fill(random(this.min_r, this.max_r), random(this.min_g, this.max_g), random(this.min_b, this.max_b), 80);
      ellipse(r_x, r_y, r_size, r_size);

      }

    }

  
  create_bg(){
    this.boundary = this.height - this.height/3;

    //max and min rgb vals
    this.max_r = 150;
    this.max_g = 223;
    this.max_b = 249;
    this.min_r = 41;
    this.min_g = 126;
    this.min_b = 199;

    //values for green circles
    this.start = this.height - this.height/3;
    //max and min green rgb values
    this.max_r2 = 211;
    this.max_g2 = 255;
    this.max_b2 = 51;
    this.min_r2 = 9;
    this.min_g2 = 89;
    this.min_b2 = 26;


    //creating each blue ellipse
    for(let x = 0; x< 50; x++){
      //coordinates
      let r_x = random(0, windowWidth);
      let r_y = random(0, this.boundary);
      let r_size = random(50, 150);

      //coords for green
      let r_x2 = random(0, windowWidth);
      let r_y2 = random(this.start, windowHeight);
      let r_size2 = random(10, 100);


      noStroke();
      
      fill(random(this.min_r, this.max_r), random(this.min_g, this.max_g), random(this.min_b, this.max_b), 40);
      ellipse(r_x, r_y, r_size, r_size);

      //green drawing 
      noStroke();
      fill(random(this.min_r2, this.max_r2), random(this.min_g2, this.max_g2), random(this.min_b2, this.max_b2), 40);
      ellipse(r_x2, r_y2, r_size2, r_size2);

      
   }

  
  }

  
}

//writing post pet game game

class catch_pet_game{

  constructor(){
    this.show_text = false;
    this.game_triggered = false;
    this.mytext = "your pet can't survive in the wild!\nyou better catch it..";

    
    //pet sprite drawing vars
    this.petx = random(10, windowWidth-10);
    this.pety = random(10, windowHeight-10);
    this.pet = new this.petsprite(sheet, this.petx, this.pety);
    this.petWidth = sheet.height * 2;  
    this.petHeight = sheet.height * 2;

    //flag for drawing pet sprite
    this.draw_sprite = false;

    //how many time sprite has been clicked
    this.sprite_clicked = 0;

    //checking how many times sprite has been clicked
    this.sprite_clicked_limit();
    

}

  //instructions to user
  text_instr_clear(){
    setTimeout(()=>{this.mytext = '';
    //draw_pet  flag
    this.draw_sprite = true;
    }, 5000);  
    
  }




  mousePressed(){
    this.show_text = true;
    //pet catch game functionality

    //adding to sprite clicked count if it has been drawn once already
    if(this.draw_sprite){
      this.sprite_clicked += 1;
    
    
  let frameWidth = sheet.height; 
  let frameHeight = sheet.height; 

  //mouse dist from sprite
  let d = dist(mouseX, mouseY, this.petx + frameWidth / 2, this.pety + frameHeight / 2); 


  //making target area larger
  let target_area = 1.3

  // if mouse click on sprite...
  if (d < (frameWidth * target_area)) {
    console.log("Pet caught!");

    this.petx = random(10, windowWidth - 10);
    this.pety = random(10, windowHeight - 10);

    if(this.petx != windowWidth/4 +frameWidth * target_area && this.pety != windowHeight/5  +frameHeight){
    //update pos..
    this.pet.x = this.petx;
    this.pet.y = this.pety;
    
   
   }
    else{
      this.petx = random(10, windowWidth - 10);
    this.pety = random(10, windowHeight - 10);
    }
  }}}

  //adding petsprite inner class 
  petsprite = class {
    constructor(sheet, x, y) {
      this.sheet = sheet;
      this.scale = 2;
      this.x = x;
      this.y = y;
      this.h = sheet.height;
      this.frame = 0;
      this.frames = sheet.width / sheet.height;
    }

    draw() {
      imageMode(CENTER);
      image(this.sheet, this.x, this.y, this.h * this.scale, this.h * this.scale, this.h * floor(this.frame), 0, this.h, this.h);
      this.frame += 0.07;
      if (this.frame > this.frames) {
        this.frame = 0;
      }
}}

//function to check how many times pet has been pressed 
sprite_clicked_limit(){
  //when countdown is done play song3
  return this.sprite_clicked <= 10;
}

//function for when click limit has been reached
clear_sprite(){
  if(!this.sprite_clicked_limit()){
    this.draw_sprite = false;
    song2.stop();
    filter(GRAY);
    textAlign(CENTER);
    setTimeout(()=>{
      if(!song3.isPlaying()){
        song3.setVolume(0.05);
        song3.loop();
      }
      goodbye_screen(dead_pet, windowWidth/2, windowHeight/6);
    }, 1000);
    
  }
}
}
//my dea pet sprite global
let deadsprite;

function goodbye_screen() {
  text('Your pet ran away forever...\nit did not like you very much...', windowWidth / 2, windowHeight / 2);
  deadsprite = new GoodbyeSprite(dead_pet, windowWidth/2, windowHeight/6);
  draw_deadpet = true;
  
}

//function intro screen
function intro(){
  text("you got a new pet today,\nit seems to be a bit scared of you...\nit's hiding under a black box...\nyou better convince it to like you...", windowWidth/4, windowHeight/5);
}

//deadpet sprite class
class GoodbyeSprite {
  constructor(sheet, x, y) {
    this.sheet = sheet;
    this.scale = 2;
    this.x = x;
    this.y = y;
    this.h = sheet.height;
    this.frame = 0;
    this.frames =  sheet.width / this.h;
  }

  draw() {
    imageMode(CENTER);
    image(this.sheet, this.x, this.y, this.h * this.scale, this.h * this.scale, this.h * floor(this.frame), 0, this.h, this.h);
    this.frame += 0.07;
    if (this.frame > this.frames) {
      this.frame = 0;
    }
  }
}


function mousePressed(){
  catchpet.mousePressed();
}

