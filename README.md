# studio-project
## Studio Project Log
This is where I will be recording my progress/ experiments for my studio project

## Log 1
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
- similar to the play() function the feed function reacts to the this.hunger value which was declared in the contructor
- this function will be extended further

  <img width="450" alt="fed" src="https://github.com/user-attachments/assets/5c42da0e-ee6d-4540-aa64-5c857b9e2823" />

  ### Next steps:
  - extend pet object functions
  - add tricks function?
  


    

