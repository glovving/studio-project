# studio-project
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



  


    

