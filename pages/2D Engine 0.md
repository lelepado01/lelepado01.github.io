
###### descriptionsection In this series of articles we'll look into creating a small rendering engine using SDL2.

# Quest For A 2D Engine

4/10/21

## Setting stuff up

I'm not going to go in depth into the specifics of how to setup SDL, 
as there are many tutorials out there. 

As a reference though, I'll be using:
 - **C++**, even though there are SDL bindings available for almost any programming language; 
 - **Xcode**, which can be argued is a questionable choice...
 - **SDL Renderer** for drawing stuff.

All the code for these articles can be found on my [Github page](https://github.com/lelepado01)

## Engine Structure

We'll have three main parts to this engine: 
 - The first is the **Engine class** itself, containing the window, input handling, texture loading and rendering etc...
 - The second is a **Time class**, handling deltatime, fps etc.
 - The last section will be the **physics classes**, so vectors, matrices, collisions...

Finally, in the main file, we'll be able to call Engine functions, and handle all the game logic.

## References

 - [TheCherno OpenGL playlist](https://www.youtube.com/playlist?list=PLlrATfBNZ98foTJPJ_Ev03o2oq3-GGOS2)
 - [Lazy Foo's SDL tutorials](https://lazyfoo.net/tutorials/OpenGL/index.php)


###### relatedsection

 - 2D Engine 1: Window management
 - 2D Engine 2: Event handling
 - 2D Engine 3: Drawing textures
 - 2D Engine 4: Drawing primitives
 - 2D Engine 5: Handling Time