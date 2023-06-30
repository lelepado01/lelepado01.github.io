function sketch_idnameofdiv(p) {
    p.setup = function () {
        p.createCanvas(800,400);
        p.background("#323437");

        p.stroke(255);
    }
  
    p.draw = function () {
       
        // follow the cursor and draw a line if clicked
        if (p.mouseIsPressed) {
            p.line(p.mouseX, p.mouseY, p.pmouseX, p.pmouseY);
        }
    

    }
  }
  new p5(sketch_idnameofdiv, 'p5codesection')