class Polygons {

    constructor() {
        this.polygons = [];


    }

    initBorderPolygons(canvas_w, canvas_h) {
        let topleft = createVector(10,10);
        let topright = createVector(canvas_w - 10, 10);
        let bottomleft = createVector(10, canvas_h - 10);
        let bottomright = createVector(canvas_w -10, canvas_h -10);

        let poly_top = [ 
            createVector(topleft.x - 10, topleft.y), createVector(topright.x + 10, topright.y),
            createVector(topright.x + 10, topright.y - 10), createVector(topleft.x - 10, topleft.y - 10)];

        let poly_bottom = [
            createVector(bottomleft.x - 10, bottomleft.y), createVector(bottomright.x + 10, bottomright.y),
            createVector(bottomright.x + 10, bottomright.y + 10), createVector(bottomleft.x - 10, bottomleft.y + 10)];

        let poly_left = [ 
            createVector(topleft.x, topleft.y - 10), createVector(bottomleft.x, bottomleft.y + 10),
            createVector(bottomleft.x - 10, bottomleft.y + 10), createVector(topleft.x - 10, topleft.y - 10)];

            let poly_right = [
            createVector(topright.x, topright.y - 10), createVector(bottomright.x, bottomright.y + 10),
            createVector(bottomright.x + 10, bottomright.y + 10), createVector(topright.x + 10, topright.y - 10)];
                                        


        this.polygons.push(poly_top, poly_bottom, poly_left, poly_right);
        console.log(this.polygons);
        /*
        this.polygons.push([topleft, topright]);
        this.polygons.push([bottomleft, bottomright]);
        this.polygons.push([topleft, bottomleft]);
        this.polygons.push([topright, bottomright]);
        console.log(this.polygons);
        */
        }

}