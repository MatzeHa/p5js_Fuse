
// TODO: line of player, last turn, stehenbleiben können?
// TODO: Bild aufdecken!
// TODO: Weitermachen bei polygons, wird schon erstellt, muss nu
// TODO: ÖFTERE RICHTUNGSWECHSEL!
// CANVAS
var cnvs;
var canvas_h = 600;
var canvas_w = 800;

// GUI

var isGUIInitialized = false;
var nr_gui_elements = 0;
var gui_element_width = 0;
var gui_element_height = 0;

var LOST = false;

// GAME OBJECTS
var enemy;
var player;

function setup() {

    colorMode(HSB);

    // GUI
    cnvs = createCanvas(canvas_w, canvas_h);
    cnvs.position((windowWidth - width) / 2, (windowHeight - height) / 2);
    if (!isGUIInitialized) {        
        isGUIInitialized = true;
    }

    // GAME ELEMENTS
    // ENEMY
    enemy = new Enemy();
    player = new Player(canvas_w, canvas_h);
}

function draw(){
    background(0);
    rectMode(CENTER);

    // SETTING COLORS OF ENEMY
    
    
    if(!LOST) {       
        if (frameCount > 360) frameCount = 0;
        let new_hue = frameCount * 10 % 360;
        enemy.update(color(new_hue, 100, 100));
        player.update();
        if (isPlayerEnemyCollision()) {
            console.log("##################### COLLISION #######################");
            LOST = true;
        }
    } 
    // DRAW ENEMY    
    strokeWeight(2);
    enemy.lines.forEach(function(e_line, i) {
        stroke(enemy.colors[i]);
        line(e_line[0].x, e_line[0].y, e_line[1].x, e_line[1].y);
    });
        
    // DRAW PLAYER
    stroke("red");
    strokeWeight(10);
    point(player.pos);
    player.lines.forEach(function(p_line) {
        stroke("red");
        strokeWeight(2);
        line(p_line[0].x, p_line[0].y, p_line[1].x, p_line[1].y);
    });
    player.polygons.forEach(pgon => {
        stroke("yellow");
        fill("green");
        beginShape(TESS);


        console.log("XXX");
        pgon.forEach(v => {
            console.log(v)
            vertex(v.x, v.y);
        });
        endShape();
        

        
    });


}


function isPlayerEnemyCollision() {
//    console.log("DIST"); 
    let collision = false;

    player.lines.forEach(function(p_line, i) {
        enemy.lines.forEach(function(e_line) {
            if (linesIntersect(p_line, e_line)) collision = true;

        }); 
    });
    return collision;
}


function linesIntersect(line1, line2) {
    let x1 = line1[0].x;
    let y1 = line1[0].y;
    let x2 = line1[1].x;
    let y2 = line1[1].y;
    let x3 = line2[0].x;
    let y3 = line2[0].y; 
    let x4 = line2[1].x;
    let y4 = line2[1].y;

    let denom = ((y4-y3)*(x2-x1) - (x4-x3)*(y2-y1))
    let uA = ((x4-x3)*(y1-y3) - (y4-y3)*(x1-x3)) / denom;
    let uB = ((x2-x1)*(y1-y3) - (y2-y1)*(x1-x3)) / denom;
    
    // if uA and uB are between 0-1, lines are colliding
    if (uA < 0 || uA > 1 || uB < 0 || uB > 1) {
        return false;
        
    }
    console.log("SCHNEIDEN!");
    return true;
    
    //return createVector(x1 + (uA * (x2-x1)), y1 + (uA * (y2-y1)));
}




function keyPressed(){
    if (key == "w") {
        console.log("UP");
        player.setDirection("UP");

    } else if (key == "s") {
        console.log("DOWN");
        player.setDirection("DOWN");

    } else if (key == "a") {
        console.log("LEFT");
        player.setDirection("LEFT");
        
    } else if (key == "d") {
        console.log("RIGHT");
        player.setDirection("RIGHT");

    }
}

function windowResized() {
    cnvs.position((windowWidth - width) / 2, (windowHeight - height) / 2);
}
