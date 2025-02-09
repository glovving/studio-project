# studio-project
## Studio Project Log
This is where I will be recording my progress/ experiments for my studio project

## Log 1
Log 1 is an account of how I began writing my cord, please look to later logs for detailed explanations of actual functionality.
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
 
## Log 2:
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

The pets fullness level decreases by using my newly added [hunger_regen()](##hunger-regen-and-health-regen-Function) function.

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

## hunger_regen() and health_regen() Function:
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

**health_regen()**
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

**hunger_regen()**
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

## tricks() function


  


    

