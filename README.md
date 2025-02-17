<img width="676" alt="image" src="https://github.com/user-attachments/assets/f98a6be0-0b41-49fe-a68c-f06ab7e58e75" /># studio-project
## Studio Project Log
This is where I will be recording my progress/ experiments for my studio project

## Log 1
Log 1 is an account of how I began writing my cord, please look to later logs for detailed explanations of actual functionality.

### Projecxt theme +  Research
After looking over some different artists and written material provided in the reading list I have decided on the theme of interactivity to centre my work around.

**Project Theme: Interactivity**

After looking over some readings I decided on Interactivity as my project theme.
I chose this theme because I think user interaction/ contribution is a unique quality of web - based art that I wanted to explore.
Most things on the internet are assumed to be tools designed for servicing the user (e.g. social media, games, search engines), while artworks are usually thought of as objects/ instances created by an individual artist to serve an individual vision.

User interactivity is something I tried to incorporate into many of my workshop tasks, I always felt that because they are presented as websites they should fulfil the expectation of a website.
For example, with my workshop 7 simulation task I added a feature where the user was able to stop parts of the simulation by clicking the screen. 
I didn’t plan on doing this but I was compelled to add this feature because of the fact that it was a website.

An artwork that comes to mind is Olia Lialinas ‘My boyfriend came back from the war’

### Generating ideas ###
<img src="https://github.com/user-attachments/assets/3038f595-5982-4706-b7ae-b60bb4f6996b" width="300" />

My initial idea for my project was to create a simulated environment with many different objects, each having their own schedules and behaviours, which the user would be able to interact with.

I was thinking about virtual aquarium mobile games.

From that idea I decided that I wanted to base my project around the idea of a virtual pet game.

<img src="https://github.com/user-attachments/assets/2857eeab-04a9-4709-86d1-2bdd9003d774" width="300" />

I had a few different ideas for different direction I could take this:

- Game where user is able to press buttons with no response
- Hidden pet simulator: the pet will react to user inputs but it is hidden by a black box
- Annoying pet simulator: random function is called whenever the user presses a button

<img src="https://github.com/user-attachments/assets/95bf11bd-8776-4e8a-970a-02d199e4bf8e" width="300" />

From these sketches I decided to just start writing a simple pet simulator and to incorporate more ideas along the line.

### Plan:
- Start writing a pet simulator
- Pet object with functions
  - functions will be called by user pressing buttons

### Coding 
- I began coding my pet simulator
- I wanted to make it object centric, so I wrote a pet() class, within this class in a constructor and several functions which can be called by clicking buttons
- Basic structure of my code below, within the constructors are different variables which will dictate the reactions of the pet.
```
class pet{
  constructor(){
 this.hunger = 1;
    this.health = 10;
    this.exhausted = false;
    this.showtext = false;
    this.displaytext = '';
    }
  play(){
     ...
    }
   ...}
}
```

### Functions

**play()**
  - function called when user presses 'play' button
```
  playbutton.mouseClicked(()=>{
    mypet.play();
  })
  ...
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

```
- function randomly generates number between 1 - 10
  - for the sake of being able to follow what is happening with my website easily I added different text displays for different 'reactions'
  - for every number other than 4 the pets health score will increase
    
    <img width="290" alt="play1" src="https://github.com/user-attachments/assets/a9ff6b50-16c9-46c3-af41-ed7197d0320c" />

  - the number 4 will cause the pet to tire itself out and deduce 5 health points from the pet
 
    <img width="328" alt="play2" src="https://github.com/user-attachments/assets/cac90f43-d42b-4ba0-a4a2-c8361917bf40" />

- if the pets health decreases to below 0, this will call the exhaustion() function
```
  exhaustion(){
    textSize(15);
    this.showtext = true;
    this.displaytext = "your pet is exhausted,\nplease let it rest";
  }

```
- The intention with this function is to extend it further, but for now it is just a text display

  <img width="320" alt="play3" src="https://github.com/user-attachments/assets/a4ab8907-3236-4d0b-8e56-c1a6e91747d6" />

