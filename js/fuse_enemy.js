class Enemy {
//    static SPEED_FACTOR = 8;
    static SPEED_FACTOR = 1;
    static MAX_LINES = 100;


    constructor() {
        this.pos1 = createVector(random(canvas_w), random(canvas_h));;
        this.pos2 = createVector(random(canvas_w), random(canvas_h));
        this.dir1 = createVector(random(2) - 1, random(2) - 1);
        this.dir2 = createVector(random(2) - 1, random(2) - 1);   
        this.lines = [];
        this.colors = [];

    }   

    update(new_col) {
        this.pos1 = this.getNewPos1();
        this.pos2 = this.getNewPos2();
        
        let new_line = [
            createVector(this.pos1.x, this.pos1.y), 
            createVector(this.pos2.x, this.pos2.y)
        ];
        this.colors.unshift(new_col);
        if (this.lines.length >= Enemy.MAX_LINES) this.lines.pop(0);
        this.lines.unshift(new_line);
    }

    getNewPos1() {
        let new_pos_x = this.pos1.x + this.dir1.x * Enemy.SPEED_FACTOR;
        while (new_pos_x < 0 || new_pos_x > canvas_w) {
            this.dir1.x = random(2) - 1;
            new_pos_x = this.pos1.x + this.dir1.x * Enemy.SPEED_FACTOR;
        }    

        let new_pos_y = this.pos1.y + this.dir1.y * Enemy.SPEED_FACTOR;
        while (new_pos_y < 0 || new_pos_y > canvas_h) {
            this.dir1.y = random(2) - 1;
            new_pos_y = this.pos1.y + this.dir1.y * Enemy.SPEED_FACTOR;
        }    
        return createVector(new_pos_x, new_pos_y);    
    }

    getNewPos2() {
        let new_pos_x = this.pos2.x + this.dir2.x * Enemy.SPEED_FACTOR;
        while (new_pos_x < 0 || new_pos_x > canvas_w) {
            this.dir2.x = random(2) - 1;
            new_pos_x = this.pos2.x + this.dir2.x * Enemy.SPEED_FACTOR;
        }    

        let new_pos_y = this.pos2.y + this.dir2.y * Enemy.SPEED_FACTOR;
        while (new_pos_y < 0 || new_pos_y > canvas_h) {
            this.dir2.y = random(2) - 1;
            new_pos_y = this.pos2.y + this.dir2.y * Enemy.SPEED_FACTOR;
        }    

        return createVector(new_pos_x, new_pos_y);    
    }
}