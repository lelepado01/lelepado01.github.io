
###### descriptionsection In this part we'll be creating a couple of functions to handle the loading and rendering of textures

# 2D Engine: Drawing textures

5/10/21

## Texture Loading

We'll create separate functions to first load the texture in memory, 
and only in a second moment render it to the screen.

Keep in mind that loading a texture into memory is a long process, so you shouldn't load a copy for each entity 
you want to render, but rather load only one, and display multiple instances of the same picture.

```
// IMG_LoadTexture() is contained inside SDL_image.h
#include <SDL_image.h>

SDL_Texture* Engine::LoadTexture(const std::string &file){
    SDL_Texture *texture = IMG_LoadTexture(Renderer, file.c_str());
    if (texture == nullptr){
        LogSDLError(std::cout, "LoadTexture");
    }
    return texture;
}
```


## Texture Rendering


We'll implement two versions of the same function, one which takes in just the texture, 
and the other that allows to also specify a rotation.

```
void Engine::RenderTexture(SDL_Texture *tex, int x, int y, int w, int h){
    SDL_Rect dst = {x , y, w, h};
    SDL_RenderCopy(Renderer, tex, NULL, &dst);
}

void Engine::RenderTexture(SDL_Texture *tex, int x, int y, int w, int h, double angle){
    SDL_Rect dst = {x , y, w, h};
    SDL_RenderCopyEx(Renderer, tex, NULL, &dst, angle, NULL, SDL_FLIP_NONE);
}
```

Now you can use these functions to load and render textures!

## Deleting textures

Once you are done with one texture, you should delete it to free the memory allocated.

```
void Engine::DeleteTexture(SDL_Texture *tex){
    SDL_DestroyTexture(tex); 
}
```

## References

 - [TheCherno OpenGL playlist](https://www.youtube.com/playlist?list=PLlrATfBNZ98foTJPJ_Ev03o2oq3-GGOS2)
 - [Lazy Foo's SDL tutorials](https://lazyfoo.net/tutorials/OpenGL/index.php)


###### relatedsection

 - 2D Engine 0
 - 2D Engine 1: Window management
 - 2D Engine 2: Event handling
 - 2D Engine 4: Drawing primitives
 - 2D Engine 5: Handling Time