**feed()**
- similar to the play() function the feed function is called when the 'feed' button is pressed, it reacts to the this.hunger value which was declared in the contructor
- this function will be extended further

  <img width="450" alt="fed" src="https://github.com/user-attachments/assets/5c42da0e-ee6d-4540-aa64-5c857b9e2823" />

  ### Next steps:
  - extend pet object functions
  - add tricks function?
 
# Log 2:
During this session I was still focused on building upon and editing the core functions of my code.
So far my project does not look very visually interesting and does not really look like a game at all but that is something I wanted to begin working on after I felt confident that my code was working well.

Continuing from last time I:
- finished feed() function
- added an overfed() function
- added health and hunger regeneration
- added tricks() function, which user can interact with via a Select menu
- added can_run() function to check if pet is able to perform tricks
- different responses to tricks
- added an end() function, and strike system to end game 

### feed() Function:
I have modified the value name in the pet() classes constructor from hunger to fullness to better express what the value represents.
Currently the feed function has 5 different responses:

**1) calling end() function**
I added an if statement in the beginning to check the number of strikes, if the user has accrued 3 strikes the end() function is called:
```
  feed(){

    //adding call to end() if 3 stikes reached

    if(this.strikes > 2){
      this.end();
      return;
    }

```
Currently I have a text response which looked like this:

<img width="337" alt="feedtaken" src="https://github.com/user-attachments/assets/59a3cf6a-709a-4b2d-a83e-c6a13ceafcd2" />

I have also added a call to the end() function within the play() function for safety.

```
 play(){
    let rand_int = floor(random(1, 11));

    // 3 strikes and out
    if(this.strikes > 2){
      this.end();
      return;
    }
```

**2) pet is hungry**
if your pets fullness value reaches 0 or below:

```
    if(this.fullness <= 0){
      this.showtext = true;
      this.displaytext = "your pet is starving, please feed it."
    }
```

The user will be warned, and a strike is added:

<img width="329" alt="feedhungry" src="https://github.com/user-attachments/assets/2ed7b993-9bb2-4315-9c3f-f2b444fcabb1" />

The pets fullness level decreases by using my newly added [hunger_regen()](#hunger-and-health-regeneration-functions) function.

**3) fullness below 5**
If the pets fullness level is between 1 and 5, the user will recieve a postive reactive:

```
   if(this.fullness < 5){
    this.fullness += 1;
    this.showtext = true;
    this.displaytext = 'your pet has enjoyed eating.';
   }

```

<img width="332" alt="feed1" src="https://github.com/user-attachments/assets/4b4d5766-e0f7-4c08-ac7b-f9188722563f" />

**4) fullness between 5 and 10**
if the pets fullness is above 5 and below 10 the user will be warned that they should stop feeding the pet:
```
   else{
    if(this.fullness < 10){
      this.fullness += 1;
      this.showtext = true;
      this.displaytext = 'your pet is getting too full.';
    }

```
<img width="310" alt="feed2" src="https://github.com/user-attachments/assets/93390ff9-580b-4b17-82c3-f9c3bbc7e33b" />

**5) pet is overfed**
when the pets fullness reaches 10 the [overfed()](##overfed-Function) function is called
```
    else{
      this.overfed();
    }
   }
```
   
<img width="350" alt="feed4" src="https://github.com/user-attachments/assets/12b42d7d-6608-4101-8615-fd0ad1a9cdf6" />

The user recieved a negative reaction and accrues a strike

**6) setTimeout() for text
I added a setTimout function which interacts with the pet objects showtext value (initialized to true).
```
    setTimeout(() => {
      this.showtext = false; 
    }, 5000);
  }

```
This value is checked within the draw() function to display text, as you can see above I have set a 5 second limit for text to be displayed, after this time has passed the showtext value toggles to false and the text is cleared.
This piece of code has also been added to my play() function.

