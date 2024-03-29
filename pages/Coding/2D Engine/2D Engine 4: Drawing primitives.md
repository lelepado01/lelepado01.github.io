
###### descriptionsection In this part we'll be creating some functions to display shapes and lines to the screen, these may not be as useful for the game, but are essential for debugging.

# 2D Engine: Drawing primitives

*5/10/21*

## Drawing primitives

This section is not strictly necessary, however, drawing primitives is often useful for debugging purposes To keep things simple, we are going to implement only a few, such as line and rectangle.

```
void Engine::DrawLine(int x1, int y1, int x2, int y2){
    SDL_RenderDrawLine(Renderer, x1, y1, x2, y2);
}

void Engine::DrawRectangle(int x, int y, int w, int h){
    SDL_Rect r = SDL_Rect{x, y, w, h};
    SDL_RenderDrawRect(Renderer, &r);
}
```

To be able to see these shapes, you need to set the draw color, we'll create a wrapper around the SDL function: 

```

void Engine::SetEngineDrawColor(int r, int g, int b, int a){
    SDL_SetRenderDrawColor(Renderer, r, g, b, a);
}
```

With these features, you can now visualize vector directions, areas of influence of forces etc...

## References

 - [TheCherno OpenGL playlist](https://www.youtube.com/playlist?list=PLlrATfBNZ98foTJPJ_Ev03o2oq3-GGOS2)
 - [Lazy Foo's SDL tutorials](https://lazyfoo.net/tutorials/OpenGL/index.php)


###### relatedsection

 - Coding/2D Engine/2D Engine 0
 - Coding/2D Engine/2D Engine 1: Window management
 - Coding/2D Engine/2D Engine 2: Event handling
 - Coding/2D Engine/2D Engine 3: Drawing textures
 - Coding/2D Engine/2D Engine 5: Handling Time