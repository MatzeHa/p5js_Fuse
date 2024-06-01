class Board {
    constructor(cnvs) {
        this.canvas_w = cnvs.width;
        this.canvas_h = cnvs.height;
        this.area_total; 
        this.area_left;
        this.polygons = [];
        this.polygon_vertices = [];
        this.inner_polygon = [];
    }


    initBorderPolygons() {
        let topleft = createVector(10, 10);
        let topright = createVector(this.canvas_w - 10, 10);
        let bottomleft = createVector(10, this.canvas_h - 10);
        let bottomright = createVector(this.canvas_w -10, this.canvas_h -10);

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

        this.inner_polygon = [topleft, topright, bottomright, bottomleft]

        //this.updateVertices();
    }

/*
    updateVertices() {
        this.inner_polygon.forEach(v => {
            if (!this.polygon_vertices.includes(v)){
                this.polygon_vertices.push(v);
            }
        });

    }
*/


    updateInnerPolygon(new_poly) {
        // TODO: erstamol hier woadermoachn
        this.polygons.push(new_poly);
    }

    linesToPolygon(lines, enemy_pos) {
        // fill a new poly with lines from player
        let player_poly = [lines[lines.length-1][0]]
        for (let i = lines.length -1; i >= 0; i--) {
            player_poly.push(lines[i][1]);
        }
        console.log("LINES TO POLYGON");
        console.log("player_poly: " + player_poly);
        console.log("last hitpoint: " + player_poly[player_poly.length-1]);
                
        // make two new innerpolygons and test, in wich one the enemy is!
        player_poly = this.getPolyWithSurroundings(player_poly, enemy_pos);


        console.log("player_poly: " + player_poly);

        this.polygons.push(player_poly);
        this.updateInnerPolygon(player_poly);
    }



    getPolyWithSurroundings(player_poly, enemy_pos) { // values direction = 0, 1 (=rechts, links)
        console.log("getSurroundings");
        
        let v_start = player_poly[0];
        let i_start = this.getCollidingLineIndex(v_start);
        let v_end = player_poly[player_poly.length-1];
        let i_end = this.getCollidingLineIndex(v_end);
        
        
        if (i_start == i_end) return player_poly;
        

        let player_poly_1 = player_poly; 
        let surroundings_1 = this.inner_polygon.slice(i_start, i_end); 
        for (let new_v of surroundings_1){
            player_poly_1.push(new_v);
        }

        let player_poly_2 = player_poly; 
        let surroundings_2_p1 = this.inner_polygon.slice(i_end);
        let surroundings_2_p2 = this.inner_polygon.slice(0, i_start);

        player_poly_1.concat(player_poly_1, surroundings_1);
        player_poly_2.concat(surroundings_2_p1, player_poly_2, surroundings_2_p2);

        /* 
        for (let new_v of surroundings_2_p1){
            player_poly_2.push(new_v);
        }
        for (let new_v of surroundings_2_p2){
            player_poly_2.push(new_v);
        }
        */

        // check if enemy collision
        if (Misc.pointPolygonIntersect(enemy_pos, player_poly_1)){
        
            console.log("if (Misc.pointPolygonIntersect(enemy_pos, player_poly_1)){");
            console.log("poly 111");
            return player_poly_2;        
        }
        console.log("poly 222");
        return player_poly_1;        

//         return player_poly_2;        






    }



    getCollidingLineIndex(pt){
        let inner_line;
        for (let vi = 0; vi < this.inner_polygon.length; vi++) {
            let next_vi = vi + 1;
            if (next_vi == this.inner_polygon.length) next_vi = 0;
            inner_line = [this.inner_polygon[vi], this.inner_polygon[next_vi]];
            console.log(pt);
            console.log(inner_line);
            if (Misc.pointLineIntersect(pt, inner_line)) {
                    return next_vi;
            }
        }
        return false;
    }


}