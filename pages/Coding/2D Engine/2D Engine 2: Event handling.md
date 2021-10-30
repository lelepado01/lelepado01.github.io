
###### descriptionsection In this part we'll be creating a function to register the keypress events, mouse position, and mouse clicks.

# 2D Engine: Event Handling

*5/10/21*

## Handling keypresses

We'd like to have a function for testing a key's state, something similar to this: 

```
// returns true if key is pressed
bool Engine::KeyIsPressed(SDL_Keycode key); 
```

To have a simple way to check this condition, first we need to register each keypress. 
Let's add a static array of *SDL_Keycodes*, ideally we'd use a map to improve the performance 
however, most of the time this array will contain four or five items, making this optimization not necessary.

```
// maxKeys is a static int variable, to be safe, I set it at 100
static SDL_Keycode KEYS[maxKeys];
``` 

In the *HandleEvents()* function, add: 

```
if (event.type == SDL_KEYDOWN){
    // iterate over the array and set the key state, avoiding duplicates
    for (int i = 0; i < maxKeys; i++) { 
        // the state 0 means no key (the spot is empty)
        if (KEYS[i] == 0 || KEYS[i] == event.key.keysym.sym){
            KEYS[i] = event.key.keysym.sym;
            break;
        }
    }
}
```

Now that we have all keys registered, we want to remove them if the key is released.
Below the code just added: 

```
if (event.type == SDL_KEYUP){
    for (int i = 0; i < maxKeys; i++) {
        if (KEYS[i] == event.key.keysym.sym){
            KEYS[i] = 0;
        }
    }
}
```

Finally we can test the state of each key, implementing the function: 

```
bool Engine::KeyIsPressed(SDL_Keycode key){
    for (int i = 0; i < maxKeys; i++) {
        if (KEYS[i] == key){
            return true;
        }
    }
    return false;
}
```

## Handling mouse position

Registering the position of the mouse is very simple, we'll just use an *SDL_Point* to save the data: 

```
static SDL_Point mousePosition;
```

SDL_Point is basically a vector of two integers, and it's important to keep in mind that *SDL_GetMouseState()* 
returns only integer values.

The following line have to be added inside the *HandleEvents()* function, in order to register the mouse position. 

```
SDL_GetMouseState( &mousePosition.x, &mousePosition.y );
```

Now we can return the position with its own getter:

```
static SDL_Point GetMousePosition() { 
    return mousePosition; 
};
```

## Handling mouse clicks

Lastly, we have to repeat the keyboard presses process for mouse clicks. 
To keep thing simple, we'll just register left and right presses.

In the event polling loop, let's add: 

```
if (event.type == SDL_MOUSEBUTTONDOWN){
    if (event.button.button == SDL_BUTTON_LEFT) {
        // mouseLeftPressed is a static bool variable
        mouseLeftPressed = true;
    }
    if (event.button.button == SDL_BUTTON_RIGHT) {
        // mouseRightPressed is a static bool variable
        mouseRightPressed = true;
    }
}
```

And set the variables to false if the button is released.

```
if (event.type == SDL_MOUSEBUTTONUP){
    if (event.button.button == SDL_BUTTON_LEFT) {
        mouseLeftPressed = false;
    }
    if (event.button.button == SDL_BUTTON_RIGHT) {
        mouseRightPressed = false;
    }
}
```

Finally we can check the state with a getter: 

```
static bool MouseLeftKeyIsPressed() { 
    return mouseLeftPressed; 
};

static bool MouseRightKeyIsPressed() { 
    return mouseRightPressed; 
};
```

## References

 - [TheCherno OpenGL playlist](https://www.youtube.com/playlist?list=PLlrATfBNZ98foTJPJ_Ev03o2oq3-GGOS2)
 - [Lazy Foo's SDL tutorials](https://lazyfoo.net/tutorials/OpenGL/index.php)


###### relatedsection

 - Coding/2D Engine/2D Engine 0
 - Coding/2D Engine/2D Engine 1: Window management
 - Coding/2D Engine/2D Engine 3: Drawing textures
 - Coding/2D Engine/2D Engine 4: Drawing primitives
 - Coding/2D Engine/2D Engine 5: Handling Time