
###### descriptionsection In this part we'll be adding a class to keep track of delta time and frames per second.

# 2D Engine: Handling Time

*5/10/21*

## Counting Time

To stay consistent with the static classes we have used so far, we'll create another one that will manage time.
The class needs three static variables: 
 - A float delta time set to 0;
 - A clock keeping track of the old value of time (the one registered in the last frame);
 - A clock keeping track of the new value of time (this frame's time).

To update these values, we'll call a function every frame (each time the engine loop runs).

```
void Time::Count(){
    // old_time is set to last frame's value
    old_time = new_time;
    // new_time is set to the current time
    new_time = std::chrono::steady_clock::now();
    
    // deltaTime is a float variable (and calculated in seconds)
    deltaTime = std::chrono::duration_cast<std::chrono::milliseconds>(new_time - old_time).count() / 1000.0f;
}
```

## Delta Time

Now we can read the updated delta time value any time we want by implementing a getter: 

```
float Time::DeltaTime(){
    return deltaTime <= 0 || deltaTime > 10000 ?  0.001 : deltaTime;
}
```

## Frames per second

Knowing frames per second may be useful for debugging, so let's create a very simple function that returns 
an estimate. Ideally you would have an average FPS over multiple frames, but to keep things simple we can just 
divide the one frame passed by the delta time between this and last frame.

```
float Time::FPS(){
    // one frame / time to process this frame = deltaTime
    return 1 / deltaTime;
}
```

###### notesection Note: if you end up printing the FPS at each iteration of the game loop, this measurement will be terrible, 
any *print()* statement to console is a very expensive operation, and will bring your performance down.

## References

 - [TheCherno OpenGL playlist](https://www.youtube.com/playlist?list=PLlrATfBNZ98foTJPJ_Ev03o2oq3-GGOS2)
 - [Lazy Foo's SDL tutorials](https://lazyfoo.net/tutorials/OpenGL/index.php)


###### relatedsection

 - 2D Engine 0
 - 2D Engine 1: Window management
 - 2D Engine 2: Event handling
 - 2D Engine 3: Drawing textures
 - 2D Engine 4: Drawing primitives
