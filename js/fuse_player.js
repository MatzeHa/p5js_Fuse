class Player {
    static SPEED_FACTOR = 1;
    

    constructor(canvas_w, canvas_h) {
        this.canvas_w = canvas_w;
        this.canvas_h =canvas_h;
        this.pos = createVector(canvas_w / 2, canvas_h);
        this.dir = createVector(0, 0);
        this.pos_last_turn = this.pos;
        this.lines = [];
        this.polygons = [];
    }   


    update() {
        if(this.lines[0] == null) {
            return;            
        }
        let new_pos = createVector(this.pos.x + this.dir.x * Player.SPEED_FACTOR, 
            this.pos.y + this.dir.y * Player.SPEED_FACTOR);
        
        // SELF COLLISION
        if (this.isSelfCollision(new_pos)) {
            new_pos = createVector(this.pos.x, this.pos.y);
    
        }
        
        
        
        // COLLISION BOUNDARIES
        if(new_pos.x < 0) {
            new_pos.x = 0;
            this.pos = new_pos;
            this.linesToPolygon();
        }
        if(new_pos.x > this.canvas_w) {
            new_pos.x = this.canvas_w;
            this.pos = new_pos;
            this.linesToPolygon();
        }
        
        if(new_pos.y < 0) {
            new_pos.y = 0;
            this.pos = new_pos;
            this.linesToPolygon();
        }
        
        if(new_pos.y > this.canvas_h) {
            new_pos.y = this.canvas_h;
            this.pos = new_pos;
            this.linesToPolygon();
        } 


        
        this.pos = new_pos;


        this.lines[0][0].x = this.pos_last_turn.x;
        this.lines[0][0].y = this.pos_last_turn.y;
        this.lines[0][1].x = this.pos.x;
        this.lines[0][1].y = this.pos.y;
        
        
    }


    linesToPolygon() {
        let new_polygon = [createVector(this.lines[0][0].x, this.lines[0][0].y)];
        for (let i = 0; i < this.lines.length; i++){
            new_polygon.push(createVector(this.lines[i][1].x, this.lines[i][1].y));
        }
        new_polygon.push(createVector(this.lines[0][0].x, this.lines[0][0].y));
        this.polygons.push(new_polygon);
        this.lines = [];
        this.addLine();
    }

    isSelfCollision(pos) {
        let collision = false;
        this.lines.forEach(function(p_line, i) {
            if(i <= 1) return;
            if (Player.pointLineIntersect(pos, p_line)) collision = true;
        });
        return collision;
    }


    setDirection(dir) {
        switch (dir) {
            case "UP":
                console.log("UP");
                if(this.dir.y == 1) break;

                this.addLine();
                this.dir = createVector(0, -1);
                break;
            case "DOWN":
                console.log("DOWN");
                if(this.dir.y == -1) break;
                this.addLine();
                this.dir = createVector(0, 1);
                break;
            case "LEFT":
                console.log("LEFT");
                if(this.dir.x == 1) break;
                this.addLine();
                this.dir = createVector(-1, 0);
                break;
            case "RIGHT":
                console.log("RIGHT");
                if(this.dir.x == -1) break;
                this.addLine();
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



    static pointLineIntersect(point, line) {
        let dist_point_edges = dist(point.x, point.y, line[0].x, line[0].y) + 
             dist(point.x, point.y, line[1].x, line[1].y);
        let line_length = dist(line[0].x, line[0].y, line[1].x, line[1].y);
     
         if(dist_point_edges < line_length + 0.1){
             return true; 
         }
         return false;
     }

}