
###### descriptionsection In this part we'll be creating a window and handling most of SDL "boring stuff".

# 2D Engine: Window Management

*4/10/21*

## Engine Class

The important thing to keep in mind is that most of the engine classes and methods will be static, as 
only one instance at the time can exist.

## SDL init

###### p5codesection ../../article_scripts/test.js

```
void Engine::InitSDL(){
    if (SDL_Init(SDL_INIT_VIDEO) != 0) {
        LogSDLError(std::cout, "SDL_Init Error"); // This function will be explained later, it can be replaced with a print()
    }
    
    SDL_GL_SetAttribute(SDL_GL_CONTEXT_FLAGS, SDL_GL_CONTEXT_FORWARD_COMPATIBLE_FLAG); // Always required on Mac
    SDL_GL_SetAttribute(SDL_GL_CONTEXT_PROFILE_MASK, SDL_GL_CONTEXT_PROFILE_CORE);
    SDL_GL_SetAttribute(SDL_GL_CONTEXT_MAJOR_VERSION, 3);
    SDL_GL_SetAttribute(SDL_GL_CONTEXT_MINOR_VERSION, 2);

    SDL_GL_SetAttribute(SDL_GL_DOUBLEBUFFER, 1);
    SDL_GL_SetAttribute(SDL_GL_DEPTH_SIZE, 24);
    SDL_GL_SetAttribute(SDL_GL_STENCIL_SIZE, 8);

    SDL_GL_SetSwapInterval(1); // Enable vsync
    
    SDL_WindowFlags window_flags = (SDL_WindowFlags)(SDL_WINDOW_OPENGL | SDL_WINDOW_RESIZABLE | SDL_WINDOW_ALLOW_HIGHDPI);
    // Window is a static variable of type SDL_Window
    // WINDOW_HEIGHT and WINDOW_WIDTH are static constants of type int, they determine width and height of the window
    Window = SDL_CreateWindow("Sdl2 Test", SDL_WINDOWPOS_CENTERED, SDL_WINDOWPOS_CENTERED, WINDOW_WIDTH, WINDOW_HEIGHT, window_flags);
}
```

It could be usesful to have a function to log any error happening in our code, the one shown below is very simple, but can be used to also print, for example, the file and the line where the error is happening, or it's type.

```
void Engine::LogSDLError(std::ostream &os, const std::string &msg){
    os << msg << " error: " << SDL_GetError() << std::endl;
}
```


## Renderer init

The Renderer is the object responsable for receiving the draw requests, and print them to the screen. 
In the *InitSDL()* function, after the window creation, add:

```
// Again, Renderer is a static variable of type SDL_Renderer
Renderer = SDL_CreateRenderer(Window, -1, SDL_RENDERER_ACCELERATED);
if (Renderer == nullptr) {
    SDL_DestroyWindow(Window);
    LogSDLError(std::cout, "SDL_CreateRenderer Error");
    SDL_Quit();
}
```

## Render to the screen

Techinically we don't need a render() function, as we can just use the SDL one (SDL_RenderPresent()), 
however, for consistency's sake we'll make a wrapper function, so we don't have to call just a single 
SDL function from the main file.

```
void Engine::Render() {
    SDL_RenderPresent(Renderer);
}
```

## Basic event handling

The function to handle events will have it's own chapter, as it's the most complex, to allow you to 
close the window, we'll implement this simplified version.

```
void Engine::HandleEvents(){
    SDL_Event event;
    while (SDL_PollEvent(&event))
    {        
        if (event.type == SDL_QUIT)
            running = false; // running is a static bool variable 
    }
}
```

The running variable is best if kept as a private variable, as you shouldn't change it from outside the 
Engine class, so we'll implement a getter, to only check it's value.

```
bool Engine::IsRunning() { 
    return running; 
};  
```

## Clear the screen

It could be useful to have a simple function to clear the screen any color we want, 
to do that we can use the SDL\_Color struct

```
void Engine::ClearScreen(SDL_Color color) {
    SDL_SetRenderDrawColor(Renderer, color.r, color.g, color.b, color.a);
    SDL_RenderClear(Renderer);
}
```

## Cleaning up

```
void Engine::CleanupSDL(){
    SDL_DestroyWindow(Window);
    SDL_DestroyRenderer(Renderer);
    SDL_Quit();
}
```

## Final main.cpp file

Finally, it's time to use all the functions created in the main file.

```
#include "Engine.hpp"

int main(int, char**) {
    
    Engine::InitSDL();
    SDL_Color clearColor = {255,255,255,255};    
    
    while (Engine::IsRunning()) {
        
        Engine::HandleEvents();
        Engine::ClearScreen(clearColor);
        
        Engine::SetEngineDrawColor(255, 0, 0, 255);
                
        Engine::Render();
    }
    
    Engine::CleanupSDL();
    
    return 0;
}
```

## References

 - [TheCherno OpenGL playlist](https://www.youtube.com/playlist?list=PLlrATfBNZ98foTJPJ_Ev03o2oq3-GGOS2)
 - [Lazy Foo's SDL tutorials](https://lazyfoo.net/tutorials/OpenGL/index.php)


###### relatedsection

 - Coding/2D Engine/2D Engine 0
 - Coding/2D Engine/2D Engine 2: Event handling
 - Coding/2D Engine/2D Engine 3: Drawing textures
 - Coding/2D Engine/2D Engine 4: Drawing primitives
 - Coding/2D Engine/2D Engine 5: Handling Time