## Hunger and Health regeneration functions:
These are two functions I have added to my pet() class, they are constantly being checked within the object constructor:
```
class pet{
  constructor(){
...
    //calling auto health regeneration and fullness degeneration functions
    this.health_regen();
    this.hunger_regen();
...   
}
```
Having calls to these functions within the constructor allows the website to constantly update these functions, meaning the pets health and hunger level will be affected by the passing of time, and not playing with/ feeding your pet can have different consequences

### health_regen()**
This function allows the health value to regenerate over time
```
  health_regen(){
    setInterval(() =>{
      if(this.health < 5){
        this.health += 1;
      }
    }, 3000)
  }
```

### hunger_regen()**
This function subtracts from the fullness value over time, meaning that the player must consistently feed their pet in order to avoid strikes
```
  hunger_regen(){
    setInterval(() => {
      if(this.fullness > 0){
        this.fullness -= 1;
      }
    }, 8000)
  }
```

## overfed() Function:
The overfed function hides the feed button for a period of time when called, it also adds a strike
```
  overfed(){
    textSize(15);
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
```

## perform_tricks(str) function:
This is a new function I have added, it is called whenever the user selects a value from a Select menu I have added.

<img width="358" alt="selectmenu" src="https://github.com/user-attachments/assets/a12242f7-5a66-43f0-a4de-ed71972b90a2" />

The 5 trick options are stored in an array, I also have a corresponding array below which stores the text that is displayed when the different options are selected.
```
//set up inside setup() function, initialized globally
//array of tricks
  trick_array = ['sit', 'shake', 'bark', 'roll', 'fetch'];
  //array of responses to tricks;
  trick_response = ['your pet sat down.', 'your pet shook your hand.', 'your pet barked', 'your pet rolled', 'your pet fetched the ball.', 'your pet lost the ball.'];
 for(let x = 0; x< trick_array.length; x++){
    select_trick.option(trick_array[x]);}
```

Using a .changed function I call the perform_tricks(str)  function using the selected trick
```
select_trick.changed(() => {
      let selectedTrick = select_trick.value(str);
      mypet.perform_trick(selectedTrick);
    });  
```

Within the perform_tricks function: 
- the function begins with a check that we have not recieved 3 strikes yet.
- each case other than 'fetch' will simply assign a string variable to the displaytext varible of the pet object,

