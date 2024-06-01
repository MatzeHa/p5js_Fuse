class Enemy {
//    static SPEED_FACTOR = 8;
    static SPEED_FACTOR = 1;
    static MAX_LINES = 30;


    constructor(board) {
        // TODO: muss innerhalb der polygone starten!
        /*
        this.pos1 = createVector(random(canvas_w), random(canvas_h));;
        this.pos2 = createVector(random(canvas_w), random(canvas_h));
        */
        this.pos1 = createVector(random(canvas_w - 20) + 10, random(canvas_h - 20) + 10);;
        this.pos2 = createVector(random(canvas_w - 20) + 10, random(canvas_h - 20) + 10);

        this.dir1 = createVector(random(2) - 1, random(2) - 1);
        this.dir2 = createVector(random(2) - 1, random(2) - 1);   
        this.lines = [];
        this.colors = [];
        
    }   

    update(new_col, inner_polygon) {
        this.pos1 = this.getNewPos1(inner_polygon);
        this.pos2 = this.getNewPos2(inner_polygon);
        if(this.makeNewLine()) {
            let new_line = [
                createVector(this.pos1.x, this.pos1.y), 
                createVector(this.pos2.x, this.pos2.y)
            ];
            if (this.colors.length >= Enemy.MAX_LINES) this.colors.pop(0);
            this.colors.unshift(new_col);
            if (this.lines.length >= Enemy.MAX_LINES) this.lines.pop(0);
            this.lines.unshift(new_line);
        }        
    }


    makeNewLine() {
        if (frameCount % 10 == 0) return true;
        return false;
    }

    getNewPos1(inner_polygon) {
        let new_vec = createVector(this.pos1.x + this.dir1.x * Enemy.SPEED_FACTOR,
            this.pos1.y + this.dir1.y * Enemy.SPEED_FACTOR);
        while (!Misc.pointPolygonIntersect(new_vec, inner_polygon)) {
            this.dir1.x = random(2) - 1;
            this.dir1.y = random(2) - 1;
            new_vec = createVector(this.pos1.x + this.dir1.x * Enemy.SPEED_FACTOR,
                this.pos1.y + this.dir1.y * Enemy.SPEED_FACTOR); 
        }
        return new_vec;    
    }

    getNewPos2(inner_polygon) {
        let new_vec = createVector(this.pos2.x + this.dir2.x * Enemy.SPEED_FACTOR,
            this.pos2.y + this.dir2.y * Enemy.SPEED_FACTOR);
        while (!Misc.pointPolygonIntersect(new_vec, inner_polygon)) {
            this.dir2.x = random(2) - 1;
            this.dir2.y = random(2) - 1;
            new_vec = createVector(this.pos2.x + this.dir2.x * Enemy.SPEED_FACTOR,
                this.pos2.y + this.dir2.y * Enemy.SPEED_FACTOR); 
        }
        return new_vec;    
    }
}