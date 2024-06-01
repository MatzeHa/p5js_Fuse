
class Misc {

    static pointLineIntersect(point, line) {
        let dist_point_edges = dist(point.x, point.y, line[0].x, line[0].y) + 
        dist(point.x, point.y, line[1].x, line[1].y);
        let line_length = dist(line[0].x, line[0].y, line[1].x, line[1].y);
        
        if(dist_point_edges < line_length + 0.01){
            return true; 
        }
        return false;
    }

    static pointPolygonIntersect(point, polygon) {
        let collision = false;
        let next_i = 0;

        for (let current_i = 0; current_i < polygon.length -1; current_i++) {
            next_i = current_i + 1;
            if (next_i > polygon.length) next_i = 0;
            let vc = polygon[current_i];
            let vn = polygon[next_i];
            if (((vc.y >= point.y && vn.y < point.y) || (vc.y < point.y && vn.y >= point.y)) &&
                (point.x < (vn.x-vc.x)*(point.y-vc.y) / (vn.y-vc.y)+vc.x)) {
                    collision = !collision;
            }
        }
        return collision;
    }


    static lineLineIntersect(line1, line2) {
        let a = line1[0].x;
        let b = line1[0].y;
        let c = line1[1].x;
        let d = line1[1].y;
        let p = line2[0].x;
        let q = line2[0].y;
        let r = line2[1].x;
        let s = line2[1].y;
        var det, gamma, lambda;
        det = (c - a) * (s - q) - (r - p) * (d - b);
        if (det === 0) {
          return false;
        } else {
          lambda = ((s - q) * (r - a) + (p - r) * (s - b)) / det;
          gamma = ((b - d) * (r - a) + (c - a) * (s - b)) / det;

          return (0 < lambda && lambda < 1) && (0 < gamma && gamma < 1);
        }
      };
      
}