```
   perform_trick(mytrick){
   this.showtext = true;
    if(this.strikes >= 3){
      this.displaytext += "your pet cannot perform tricks anymore.";
    }

    switch (mytrick){
      case 'sit':
      this.displaytext = trick_response[0];
      break;
  
      case 'shake':
        this.displaytext = trick_response[1];
        break;
        
       ...
        
     case 'fetch':
      this.displaytext = this.fetch();
      break;
          
    }
   }
```
- In the case of 'fetch' a function called [fetch()](###fetch-Function) is called.

### fetch() Function:
This function generates a random number from 0 to 3 (0, 1, or 2), then depending on the %2 value it will return either the 5th or 6th item in the response array.

```
fetch(){
    let rand_int = floor(random(0, 4));
    if(rand_int%2 === 0){
      return trick_response[4];
    }
    return trick_response[5];

  }
```

There is 1/3 chance that the ball will be 'lost'.
**response 1:**
ball is fetched:

<img width="284" alt="ballfetch" src="https://github.com/user-attachments/assets/19e5c572-52af-4ccb-8793-57be13bd2bda" />

**response 2**
ball is lost:

<img width="307" alt="balllost" src="https://github.com/user-attachments/assets/c483e2c1-faa6-4009-a287-6eac02774be3" />

## Going forward:
Now that I am decently happy with the level of functionality my pet game has I want to focus on developing it visually

- polish my functions
- develop visually
- decide what direction I want the artwork to go in.

# Log 3:

After some thinking I was able to decided on what I wanted my end product to look like.
I guess this is a development of my 'annoying pet simulator idea'.

I wanted to incorporate a few different aspects of the different pet game ideas I had come up with in the beginning.
After some reflection on Olia Lialinas piece - My boyfriend came back from the war (which I wrote about for my contextual research) I decided that I wanted my artwork to also be an interactive but linear story with a clear end point.
I really like the linearity of Lialinas artwork and the futility of user interaction, while this aspect of her work can be seen as a result of the internets newness I personally was struck by the level of agency I was given vs the level of agency I have come to assume I had, especially as I immediately assosiated the illustrative design + frames of her website with video games. 


## My plan for the website:
Here is my (mostly) concrete plan for my final project: 

- User begins in a pet simulator game where the pet is hidden
- The pets health and fullness decrease quickly making it difficult for the user to keep the pet well
  - The pets responses to the user input are hostile
- The 'game' is visually plain, it does not give the user clear instructions, and the user is not rewarded for their input
  - Because there are no instructions I am assuming it will be very easy for the user to accrue strikes, calling the end() function
- When the end function is called the pet will escape into a colourful background
  - The user must try to catch the pet but will not be able to succeed

## What I did:
- [Added a  simple sprite sheet animation](##Sprite-Sheet)
- [Created an animated background](##Background)
- [Added a black box to my pet game](##Black-box)

## Sprite Sheet
At this point I knew I wanted to add a sprite animation of some sort so I decided to just try it out and learn how it could be implemented so I could use it later.
I used this -> (https://www.youtube.com/watch?v=eE65ody9MdI) youtube tutorial.

<img width="500" alt="spritetutorial" src="https://github.com/user-attachments/assets/9199bf07-0582-460f-8649-ef3f59f8f585" />

I wanted to do exactly what was shown in the tutorial so I began with making my sprite sheet using a program called **aesprite** which I had on steam already.
What I did was use a 100 by 100 pixel canvas, draw three different frames (layers) and then export it as a png sprite sheet with the layers separated.
Below is the aesprite environment (left) and the sprite sheet (right).

<img width="300" alt="aesprite" src="https://github.com/user-attachments/assets/ecd144f1-e0ca-4ca4-9c17-472a759d25c1" />
<img width="400" alt="aesprite" src="https://github.com/user-attachments/assets/7ceb185e-d854-48c7-aa9d-e9faab1cb193" />

The animation was successful, and here is what it looked like in vscode:

<img width="541" alt="testingsheetwalk" src="https://github.com/user-attachments/assets/9c269fe1-0e09-44ce-8652-2fd5082516b8" />

## Background
After the sprite sheet I moved on to creating an animated background for when my pet 'escapes', I wanted it the animation to look like my live camera feed workshop drawing with transparent coloured shapes generating at random coordinates into a soft picture.

<img width="233" alt="livevid" src="https://github.com/user-attachments/assets/62eb8146-7b52-415e-bc08-0319a2ec6be6" />

The picture I wanted drawn was a blue sky and field to conrast the very plain, sterile 'game'environment.

### Background code
I knew that I wanted the colours blue, green, and white for my drawing.
To find the RGB value bounds I would use I used a colour wheel/picker and recorded it in a note book.

I created a class object called bg, 

```
class bg{
  constructor(){
    this.width = windowWidth;
    this.height = windowHeight;}

```

It has a default constructor with the variables this.width and this.height.

within the bg class I wrote the create_bg() function.

```
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

```

this.boundary uses the classes height variable as a reference to find where I want the division between the sky (blue) and ground (green) to be.
the function also contains the maximum and minumum rgb values for those colours.

Within the for-loop below 2 sets of random x  + y coordinates and sizes are generated each iteration, I have set the numer of iterations to 50 which I believe means that frame draws 50 circles.

```
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

      
   } }
  ```
every iteration also generates random rgb values within the scope given for each ellipse.
When called within the drawing function, this is the picture generated:

<img width="300" alt="nolight" src="https://github.com/user-attachments/assets/cbafb7cf-72f7-45da-a771-49e87a85f85c" />

I also thought about adding clouds to my background but while experimenting I got this result:

<img width="541" alt="trial" src="https://github.com/user-attachments/assets/34a76448-2a54-439a-9054-73253aa39c02" />

I thought the speckles of white light looked very nice and decided to write my function around that

```
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
```

As you can see a have a much smaller amount of light ellipses drawn (between 1, 6 range) every frame but the logic is the same as my create_bg() function.

This is what my compelted background drawing looks like when both the create_bg() and create_light() function are called inside draw():

<img width="500" alt="finalbg" src="https://github.com/user-attachments/assets/19042619-1d37-4c26-98cd-3950d5bf7d0d" />

## Black box
Returning to my pet game I wrote a function called draw_box() within the pet class.

```
  draw_box(){
    if(this.drawbox){
    let size = windowWidth/4;
    fill('black');
    rect(windowWidth/4, ypos, size, size);}
  }

```

This function is called within the main draw() function with the rectangle being drawn depending on a variable called drawbox.
the drawbox variable is a boolean variable instatiated within the pet classes contructor, it is set to true as default but turns false when the end() function is called.

This is what my pet game currently looks like:

<img width="300" alt="blackbox" src="https://github.com/user-attachments/assets/d6871280-f382-4ea9-aa44-0e673dddb1b1" />


## Further plans:

- Incorporate my sprite animation and bg code into my pet game code
- trigger different events (pet game, background, end, etc.)
- Add audio

# Log 4
I assembled all the 'pieces' of the website I have made so far, I also added some extra bits and made new a new sprite animation.

## Contents
[end() function](##end-function)
[background drawing and pet chase](##Background-drawing-and-pet-chase)

## Background drawing and pet chase
For the pet chase I mentioned in the last log I added my bg class code that I wrote last log into my pet game file.

To make it work I:
- created a global mybg varible which is a bg class object
- added a global boolean variable drawbg set to false
  - When the [end](##end-function) function is called drawbg is set to true
- within my main draw() function I check the state of drawbg by using an if - else statement

While drawbg is false the pet game is 'on', below you can see that I have a white background refreshing and my pet display text.
 ```
if(!drawbg){
background("white");
if(mypet.showtext){
  
  textSize(windowWidth/50);
  fill("grey");
  text(mypet.displaytext, windowWidth/4, windowHeight/6 + (windowWidth/50 * 2) );
  textSize(windowWidth/45);
}
}
```

When it is set to false: the background is removed, instead I have set a frameRate of 20, my bg objects [create_light() and create_bg()](##Background-code) functions are called 20 times a seconds, resulting in an animated, constantly drawing background.

```
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
  catchpet.text_instr_clear();}

```
The code for my bg class is copied and pasted from last logs experiment.

### Pet chase
For my pet chase sequence I wrote a new class called catch_pet_game

It has one default constructor:
it initialises many default variables that will be referenced in functions and creates a petsprite object called this.pet

```
class catch_pet_game{

  constructor(){
//flag to show text and flag to trigger game to start
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
```
When this function is called it will display text temporarily, then it will clear the text and set the draw_sprite variable to true.

(image below)

<img width="300" alt="image" src="https://github.com/user-attachments/assets/204c78de-f6c9-4f31-b39e-21558835c41c" />

(code below)
```
  //instructions to user
  text_instr_clear(){
    setTimeout(()=>{this.mytext = '';
    //draw_pet  flag
    this.draw_sprite = true;
    }, 5000);  
    
  }

```
The mousepressed function inside of the class sets the show_text variable to true, so once the user gets to this screen it the text is guaranteed to show.

```
  mousePressed(){
    this.show_text = true;
    //pet catch game functionality
```
It checks if the draw_sprite variable is true, if it is, it will move the x and y coordinates of the petsprite object, drawing it in a different aprt of the screen every time.
Every time the draw_sprite value is true, it will add 1 to the class sprite_clicked variable, then it will check whether or not the user has clicked within the set boundary of the sprite using the d value.
If the distance is within a certain area around the frame width of the sprite, it will generate new x and y coordinates and draw the sprite in a new location.

```
    //adding to sprite clicked count if it has been drawn once already
    if(this.draw_sprite){
      this.sprite_clicked += 1;
    
    
  let frameWidth = sheet.height; 
  let frameHeight = sheet.height; 

  //mouse dist from sprite
  let d = dist(mouseX, mouseY, this.petx + frameWidth / 2, this.pety + frameHeight / 2); 


  //making target area larger
  let target_area = 1.3

  // if sprite clicked
  if (d < (frameWidth * target_area)) {

    this.petx = random(10, windowWidth - 10);
    this.pety = random(10, windowHeight - 10);

    if(this.petx != windowWidth/4 +frameWidth * target_area && this.pety != windowHeight/5  +frameHeight){
    //update pos
    this.pet.x = this.petx;
    this.pet.y = this.pety;
    
   
   }
    else{
      this.petx = random(10, windowWidth - 10);
    this.pety = random(10, windowHeight - 10);
    }
  }}}
```
As you can see I left the area around a certain point empty, generating the coordinates again if I got those values, this is because I added a countdown text in that area that I will get to in a bit.

The petsprite inner class takes the sprite sheet, x, and y, as coordinates.
I added it's own draw() function so it wouldn't have to rely on the background refreshing (?) to update.
Every frame the visible area of the sprite sheet is changed until the end it reached, then it resets to 0, looping the animation.

```
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
```

Here I wrote a function to check how many times the sprite has been clicked, if the sprite has been clicked 10 times then it will return false.

```
//function to check how many times pet has been pressed 
sprite_clicked_limit(){
  //when countdown is done play song3
  return this.sprite_clicked <= 10;
}
```

This is important as the main draw() function is calling clear_sprite(), and calling the catch_pet_game class objects (which I have called catchpet) draw() function depending on the value.

```
catchpet.clear_sprite();
if(catchpet.draw_sprite){
  catchpet.pet.draw();
  fill('black');
  text(`${10 - catchpet.sprite_clicked}`,windowWidth/4, windowHeight/5);
  
}
```

The clear_sprite() function will set the draw_sprite variable to false, meaning no more petsprites will be drawn, then it will stop the 2nd song from playing, as the catching pet segment is over.
It then applies a grey filter over the entire canvas, then after one second starts playing the 3rd (last) song and calls the goodbye_screen() function.

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

The goodbye_screen function adds some text to the screen, and initialises a GoodbyeSprite() class object called deadsprite.
It then sets a global variable called draw_deadpet to true.

```
//my dea pet sprite global
let deadsprite;

function goodbye_screen() {
  text('Your pet ran away forever...\nit did not like you very much...', windowWidth / 2, windowHeight / 2);
  deadsprite = new GoodbyeSprite(dead_pet, windowWidth/2, windowHeight/6);
  draw_deadpet = true;
  
}
```



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

## end function
Up until log 4 end() has been a simple function that hides my buttons / selection and displays some text:
It is a function of the pet class.

```
end(){
    playbutton.hide();
    feedbutton.hide();
    select_trick.hide();
    this.showtext = true;
    this.displaytext = "your pet has been taken.";
  }
```

During my assembling of all the different elements I have made end() has been expanded quite a bit:

```
 end(){
    song1.stop();
    playbutton.hide();
    feedbutton.hide();
    select_trick.hide();


    this.drawbox = false;

    //clearing display text
    this.showtext = true;
    this.displaytext = 'you have accrued 3 strikes,\nyour pet ran away.';

    setTimeout(()=>{
      drawbg = true
      this.clear_text();
      
      
    }, 3500);}

```

When the function is called it sets a string to the display text letting the user know that they have 'lost' the game.

The setTimeout() function calls the clear_text() function after 3.5 seconds, and sets the drawbg varibale to true, triggering the next part of the story.

The clear_text() function is just a simple function within my pet calss object to make sure the display text is completely clear, I made it because I kept having problems with the text reappearing randomly, it is only called once just to be safe.

```
   clear_text(){
    //making sure that there is no text by leaving blank
    this.displaytext = "";
    this.showtext = false;
    
   }
```

It also changes the drawbox variable to false, clearing the black box.

**Essentially calling the end function clears the canvas of the elements used for my 'pet game'**
   
