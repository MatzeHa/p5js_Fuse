class Player {
    static SPEED_FACTOR = 1;
    

    constructor(canvas_w, canvas_h) {
        this.canvas_w = canvas_w;
        this.canvas_h = canvas_h;
        this.pos = createVector(canvas_w / 2, canvas_h - 10);
        this.dir = createVector(0, 0);
        this.dir_change = false;
        this.pos_last_turn = this.pos;
        this.lines = [];
        this.on_line = true;
        this.on_line_last_frame = true;
        this.colliding_line;
        this.is_line_closed = false;
        
    }   


    update(polygons) {
        this.is_line_closed = false;

        if(this.dir.x == 0 && this.dir.y == 0) {
            return;            
        }

        let old_pos = this.pos;
        let new_pos = createVector(this.pos.x + this.dir.x * Player.SPEED_FACTOR, 
            this.pos.y + this.dir.y * Player.SPEED_FACTOR);
            
            
            // SELF COLLISION
            if (this.isSelfCollision(new_pos)) {
                new_pos = old_pos;
                this.dir = createVector(0, 0);
            } 
            
           
           
        // POLYGON COLLISION
        this.on_line_last_frame = this.on_line;
        this.on_line = false;
        let colliding_polygon = this.getCollidingPolygon(new_pos, polygons)
        if (colliding_polygon) {
            this.colliding_line = this.getLineOfPolygon(new_pos, colliding_polygon);
            if (!this.colliding_line) {
                this.setDirectionZero();
            }
            new_pos = old_pos;
            this.on_line = true;            
        }

        if (this.on_line && this.colliding_line) {
        }
        
        this.pos = new_pos;

        // CHECK IF SHOULD MAKE LINES
        if (this.on_line_last_frame && !this.on_line) {
            console.log("START LINE");
            this.addLine();
        }  else if (!this.on_line_last_frame && this.on_line) {
            console.log("END LINE")
            this.is_line_closed = true;
        } else if (this.dir_change && !this.on_line_last_frame) {
            console.log("START NEW LINE");
            this.addLine();
        }


        this.dir_change = false;

        // UPDATE CURRENT LINE
        if (this.lines[0] !== undefined) {
            this.lines[0][0].x = this.pos_last_turn.x;
            this.lines[0][0].y = this.pos_last_turn.y;
            this.lines[0][1].x = this.pos.x;
            this.lines[0][1].y = this.pos.y;
        }
        
    }



    isSelfCollision(new_pos) {
        let collision = false;
        this.lines.forEach(function(p_line, i) {
            if (collision) return;
            if(i <= 1) return;
            if (Misc.pointLineIntersect(new_pos, p_line)) collision = true;
        });
        return collision;
    }

    getLineOfPolygon(new_pos, poly){
        for (let vi = 0; vi < poly.length; vi++) {
            let next_vi = vi + 1;
            if (next_vi == poly.length) next_vi = 0;
            let ln = [poly[vi], poly[next_vi]];
            if (Misc.pointLineIntersect(new_pos, ln)){
                return ln;
            }
        }
        return false;
    }

    getCollidingPolygon(new_pos, polygons){
        for (let poly of polygons) {
            if (Misc.pointPolygonIntersect(new_pos, poly)) {
                return poly;
            }
        }
        return false;
    }


    addLine() {
        let new_line = [
            createVector(this.pos_last_turn.x, this.pos_last_turn.y), 
            createVector(this.pos.x, this.pos.y)
        ];
        this.lines.unshift(new_line);
    }

    getDeleteLines() {
        console.log("this.getDeleteLines");
        console.log(this.lines);
        let lns = this.lines;
        this.lines = []
        return lns;
    }

    setDirection(dir) {
        this.dir_change = true;
        switch (dir) {
            case "UP":
                this.pos_last_turn = this.pos;
                this.dir = createVector(0, -1);
                break;
            case "DOWN":
                this.pos_last_turn = this.pos;
                this.dir = createVector(0, 1);
                break;
            case "LEFT":
                this.pos_last_turn = this.pos;
                this.dir = createVector(-1, 0);
                break;
            case "RIGHT":
                this.pos_last_turn = this.pos;
                this.dir = createVector(1, 0);
                break;
        }
    }  

    setDirectionZero() {
        this.dir = createVector(0, 0);
    }
}