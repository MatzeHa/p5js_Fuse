class Player {
    static SPEED_FACTOR = 1;
    

    constructor(canvas_w, canvas_h) {
        this.canvas_w = canvas_w;
        this.canvas_h = canvas_h;
        this.pos = createVector(canvas_w / 2, canvas_h - 10);
        this.dir = createVector(0, 0);
        this.pos_last_turn = this.pos;
        this.lines = [];
        this.on_line_last_frame = true;
        this.do_create_polygon = false;
    }   


    update(polygons) {
        if(this.dir.x == 0 && this.dir.y == 0) {
            return;            
        }

        let old_pos = this.pos;
        let new_pos = createVector(this.pos.x + this.dir.x * Player.SPEED_FACTOR, 
            this.pos.y + this.dir.y * Player.SPEED_FACTOR);
            
        
        let polygon_collision = false;
        // POLYGON COLLISION
        if (this.isPolygonCollision(new_pos, polygons)) { // inside changes this.online
            polygon_collision = true;
            new_pos = old_pos;
        }
        // SELF COLLISION
        else if (this.isSelfCollision(new_pos)) {
            new_pos = old_pos;
            this.dir = createVector(0, 0);
        } 
    
        if (this.on_line_last_frame && !this.on_line) {
            this.addLine();
            this.on_line = false;
        }

        console.log(this.on_line);

        this.pos = new_pos;


        // UPDATE CURRENT LINE
        if (this.lines[0] !== undefined) {
            this.lines[0][0].x = this.pos_last_turn.x;
            this.lines[0][0].y = this.pos_last_turn.y;
            this.lines[0][1].x = this.pos.x;
            this.lines[0][1].y = this.pos.y;
        }
        
        this.on_line_last_frame = this.on_line;
    }



    isSelfCollision(new_pos) {
        let collision = false;
        this.lines.forEach(function(p_line, i) {
            if(i <= 1) return;
            if (Misc.pointLineIntersect(new_pos, p_line)) collision = true;
        });
        return collision;
    }

    isPolygonCollision(new_pos, polygons){
        let collision_counter = 0;
        for (let poly of polygons) {
            if (Misc.pointPolygonIntersect(new_pos, poly)) {
                collision_counter++;
                for (let vi = 0; vi < poly.length; vi++) {
                    let next_vi = vi + 1;
                    if (next_vi == poly.length) {
                        next_vi = 0;
                    }
                    let poly_line = [poly[vi], poly[next_vi]];
                    if (Misc.pointLineIntersect(new_pos, poly_line) && collision_counter > 1) {
                        // TODO: move point on line in higher speeds!
                        this.on_line = true;
                        console.log("ON LINE = TURE");
                        return false
                    }
                }
                this.do_create_polygon = true;
                return true;
            }
        }
        return false;
    }



    setDirection(dir) {
        switch (dir) {
            case "UP":
                console.log("UP");
                if ((this.dir.x != 0 && this.dir.y != -1)) {

                    console.log("TRUE");
                    this.addLine();
                }
                this.dir = createVector(0, -1);
                break;
            case "DOWN":
                console.log("DOWN");
                if ( (this.dir.x != 0 && this.dir.y != -1)) this.addLine();
                this.dir = createVector(0, 1);
                break;
            case "LEFT":
                console.log("LEFT");
                if ((this.dir.x != 1 && this.dir.y != 0)) this.addLine();
                this.dir = createVector(-1, 0);
                break;
            case "RIGHT":
                console.log("RIGHT");
                if ((this.dir.x != -1 && this.dir.y != 0)) this.addLine();
                this.dir = createVector(1, 0);
                break;
        }
    }

    addLine() {
        this.pos_last_turn = this.pos;
        let new_line = [
            createVector(this.pos_last_turn.x, this.pos_last_turn.y), 
            createVector(this.pos.x, this.pos.y)
        ];
        this.lines.unshift(new_line);
    }

    getLines() {
        let lns = this.lines;
        this.lines = []
        return lns;
    }
}